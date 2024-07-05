import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const onLoginPage = nextUrl.pathname.startsWith('/login');

      if (onLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }

      if (isLoggedIn) {
        return true;
      } else {
        return false;
      }

    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;