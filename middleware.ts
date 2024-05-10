import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, pathnames } from "./navigation";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  pathnames,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(hu|en)/:path*"],
};
