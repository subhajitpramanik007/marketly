import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const { pathname } = request.nextUrl;

  const isAuthenticated = cookie.get('isAuthenticated')?.value === 'true';
  if (!isAuthenticated && !pathname.includes('auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|[\\w-]+\\.\\w+).*)'],
};
