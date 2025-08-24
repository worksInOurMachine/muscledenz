import api from "@/lib/axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.phone || !credentials?.otp) return null;

          const res = await api.post(
            `/otp/verify`,
            {
              phone: credentials.phone,
              otp: credentials.otp,
            }
          );

          const data = res.data;

          if (data?.jwt && data?.user) {
            return {
              id: String(data.user.id),
              phone: data.user.phone,
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
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub as string,
        phone: token.phone as string,
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
