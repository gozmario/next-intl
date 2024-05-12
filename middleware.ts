import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, pathnames, publicRoutes } from "./navigation";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  // Step 1: Create and call the next-intl middleware
  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales,
    // Used when no locale matches
    defaultLocale,
    pathnames,
  });
  const response = handleI18nRouting(req);

  const path = req.nextUrl.pathname;
  const [, locale] = path.split("/");

  const currentLocale = locale ?? defaultLocale;

  // 2. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;

  // 3. Redirect to /login if the user is not authenticated
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicRoutes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (!isPublicPage && !cookie) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, req.nextUrl)
    );
  }

  if (cookie && publicRoutes.some((pub) => path.includes(pub))) {
    return NextResponse.redirect(new URL(`/${currentLocale}`, req.nextUrl));
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(hu|en)/:path*"],
};
