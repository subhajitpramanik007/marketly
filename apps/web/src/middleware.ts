import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { rootDomain } from "./lib/utils";

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Local dev
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    const match = url.match(/http:\/\/([^.]+)\.localhost/);
    if (match && match[1]) return match[1];
    if (hostname.includes(".localhost")) return hostname.split(".")[0];
    return null;
  }

  const rootDomainFormatted = rootDomain.split(":")[0];

  // Vercel preview domains (e.g., tenant---branch.vercel.app)
  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return parts.length > 0 ? parts[0] : null;
  }

  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const subdomain = extractSubdomain(request);
  const cookieStore = await cookies();
  const useAs = cookieStore.get("useAs")?.value;

  // Avoid redirect loop: only redirect if subdomain !== useAs and subdomain is not null
  if (useAs && useAs === "vendors") {
    if (subdomain !== useAs) {
      const redirectUrl = new URL(request.url);
      redirectUrl.hostname = `${useAs}.localhost`; // Adjust for production if needed
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname.includes("auth")) {
    return NextResponse.rewrite(new URL(pathname, request.url));
  }

  if (subdomain === "vendors") {
    return NextResponse.rewrite(
      new URL(`/vendors${pathname === "/" ? "" : pathname}`, request.url),
    );
  }

  if (!subdomain && useAs === "consumer") {
    return NextResponse.rewrite(
      new URL(`/consumers${pathname === "/" ? "" : pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|[\\w-]+\\.\\w+).*)"],
};
