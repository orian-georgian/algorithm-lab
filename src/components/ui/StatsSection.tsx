"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const statKeys = ["dentists", "clinics", "cases", "years"] as const;

type StatsSectionProps = {
  showStepLabel?: boolean;
};

export function StatsSection({ showStepLabel = true }: StatsSectionProps) {
  const t = useTranslations("HomeStats");

  return (
    <section id="stats" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          {showStepLabel ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
              {t("timelineLabel")}
            </p>
          ) : null}
          <h2 className="mt-3 text-display-sm">{t("title")}</h2>
          <p className="section-lead mt-4">{t("lead")}</p>
        </div>

        <div className="mt-8 grid gap-4 py-4 sm:grid-cols-2 sm:py-6 lg:grid-cols-4 lg:py-8">
          {statKeys.map((key) => (
            <article key={key} className="px-2 py-3 text-center">
              <p className="text-4xl font-extrabold leading-none text-clinic-teal-700 sm:text-5xl lg:text-6xl">
                {t(`${key}.value`)}
              </p>
              <p className="mt-2 text-sm font-medium text-clinic-slate-700 sm:text-base">
                {t(`${key}.label`)}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-4xl text-center text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
          {t("bridgeToFeedback")}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

