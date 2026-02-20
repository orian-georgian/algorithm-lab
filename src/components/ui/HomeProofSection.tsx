"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const proofKeys = ["one", "two", "three", "four"] as const;
export function HomeProofSection() {
  const t = useTranslations("HomeProof");

  return (
    <section className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
            {t("timelineLabel")}
          </p>
          <h2 className="mt-3 text-display-sm">
            {t("whyTitle")}
          </h2>
          <p className="section-lead mt-4">
            {t("whySubtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 py-4 sm:grid-cols-2 sm:py-6 lg:grid-cols-4 lg:py-8">
          {proofKeys.map((key) => (
            <article key={key} className="px-2 py-3 text-center">
              <p className="text-4xl font-extrabold leading-none text-clinic-teal-700 sm:text-5xl lg:text-6xl">
                {t(`${key}.value`)}
              </p>
              <p className="mt-2 text-sm font-medium text-clinic-slate-700 sm:text-base">
                {t(`${key}.label`)}
              </p>
              <p className="mx-auto mt-2 max-w-[22ch] text-xs leading-relaxed text-clinic-slate-600 sm:text-sm">
                {t(`${key}.text`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/quality-control-protocol"
            className="rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
