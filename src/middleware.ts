"use server";

import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export const config = {
  matcher: ["/api/test", "/test"],
};

async function checkTokenExpiry(token?: string) {
  if (!token) return false;

  const tokenPayload = await decrypt(token);

  if (!tokenPayload) return false;

  const {
    payload: { exp },
  } = tokenPayload;

  if (!exp || exp * 1000 < Date.now()) {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const fallbackUrl = request.nextUrl.clone();
  fallbackUrl.pathname = "/auth";

  const session = request.cookies.get("session")?.value;
  // User needs to login again if either token not present
  if (!session) {
    return NextResponse.redirect(fallbackUrl);
  }

  const isAccessTokenValid = await checkTokenExpiry(session);

  if (!isAccessTokenValid) {
    return NextResponse.redirect(fallbackUrl);
  }

  if (isAccessTokenValid) return NextResponse.next();
}
