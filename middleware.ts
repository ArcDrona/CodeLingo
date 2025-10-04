import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedPaths = [
  '/courses/',
  '/dashboard',
];

const publicPaths = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/error',
  '/courses',
  '/learn-coding',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isPathProtected = protectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  const isPublicPath = publicPaths.some(path => pathname === path);
  
  if (isPublicPath || !isPathProtected) {
    return NextResponse.next();
  }
  
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  if (!token && isPathProtected) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};