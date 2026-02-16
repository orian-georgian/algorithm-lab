"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const locales = [
  { code: "ro", label: "RO" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" }
] as const;

export function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="border-b border-clinic-primary/10 bg-clinic-surface/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-clinic-primary"
        >
          Algorithm
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="text-clinic-text transition hover:text-clinic-accent">
            {t("home")}
          </Link>
          <Link href="/#services" className="text-clinic-text transition hover:text-clinic-accent">
            {t("services")}
          </Link>
          <Link href="/#contact" className="text-clinic-text transition hover:text-clinic-accent">
            {t("contact")}
          </Link>
        </div>

        <div className="flex gap-2">
          {locales.map((item) => (
            <Link
              key={item.code}
              href={pathname}
              locale={item.code}
              className={[
                "rounded-md px-2 py-1 text-xs font-semibold transition",
                locale === item.code
                  ? "bg-clinic-primary text-white"
                  : "bg-clinic-bg text-clinic-muted hover:bg-clinic-primary/10"
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
