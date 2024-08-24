
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/','/auth'];
const adminRoutes : string[] = [];
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieSession = cookies().get('biblio-session');
  const cookieReq = request.cookies
  console.log(pathname, "Cookie : ",cookies().getAll(), cookieReq)
  if(protectedRoutes.includes(pathname) && !cookieSession) {
    return NextResponse.redirect(new URL("/auth?redirected="+pathname.split("/")[1], request.url));
  }
  if(pathname.includes('auth') && cookieSession) {
    console.log("/auth path")
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes,publicRoutes, ...adminRoutes,],
};