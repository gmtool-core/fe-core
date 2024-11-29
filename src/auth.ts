import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "./utils/errors";

import Credentials from "next-auth/providers/credentials";
import { IUser } from "./types/next-auth";
import NextAuth from "next-auth";
import { sendRequest } from "./utils/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          body: {
            email: credentials.email,
            password: credentials.password
          },
        });    
        
        if (res.statusCode === 201) {
          return {
            id: res.data?.user.id,
            name: res.data?.user.name,
            email: res.data?.user.email,
            access_token: res.data?.access_token
          };
        } else if (res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res.statusCode === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {   
      if (user) { // User is available during sign-in
        token.user = (user as IUser);
      }
      return token
    },
    session({ session, token }) {  
      (session.user as IUser) = token.user  
      return session
    },
    authorized({ auth }) {
      return !!auth
    },
  },
});
