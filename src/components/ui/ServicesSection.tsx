"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const serviceKeys = ["one", "two", "three"] as const;
const pillKeys = ["one", "two", "three"] as const;

type Props = {
  withSectionPadding?: boolean;
  className?: string;
  showQualityBlock?: boolean;
  showAllServicesCta?: boolean;
  showStepLabel?: boolean;
  title?: string;
  lead?: string;
};

export function ServicesSection({
  withSectionPadding = true,
  className,
  showQualityBlock = true,
  showAllServicesCta = false,
  showStepLabel = true,
  title,
  lead,
}: Props) {
  const t = useTranslations("Services");

  return (
    <section
      id="services"
      className={["relative isolate scroll-mt-28 sm:scroll-mt-32", className ?? ""].join(" ")}
    >
      <div className={withSectionPadding ? "py-6 sm:py-8 lg:py-10" : ""}>
        <div className="mx-auto max-w-3xl text-center">
          {showStepLabel ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
              {t("timelineLabel")}
            </p>
          ) : null}
          <h2 className="mt-3 text-display-sm">{title ?? t("title")}</h2>
          <p className="section-lead mt-4">{lead ?? t("lead")}</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {pillKeys.map((key) => (
            <span
              key={key}
              className="rounded-full border border-clinic-border bg-clinic-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-clinic-teal-700 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.12em]"
            >
              {t(`pills.${key}`)}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, index) => (
            <article
              key={key}
              className="flex h-full flex-col rounded-2xl border border-clinic-border bg-clinic-white p-7 shadow-none transition-shadow duration-200 hover:shadow-soft"
            >
              <div className="mb-5">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 text-xs font-semibold leading-none text-white dark:text-slate-950 tabular-nums">
                    {index + 1}
                  </span>
                  <h3 className="pt-0.5 text-xl font-semibold text-clinic-slate-900">
                    {t(`${key}.title`)}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-clinic-slate-700">
                {t(`${key}.description`)}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-clinic-slate-700">
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                    aria-hidden="true"
                  >
                    {"\u2713"}
                  </span>
                  <span>{t(`${key}.pointOne`)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                    aria-hidden="true"
                  >
                    {"\u2713"}
                  </span>
                  <span>{t(`${key}.pointTwo`)}</span>
                </li>
              </ul>

              <p className="mt-5 rounded-xl bg-clinic-blue-50 px-4 py-3 text-sm font-medium text-clinic-slate-800">
                {t(`${key}.outcome`)}
              </p>

              <div className="mt-auto flex justify-center pt-6">
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
                >
                  {t("requestOfferCta")}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {showQualityBlock ? (
          <div className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
            />
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-clinic-slate-900">
                {t("qualityTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-clinic-slate-700">
                {t("qualityText")}
              </p>
            </div>
          </div>
        ) : null}

        {showAllServicesCta ? (
          <div className="mt-8 lg:mt-12 flex justify-center">
            <Link
              href="/services"
              className="inline-flex rounded-full border border-clinic-border bg-clinic-white px-6 py-3 text-sm font-semibold text-clinic-slate-800 shadow-sm transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
            >
              {t("seeMoreServicesCta")}
            </Link>
          </div>
        ) : null}

      </div>
    </section>
  );
}

