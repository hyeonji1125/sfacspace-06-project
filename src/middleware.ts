import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const MAIN_PAGE = process.env.NEXTAUTH_URL ?? "";
const SIGNIN_PAGE = `${MAIN_PAGE}/login`;
const AUTH_PAGES = ["/login"];
const PROTECTED_PATHS = ["/me", "/repos/", "/vuldb/items"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req });
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (token) {
      return NextResponse.redirect(MAIN_PAGE);
    }
    return NextResponse.next();
  }

  if (PROTECTED_PATHS.some((page) => pathname.startsWith(page))) {
    if (!token) {
      return NextResponse.redirect(SIGNIN_PAGE);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/me/:path*",
    "/repos/:path*",
    "/vuldb/items/:path*",
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|server).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
