import { type NextRequest, NextResponse } from 'next/server';

export const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local dev
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    const match = url.match(/http:\/\/([^.]+)\.localhost/);
    if (match && match[1]) return match[1];
    if (hostname.includes('.localhost')) return hostname.split('.')[0];
    return null;
  }

  const rootDomainFormatted = rootDomain.split(':')[0];

  // Vercel preview domains (e.g., tenant---branch.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  // if (isAdmin) {
  //   const baseUrl = request.nextUrl.origin.replace('localhost', `admin.localhost`);
  //   return NextResponse.redirect(baseUrl);
  // }

  if (subdomain === 'admin') {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/admin`, request.url));
    } else {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
    }
  }

  if (subdomain === 'vendors') {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/vendors`, request.url));
    } else {
      return NextResponse.rewrite(new URL(`/vendors${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|[\\w-]+\\.\\w+).*)'],
};
