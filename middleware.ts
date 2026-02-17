import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const LOCALE_COOKIE_KEY = "NEXT_LOCALE";

const countryToLocale: Record<string, (typeof routing.locales)[number]> = {
  RO: "ro",
  MD: "ro",
  DE: "de",
  CH: "de",
  AT: "de",
};
const localeSet = new Set(routing.locales);

function hasLocalePrefix(pathname: string) {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function getLocaleFromPathname(pathname: string): (typeof routing.locales)[number] | null {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

function normalizeLocale(
  value: string | null
): (typeof routing.locales)[number] | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  return localeSet.has(normalized as (typeof routing.locales)[number])
    ? (normalized as (typeof routing.locales)[number])
    : null;
}

function stripLocalePrefix(pathname: string) {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}

function resolveLocaleFromAcceptLanguage(
  headerValue: string | null
): (typeof routing.locales)[number] | null {
  if (!headerValue) return null;

  const candidates = headerValue
    .split(",")
    .map((item) => item.trim().toLowerCase().split(";")[0])
    .filter(Boolean);

  for (const candidate of candidates) {
    const [language] = candidate.split("-");
    if (language === "ro") return "ro";
    if (language === "de") return "de";
    if (language === "en") return "en";
  }

  return null;
}

function resolveLocaleFromCountry(request: NextRequest): (typeof routing.locales)[number] {
  const fromCookie = normalizeLocale(request.cookies.get(LOCALE_COOKIE_KEY)?.value ?? null);
  if (fromCookie) return fromCookie;

  const fromAcceptLanguage = resolveLocaleFromAcceptLanguage(request.headers.get("accept-language"));
  if (fromAcceptLanguage) return fromAcceptLanguage;

  const country =
    request.geo?.country?.toUpperCase() ??
    request.headers.get("x-vercel-ip-country")?.toUpperCase() ??
    request.headers.get("cf-ipcountry")?.toUpperCase() ??
    request.headers.get("x-country-code")?.toUpperCase() ??
    "";

  if (country && countryToLocale[country]) {
    return countryToLocale[country];
  }

  return "en";
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const forcedLocale = normalizeLocale(request.nextUrl.searchParams.get("lang"));

  if (forcedLocale) {
    const redirectedUrl = request.nextUrl.clone();
    const basePath = stripLocalePrefix(pathname);
    redirectedUrl.pathname = `/${forcedLocale}${basePath === "/" ? "" : basePath}`;
    redirectedUrl.searchParams.delete("lang");

    const response = NextResponse.redirect(redirectedUrl);
    response.cookies.set(LOCALE_COOKIE_KEY, forcedLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  if (!hasLocalePrefix(pathname)) {
    const locale = resolveLocaleFromCountry(request);
    const localizedUrl = request.nextUrl.clone();
    localizedUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    const response = NextResponse.redirect(localizedUrl);
    response.cookies.set(LOCALE_COOKIE_KEY, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  const response = handleI18nRouting(request);
  const localeFromPath = getLocaleFromPathname(pathname);

  if (localeFromPath) {
    response.cookies.set(LOCALE_COOKIE_KEY, localeFromPath, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"]
};
