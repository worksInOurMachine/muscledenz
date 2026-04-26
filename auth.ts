import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import OTP from "@/models/OTP";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        otp: { label: "OTP", type: "text" },
        firstname: { label: "First Name", type: "text" },
        lastname: { label: "Last Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.identifier || !credentials?.otp) return null;

          await dbConnect();
          
          const otpDoc = await OTP.findOne({ 
            identifier: credentials.identifier, 
            otp: credentials.otp 
          });

          if (!otpDoc || otpDoc.expiresAt < new Date()) {
            return null;
          }

          // OTP is valid
          await OTP.deleteOne({ _id: otpDoc._id });

          let user = await User.findOne({ 
            $or: [
              { email: credentials.identifier }, 
              { phone: credentials.identifier }, 
              { identifier: credentials.identifier }
            ] 
          });

          if (!user) {
            user = await User.create({
              username: credentials.identifier,
              email: credentials.identifier.includes('@') ? credentials.identifier : `${credentials.identifier}@example.com`,
              phone: !credentials.identifier.includes('@') ? credentials.identifier : undefined,
              identifier: credentials.identifier,
              firstname: credentials?.firstname || '',
              lastname: credentials?.lastname || '',
              confirmed: true
            });
          }

          const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '30d' }
          );

          return {
            id: user._id.toString(),
            identifier: user.identifier,
            jwt: token,
          };
        } catch (err: any) {
          console.error("OTP login failed", err.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as any).jwt;
        token.identifier = (user as any).identifier;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        identifier: token.identifier as string,
      };
      session.jwt = token.jwt as string;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
