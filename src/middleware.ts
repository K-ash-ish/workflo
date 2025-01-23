import { NextRequest, NextResponse } from "next/server";
import { verify } from "./lib/jwt";

async function isAuthenticated(req: NextRequest) {
  const accessToken = req?.cookies?.get("accessToken")?.value;
  if (!accessToken) {
    return false;
  }
  if (!process.env.ACCESS_TOKEN_SECRET) return;
  const isVerified = await verify(accessToken);
  if (!isVerified) {
    return false;
  }
  return true;
}

export async function middleware(request: NextRequest, response: NextResponse) {
  const url = request.url;
  const isAuth = await isAuthenticated(request);
  if (!isAuth) {
    if (url.includes("login") || url.includes("signup")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (url.includes("login") || url.includes("signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/((?!static|.*\\..*|_next|$).*)",
};
