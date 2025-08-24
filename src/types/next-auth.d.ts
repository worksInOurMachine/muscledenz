import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
    };
    jwt: string;
  }

  interface User {
    id: string;
    phone: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt?: string;
    phone?: string;
  }
}
