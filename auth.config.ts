import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const onLoginPage = nextUrl.pathname.startsWith('/login');
      const onHomePage = nextUrl.pathname.startsWith('/tables/home');
      const onViewPage = nextUrl.pathname.startsWith('/tables/view');
      const onCreatePage = nextUrl.pathname.startsWith('/tables/create');
      const onRootPage = nextUrl.pathname == "/";

      // ログイン状態かつログインページならリダイレクト
      if (onLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/tables/home', nextUrl));
      }

      // ログイン状態の場合アクセス許可
      if (isLoggedIn) {
        return true;
      }
      // ホーム、ビュー、作成、ルートページはアクセス許可
      if (onHomePage || onViewPage || onCreatePage || onRootPage) {
        return true;
      }

      // アクセス拒否
      return false;

    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;