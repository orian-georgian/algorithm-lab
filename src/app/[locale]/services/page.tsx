import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageIntro } from "@/components/ui/PageIntro";
import { ServicesSection } from "@/components/ui/ServicesSection";
import { TeamImageWithLoader } from "@/components/ui/TeamImageWithLoader";
import { getPageMetadata } from "@/seo/metadata";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(params.locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-8 px-4 pt-4 pb-10 sm:space-y-12 sm:px-6 sm:py-10 lg:px-10">
        <PageIntro
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ServicesSection
          className="py-6 sm:py-8 lg:py-10"
          withSectionPadding={false}
          showStepLabel={false}
          title={t("sectionTitle")}
          lead={t("sectionLead")}
        />

        <section>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-sm">{t("secondaryTitle")}</h2>
            <p className="section-lead mt-4">{t("secondaryLead")}</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <article
                key={index}
                className="rounded-2xl border border-clinic-border bg-clinic-white p-6 shadow-none transition-shadow duration-200 hover:shadow-soft"
              >
                <h3 className="text-lg font-semibold text-clinic-slate-900">
                  {t(`secondary${index}Title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-clinic-slate-700">
                  {t(`secondary${index}Text`)}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-clinic-slate-700">
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t(`secondary${index}Point1`)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t(`secondary${index}Point2`)}</span>
                  </li>
                </ul>
                <p className="mt-4 rounded-xl bg-clinic-blue-50 px-3 py-2 text-sm font-medium text-clinic-slate-800">
                  {t(`secondary${index}Outcome`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-6 sm:pt-8 lg:pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-sm">{t("workflowTitle")}</h2>
            <p className="section-lead mt-4">{t("workflowText")}</p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-7 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
            />
            <div className="relative z-10 mt-0 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-clinic-blue-50">
                <TeamImageWithLoader
                  src="/media/images/person-2.png"
                  alt={t("workflowImageAlt")}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  withGalleryLoadingEffect
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <article key={index} className="rounded-xl p-3">
                    <h3 className="text-sm font-semibold text-clinic-slate-900">
                      {t(`step${index}Title`)}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-clinic-slate-700">
                      {t(`step${index}Text`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-6 sm:pt-8 lg:pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-sm">{t("technologyTitle")}</h2>
            <p className="section-lead mt-4">{t("technologyLead")}</p>
          </div>

          <div className="mt-8 space-y-6">
            <article className="rounded-2xl border border-clinic-border/70 bg-clinic-white p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-clinic-slate-900">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-clinic-teal-700" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span>{t("automationTitle")}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
                  {t("automationText")}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-clinic-slate-700">
                  {[1, 2, 3].map((index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                        aria-hidden="true"
                      >
                        {"\u2713"}
                      </span>
                      <span>{t(`automationPoint${index}`)}</span>
                    </li>
                  ))}
                </ul>
            </article>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-clinic-border/70 bg-clinic-white p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-clinic-slate-900">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-clinic-teal-700" fill="none" aria-hidden="true">
                      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span>{t("machinesTitle")}</span>
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                          aria-hidden="true"
                        >
                          {"\u2713"}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-clinic-slate-900">
                            {t(`machine${index}Title`)}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-clinic-slate-700 sm:text-sm">
                            {t(`machine${index}Text`)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
              </article>

              <article className="rounded-2xl border border-clinic-border/70 bg-clinic-white p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-clinic-slate-900">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-clinic-teal-700" fill="none" aria-hidden="true">
                      <path d="M7 5h10v4H7zM6 10h12v4H6zM5 15h14v4H5z" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <span>{t("materialsTitle")}</span>
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                          aria-hidden="true"
                        >
                          {"\u2713"}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-clinic-slate-900">
                            {t(`material${index}Title`)}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-clinic-slate-700 sm:text-sm">
                            {t(`material${index}Text`)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
              </article>
            </div>

              <article className="rounded-2xl border border-clinic-border/70 bg-clinic-white p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-clinic-slate-900">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-clinic-teal-700" fill="none" aria-hidden="true">
                    <path d="M6 18V9M12 18V6M18 18v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M4 18h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span>{t("whyItMattersTitle")}</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-clinic-slate-700">
                  {[1, 2, 3].map((index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                        aria-hidden="true"
                      >
                        {"\u2713"}
                      </span>
                      <span>{t(`whyItMattersPoint${index}`)}</span>
                    </li>
                  ))}
                </ul>
            </article>
          </div>
        </section>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-7 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("finalCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
