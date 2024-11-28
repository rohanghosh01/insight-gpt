import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // To check if the user is authenticated

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Get the token (session data) from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If the user is authenticated and trying to access /auth, redirect them to the homepage
  if (token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage if already authenticated
  }

  // If the user is not authenticated and trying to access a protected route, redirect to /auth
  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to /auth page for login
  }

  // Allow access to the requested route if the user is authenticated
  return NextResponse.next();
}
