import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactSection } from "@/components/ui/ContactSection";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
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
      <div className="space-y-8 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-10 lg:px-10">
        <PageIntro
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ContactSection />

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-clinic-border bg-clinic-white p-7">
            <h2 className="text-2xl font-semibold text-clinic-slate-900">
              {t("visitTitle")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-clinic-slate-700">
              {t("visitText")}
            </p>
            <h3 className="mt-6 text-lg font-semibold text-clinic-slate-900">
              {t("emergencyTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-clinic-slate-700">
              {t("emergencyText")}
            </p>
          </div>
          <MediaPlaceholder
            src="/images/gallery/item-6.svg"
            alt={t("mapAlt")}
            label={t("mapLabel")}
          />
        </section>
      </div>
    </section>
  );
}
