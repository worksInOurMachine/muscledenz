import api from "@/lib/axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

          const res = await api.post(`/otp/verify`, {
            identifier: credentials.identifier,
            otp: credentials.otp,
            firstname: credentials?.firstname ? credentials.firstname : "",
            lastname: credentials?.lastname ? credentials.lastname : "",
          });

          const data = res.data;

          if (data?.jwt && data?.user) {
            return {
              id: String(data.user.id),
              identifier: data.user.identifier,
              jwt: data.jwt,
            };
          }

          return null;
        } catch (err: any) {
          console.error("OTP login failed", err.response?.data || err.message);
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub as string,
        identifier: token.identifier as string,
      };
      session.jwt = token.jwt as string;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};
