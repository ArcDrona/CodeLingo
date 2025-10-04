import { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';

export const authOptions: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);