"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({
  children,
  session,
}: {
  children: any;
  session?: any;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
