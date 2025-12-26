import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await verifyJwt();

  if (pathname.startsWith('/auth') && user) {
    return NextResponse.redirect(new URL('/dash', request.url));
  }

  if (pathname.startsWith('/dash') && !user) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dash/:path*', '/auth/:path*'],
};
