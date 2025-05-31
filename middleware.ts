import {
  DEFAULT_LOGIN_REDIRECT,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@/constants/routes";
import { COOKIE_TOKEN_NAME, verifyToken } from "@/lib/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get the token from cookies
  const tokenData = request.cookies.get(COOKIE_TOKEN_NAME)?.value;
  const token = tokenData ? JSON.parse(tokenData).token : null;

  // Check if the user is authenticated
  const isAuthenticated = token && (await verifyToken(token));
  const isPrivateRoute = Object.values(PRIVATE_ROUTES).includes(pathname as any);
  const isPublicRoute = Object.values(PUBLIC_ROUTES).includes(pathname as any);

  // Redirect authenticated users trying to access public/auth routes
  if (isAuthenticated && isPublicRoute) {
    // If there's a callback URL, use that instead of the default redirect
    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }
    // Otherwise redirect to dashboard
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  // Redirect unauthenticated users trying to access private routes to login
  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL(PUBLIC_ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
