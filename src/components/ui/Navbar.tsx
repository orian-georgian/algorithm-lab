"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ThemeToggle } from "./ThemeToggle";

const locales = [
  { code: "ro", label: "RO" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
] as const;

export function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/gallery", label: t("gallery") },
    { href: "/cases", label: t("cases") },
    { href: "/contact", label: t("contact") },
  ];

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-clinic-border bg-clinic-white/95 backdrop-blur transition-shadow dark:border-slate-700 dark:bg-slate-950/95",
        isScrolled ? "shadow-[0_8px_24px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_24px_rgba(2,6,23,0.45)]" : "",
      ].join(" ")}
    >
      <nav
        className="container-page flex h-20 items-center justify-between gap-4"
        aria-label={t("ariaMain")}
      >
        <Link
          href="/"
          prefetch
          className="inline-flex shrink-0 items-center"
        >
          <Image
            src="/logos/logo.png"
            alt={t("brand")}
            width={176}
            height={56}
            className="h-10 w-auto object-contain dark:hidden sm:h-11"
            priority
          />
          <Image
            src="/logos/logo-white.png"
            alt={t("brand")}
            width={176}
            height={56}
            className="hidden h-10 w-auto object-contain dark:block sm:h-11"
            priority
          />
          <span className="sr-only">{t("brand")}</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={[
                "rounded-full px-3 py-1.5 transition",
                pathname === link.href
                  ? "bg-clinic-teal-700 text-white shadow-soft"
                  : "text-clinic-slate-700 hover:text-clinic-teal-700"
              ].join(" ")}
              href={link.href}
              prefetch
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-clinic-border/90 md:block" />
            {locales.map((item) => (
              <Link
                key={item.code}
                href={pathname}
                locale={item.code}
                prefetch
                aria-label={t(`switchTo.${item.code}`)}
                aria-current={locale === item.code ? "true" : undefined}
                className={[
                  "hidden h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 md:inline-flex",
                  locale === item.code
                    ? "border-clinic-teal-700 bg-clinic-teal-700 text-white shadow-soft hover:bg-clinic-teal-800"
                    : "border-clinic-border bg-clinic-white text-clinic-slate-700 hover:bg-clinic-blue-50",
                ].join(" ")}
              >
                <span aria-hidden="true">{item.label}</span>
                <span className="sr-only">{t(`switchTo.${item.code}`)}</span>
              </Link>
            ))}
          </div>

          <span
            aria-hidden="true"
            className="h-5 w-px bg-clinic-border/90 md:hidden"
          />

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 md:hidden",
              isMobileMenuOpen
                ? "border-clinic-teal-700 bg-clinic-teal-700 text-white shadow-soft hover:bg-clinic-teal-800"
                : "border-clinic-border bg-clinic-white text-clinic-slate-700 hover:bg-clinic-blue-50",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d={
                  isMobileMenuOpen
                    ? "M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z"
                    : "M4 7h16v2H4V7Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={[
          "md:hidden border-t border-clinic-border bg-clinic-white",
          isMobileMenuOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="container-page flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              prefetch
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className={[
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-clinic-teal-700 text-white shadow-soft"
                  : "text-clinic-slate-700 hover:bg-clinic-blue-50 hover:text-clinic-teal-700"
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-clinic-border pt-3 md:hidden">
            {locales.map((item) => (
              <Link
                key={`mobile-locale-${item.code}`}
                href={pathname}
                locale={item.code}
                prefetch
                aria-label={t(`switchTo.${item.code}`)}
                aria-current={locale === item.code ? "true" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600",
                  locale === item.code
                    ? "border-clinic-teal-700 bg-clinic-teal-700 text-white shadow-soft hover:bg-clinic-teal-800"
                    : "border-clinic-border bg-clinic-white text-clinic-slate-700 hover:bg-clinic-blue-50",
                ].join(" ")}
              >
                <span aria-hidden="true">{item.label}</span>
                <span className="sr-only">{t(`switchTo.${item.code}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
