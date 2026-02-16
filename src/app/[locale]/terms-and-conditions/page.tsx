import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "LegalPages.terms",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TermsAndConditionsPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "LegalPages.terms" });
  const sections = [1, 2, 3, 4] as const;

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-8 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-10 lg:px-10">
        <section className="rounded-3xl bg-clinic-white p-8 sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs sm:tracking-[0.16em]">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-clinic-slate-900 sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-clinic-slate-700 sm:text-lg">
            {t("description")}
          </p>
          <p className="mt-4 text-sm text-clinic-slate-600">
            <span className="font-medium">{t("updatedLabel")}:</span>{" "}
            {t("updatedValue")}
          </p>
        </section>

        <section className="rounded-3xl bg-clinic-white p-8 sm:p-10">
          <div className="space-y-6">
            {sections.map((index) => (
              <article key={index} className="space-y-2 border-b border-clinic-border/70 pb-5 last:border-b-0 last:pb-0">
                <h2 className="text-xl font-semibold text-clinic-slate-900">
                  {t(`section${index}Title`)}
                </h2>
                <p className="text-sm leading-relaxed text-clinic-slate-700">
                  {t(`section${index}Text`)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
