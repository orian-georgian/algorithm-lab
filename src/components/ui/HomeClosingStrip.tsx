"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type HomeClosingStripProps = {
  ctaLabel?: string;
  ctaHref?: "/services" | "/contact";
};

export function HomeClosingStrip({
  ctaLabel,
  ctaHref = "/services",
}: HomeClosingStripProps) {
  const t = useTranslations("HomeClosing");
  const highlights = [
    { title: t("pointOne"), description: t("pointOneDetail") },
    { title: t("pointTwo"), description: t("pointTwoDetail") },
    { title: t("pointThree"), description: t("pointThreeDetail") },
  ];

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <div className="relative">
        <div className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 dark:text-clinic-teal-300 sm:text-xs">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-display-sm text-clinic-slate-900 dark:text-slate-100">
              {t("title")}
            </h2>
            <p className="section-lead mt-4">{t("description")}</p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl">
            <ul className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-clinic-border/70 bg-clinic-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clinic-blue-100 text-clinic-teal-700 dark:bg-slate-800 dark:text-clinic-teal-300"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5 fill-current"
                      >
                        <path d="M7.7 13.5 4.2 10l1.1-1.1 2.4 2.4 6-6L15 6.4l-7.3 7.1Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-clinic-slate-700 dark:text-slate-300">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-clinic-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 lg:mt-12 flex justify-center">
            <Link
              href={ctaHref}
              className="inline-flex rounded-full bg-clinic-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-clinic-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
            >
              {ctaLabel ?? t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
