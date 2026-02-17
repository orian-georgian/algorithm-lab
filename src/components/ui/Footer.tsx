"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");
  const n = useTranslations("Navigation");
  const quickLinks = [
    { href: "/", label: n("home") },
    { href: "/about", label: n("about") },
    { href: "/services", label: n("services") },
    { href: "/gallery", label: n("gallery") },
    { href: "/cases", label: n("cases") },
    { href: "/contact", label: n("contact") },
  ] as const;
  const legalLinks = [
    { href: "/terms-and-conditions", label: t("termsLink") },
    { href: "/cookie-policy", label: t("cookiesLink") },
    { href: "/privacy-policy", label: t("privacyLink") },
  ] as const;

  return (
    <footer className="border-t border-clinic-border bg-clinic-white dark:bg-slate-950">
      <div className="container-page grid gap-10 py-4 lg:py-12 md:grid-cols-3 md:items-start lg:grid-cols-[1.2fr_0.85fr_0.95fr_1.1fr]">
        <div className="space-y-4">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
              aria-label={t("brand")}
            >
              <Image
                src="/logos/logo.png"
                alt={t("brand")}
                width={170}
                height={52}
                className="h-12 w-auto dark:hidden"
                priority={false}
              />
              <Image
                src="/logos/logo-white.png"
                alt={t("brand")}
                width={170}
                height={52}
                className="hidden h-12 w-auto dark:block"
                priority={false}
              />
            </Link>
            <p className="max-w-lg text-sm leading-relaxed text-clinic-slate-700 dark:text-slate-300">
              {t("tagline")}
            </p>
            <p className="pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-clinic-slate-600 dark:text-slate-400">
              {t("followUsLabel")}
            </p>
            <p className="text-sm leading-relaxed text-clinic-slate-700 dark:text-slate-300">
              {t("followUsDescription")}
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-transparent p-1 transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 dark:hover:bg-slate-800"
                aria-label={t("facebook")}
              >
                <Image
                  src="/social/facebook.svg"
                  alt={t("facebook")}
                  width={28}
                  height={28}
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-transparent p-1 transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 dark:hover:bg-slate-800"
                aria-label={t("instagram")}
              >
                <Image
                  src="/social/instagram.svg"
                  alt={t("instagram")}
                  width={28}
                  height={28}
                />
              </a>
              <a
                href="https://wa.me/40753081961"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-transparent p-1 transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 dark:hover:bg-slate-800"
                aria-label={t("whatsapp")}
              >
                <Image
                  src="/social/whatsapp.svg"
                  alt={t("whatsapp")}
                  width={28}
                  height={28}
                />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-clinic-slate-600 dark:text-slate-400">
            {t("quickLinksLabel")}
          </h3>
          <ul className="mt-6 space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-clinic-slate-700 transition hover:text-clinic-teal-700 dark:text-slate-300 dark:hover:text-clinic-teal-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-clinic-slate-600 dark:text-slate-400">
            {t("contactInfoLabel")}
          </h3>
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("addressLabel")}
              </p>
              <p className="text-sm text-clinic-slate-700 dark:text-slate-300">
                {t("addressValue")}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("phoneLabel")}
              </p>
              <p>
                <a
                  href="tel:+40753081961"
                  className="inline-flex text-sm tabular-nums text-clinic-slate-700 transition-colors hover:text-clinic-teal-700 dark:text-slate-300 dark:hover:text-clinic-teal-300"
                >
                  {t("phoneValue")}
                </a>
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("emailLabel")}
              </p>
              <a
                href={`mailto:${t("emailValue")}`}
                className="inline-flex text-sm text-clinic-slate-700 transition-colors hover:text-clinic-teal-700 dark:text-slate-300 dark:hover:text-clinic-teal-300"
              >
                {t("emailValue")}
              </a>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("hoursLabel")}
              </p>
              <p className="text-sm text-clinic-slate-700 dark:text-slate-300">
                {t("hoursSummary")}
              </p>
            </div>
          </div>
        </div>

        <div className="h-full min-h-[280px] overflow-hidden rounded-3xl border border-clinic-border bg-white md:col-span-3 dark:border-slate-700 dark:bg-slate-900 lg:col-span-1">
          <iframe
            title={t("mapTitle")}
            src="https://www.openstreetmap.org/export/embed.html?bbox=23.5900%2C46.7760%2C23.5990%2C46.7800&layer=mapnik&marker=46.7780047%2C23.5945090"
            className="block h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="border-t border-clinic-border/70 dark:border-slate-800">
        <div className="container-page flex flex-col items-center gap-3 py-4 text-center text-xs text-clinic-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-left dark:text-slate-400">
          <div className="order-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:order-2 sm:justify-end">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-clinic-slate-600 transition hover:text-clinic-teal-700 dark:text-slate-400 dark:hover:text-clinic-teal-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <span className="order-2 sm:order-1">{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
