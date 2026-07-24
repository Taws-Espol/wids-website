import { NextResponse, type NextRequest } from "next/server";

import {
  ATTENDANCE_TOKEN_COOKIE_MAX_AGE_SECONDS,
  ATTENDANCE_TOKEN_COOKIE_NAME,
} from "@/shared/constants/attendance";
import { routing } from "@/shared/lib/next-intl/routing";
import { getAppUrl } from "@/shared/utils/get-app-url";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("t");

  const target = new URL(
    `/${routing.defaultLocale}${routing.pathnames["/conference/attendance"][routing.defaultLocale]}`,
    getAppUrl(),
  );

  for (const [key, value] of request.nextUrl.searchParams) {
    if (key.startsWith("utm_")) {
      target.searchParams.set(key, value);
    }
  }

  const response = NextResponse.redirect(target, 303);

  if (token) {
    response.cookies.set(ATTENDANCE_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ATTENDANCE_TOKEN_COOKIE_MAX_AGE_SECONDS,
    });
  }

  return response;
}
