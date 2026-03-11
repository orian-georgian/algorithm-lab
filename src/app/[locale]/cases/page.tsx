import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/ui/PageIntro";
import { HomeClosingStrip } from "@/components/ui/HomeClosingStrip";
import { getPageMetadata } from "@/seo/metadata";
import { beforeAfterCases } from "@/lib/media-assets";

const BeforeAfterSlider = dynamicImport(() =>
  import("@/components/ui/media/BeforeAfterSlider").then(
    (m) => m.BeforeAfterSlider,
  ),
);

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(params.locale, "cases");
}

export default async function CasesPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CasesPage" });

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-6 px-4 py-4 sm:space-y-8 sm:px-6 sm:py-10 lg:space-y-10 lg:px-10">
        <PageIntro
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <section className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {beforeAfterCases.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-3xl border border-clinic-border bg-clinic-white shadow-none transition-shadow duration-200 hover:shadow-soft"
            >
              <BeforeAfterSlider
                beforeSrc={item.beforeSrc}
                afterSrc={item.afterSrc}
                width={item.width}
                height={item.height}
                beforeAlt={t(`case${item.id}BeforeAlt`)}
                afterAlt={t(`case${item.id}AfterAlt`)}
                beforeLabel={t("beforeLabel")}
                afterLabel={t("afterLabel")}
              />
              <div className="space-y-3 border-t border-clinic-border/70 p-6">
                <h2 className="text-center text-base font-semibold text-clinic-slate-900 sm:text-lg">
                  {t(`case${item.id}Summary`)}
                </h2>
                <p className="text-sm leading-relaxed text-clinic-slate-700">
                  {t(`case${item.id}Work`)}
                </p>
                <ul className="space-y-1.5 border-t border-clinic-border/60 pt-3 text-sm text-clinic-slate-700">
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t(`case${item.id}Point1`)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                      aria-hidden="true"
                    >
                      {"\u2713"}
                    </span>
                    <span>{t(`case${item.id}Point2`)}</span>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </section>
        <HomeClosingStrip
          ctaLabel={t("finalCta")}
          ctaHref="/contact"
          showStepLabel={false}
        />
      </div>
    </section>
  );
}
