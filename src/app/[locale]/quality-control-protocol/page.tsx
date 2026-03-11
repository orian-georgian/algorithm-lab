import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "QualityControlProtocol",
  });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function QualityControlProtocolPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "QualityControlProtocol",
  });

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-6 px-4 pt-4 pb-10 sm:space-y-8 sm:px-6 sm:py-10 lg:space-y-10 lg:px-10">
        <PageIntro
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("intro")}
        />

        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <article
                key={index}
                className="rounded-2xl border border-clinic-border/70 bg-clinic-white p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-clinic-slate-900">
                  {t(`step${index}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
                  {t(`step${index}.text`)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
                  <span className="font-semibold text-clinic-slate-900">
                    {t("chairsideImpactLabel")}
                  </span>{" "}
                  {t(`step${index}.impact`)}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
          />
          <div className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-display-sm">{t("whyTitle")}</h2>
            </div>
            <ul className="mx-auto mt-6 grid max-w-4xl gap-3 text-sm leading-relaxed text-clinic-slate-700 sm:grid-cols-2 sm:text-base">
              {[
                t("whyPoints.one"),
                t("whyPoints.two"),
                t("whyPoints.three"),
                t("whyPoints.four"),
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-clinic-teal-700"
                    aria-hidden="true"
                  >
                    {"\u2713"}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-4xl text-center">
          <footer>
            <h2 className="text-lg font-semibold text-clinic-slate-900 sm:text-xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
              {t("ctaText")}
            </p>
            <div className="mt-5">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                iconVariant="arrowRight"
              >
                {t("ctaButton")}
              </Button>
            </div>
          </footer>
        </section>
      </div>
    </section>
  );
}
