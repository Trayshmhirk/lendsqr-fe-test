import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authSession = request.cookies.get("lendsqr_session");
  const { pathname } = request.nextUrl;

  // Protect dashboard and user management routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/users");

  if (isProtectedRoute && !authSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from hitting login screens
  if (authSession && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Exclude internal Next.js engines and static graphic assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img).*)"],
};
