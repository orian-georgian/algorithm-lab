"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TeamImageWithLoader } from "@/components/ui/TeamImageWithLoader";

export function TeamSection() {
  const t = useTranslations("AboutPage");
  const team = [
    { id: 1, image: "/media/images/team-1.png" },
    { id: 2, image: "/media/images/team-2.png" },
    { id: 3, image: "/media/images/team-3.png" },
  ] as const;

  return (
    <section id="team" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
          {t("teamTimelineLabel")}
        </p>
        <h2 className="mt-3 text-center text-display-sm">{t("teamTitle")}</h2>
        <p className="mt-4 mx-auto max-w-3xl text-center section-lead">
          {t("teamLead")}
        </p>

        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {team.map(({ id, image }) => (
            <article
              key={id}
              className="overflow-hidden rounded-3xl border border-clinic-border bg-clinic-white shadow-none transition-shadow duration-200 hover:shadow-soft"
            >
              <div className="relative h-60 w-full overflow-hidden bg-transparent p-4">
                <TeamImageWithLoader
                  src={image}
                  alt={t(`member${id}Name`)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-bottom"
                  withGalleryLoadingEffect
                />
              </div>
              <div className="space-y-3 border-t border-clinic-border/70 p-6">
                <h3 className="text-center text-lg font-semibold text-clinic-slate-900">
                  {t(`member${id}Name`)}
                </h3>
                <p className="flex justify-center">
                  <span className="inline-flex rounded-full bg-clinic-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-clinic-teal-700 sm:px-3 sm:text-xs sm:tracking-[0.08em]">
                    {t(`member${id}Role`)}
                  </span>
                </p>
                <p className="text-sm leading-relaxed text-clinic-slate-700">
                  {t(`member${id}Bio`)}
                </p>
                <ul className="space-y-1.5 border-t border-clinic-border/60 pt-3 text-sm text-clinic-slate-700">
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t(`member${id}Detail1`)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t(`member${id}Detail2`)}</span>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 lg:mt-12 flex justify-center">
          <Link
            href="/contact"
            className="rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("teamCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

