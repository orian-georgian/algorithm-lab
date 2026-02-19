import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactSection } from "@/components/ui/ContactSection";
import { TeamImageWithLoader } from "@/components/ui/TeamImageWithLoader";
import { getPageMetadata } from "@/seo/metadata";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(params.locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

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
        <ContactSection
          showStepLabel={false}
          title={t("sectionTitle")}
          lead={t("sectionLead")}
        />

        <section>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-sm">{t("prioritySectionTitle")}</h2>
            <p className="section-lead mt-4">{t("prioritySectionLead")}</p>
          </div>
          <div className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-7 sm:mt-10 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
            />
            <div className="relative z-10 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="px-1 py-1 sm:px-2">
                <h2 className="text-2xl font-semibold text-clinic-slate-900">
                  {t("priorityTitle")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-clinic-slate-700">
                  {t("priorityLead")}
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-clinic-slate-700">
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t("priorityPointOne")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t("priorityPointTwo")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t("priorityPointThree")}</span>
                  </li>
                </ul>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-clinic-blue-50">
                <TeamImageWithLoader
                  src="/media/images/gallery-6.jpg"
                  alt={t("mapAlt")}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  withGalleryLoadingEffect
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-7 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("finalCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
