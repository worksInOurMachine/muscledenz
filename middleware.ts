 // middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log("Middleware token:", token);
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => false,
    },
  }
);
 
export const config = {
  matcher: [
    "/about/:path*", // protect about and subroutes
    "/account/:path*",   // protect account pages
  ],
};
