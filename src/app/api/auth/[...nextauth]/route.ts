// imports
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
// importing providers
import strapi from "@/sdk";
import CredentialsProvider from "next-auth/providers/credentials";
 

export const authOptions: AuthOptions = {
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token }) {
      const res = (await strapi.find("users", {
        filters: {
          username: session.user?.email,
        },
      })) as any;
      if (res.length > 0) {
        // @ts-ignore
        session.user.id = res[0]?.id;
      } else {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },

    async signIn({ profile, account }) {
      try {
        const res = (await strapi.find("users", {
          filters: {
            username: profile?.email,
          },
        })) as any;
        if (res.length > 0) {
          return true;
        } else {
          console.log("🧪 User not found!, creating new account");
          const user = await axios.post(
            "http://localhost:1337/api/users",
            {
              role: 1,
              confirmed: true,
              fullName: profile?.name,
              email: profile?.email,
              userEmail: profile?.email,
              username: profile?.email,
              password: "123123",
            },
            {
              headers: {
                Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
              },
            }
          );

          return true;
        }
      } catch (error) {
        console.log("Google Auth Error", error);
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "identifier",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const { identifier,  otpVerified } = credentials as {
            identifier: string;
            password: string;
            otpVerified: boolean;
          };
          const res = (await strapi.find("users", {
            filters: {
              username: identifier,
            },
          })) as any;

          if (res.length > 0) {
            return res[0];
          } else {
            console.log("🧪 User not found!, creating new account");
            const user = await axios.post(
              "http://localhost:1337/api/users",
              {
                role: 1,
                confirmed: true,
                password: "123123",
                username: identifier,
                mobileNumber: `${identifier}`,
                email: randomEmailBuilder(),
              },
              {
                headers: {
                  Authorization:
                    "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
                },
              }
            );
            return user.data;
          }
        } catch (error) {
          console.log("SignIn Error", error);
          return false;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

const randomEmailBuilder = () => {
  const randomEmail = Math.random().toString(36).substring(7) + "@gmail.com";
  return randomEmail;
};
