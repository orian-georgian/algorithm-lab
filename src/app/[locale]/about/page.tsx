import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { TeamSection } from "@/components/ui/TeamSection";
import { getPageMetadata } from "@/seo/metadata";
import { HeroBiteMarks } from "@/components/ui/HeroBiteMarks";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(params.locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-6 px-4 pt-4 pb-10 sm:space-y-8 sm:px-6 sm:py-10 lg:space-y-10 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-8 sm:p-12">
          <HeroBiteMarks position="topRight" />
          <HeroBiteMarks position="leftCenter" />
          <HeroBiteMarks position="rightCenter" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
          />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs sm:tracking-[0.16em]">
                {t("eyebrow")}
              </p>
              <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-clinic-slate-900 sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-clinic-slate-700 sm:text-lg">
                {t("description")}
              </p>
              <div className="mt-6 space-y-3 border-t border-clinic-border/70 pt-5">
                <h2 className="text-xl font-semibold text-clinic-slate-900">
                  {t("storyTitle")}
                </h2>
                <p className="text-sm leading-relaxed text-clinic-slate-700">
                  {t("storyLead")}
                </p>
                <p className="text-sm leading-relaxed text-clinic-slate-700">
                  {t("storyP1")}
                </p>
                <p className="text-sm leading-relaxed text-clinic-slate-700">
                  {t("storyP2")}
                </p>
              </div>
            </div>
            <div className="relative mt-6 -mb-8 self-end sm:-mb-12 lg:-mb-16 lg:mt-0 lg:pl-2">
              <div className="relative h-[300px] w-full sm:h-[360px] lg:h-[500px]">
                <Image
                  src="/media/images/team-0.png"
                  alt={t("teamImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 70vw, 28vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-20 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-clinic-slate-900">
                {t("missionTitle")}
              </h2>
              <p className="text-sm leading-relaxed text-clinic-slate-700">
                {t("missionText")}
              </p>
              <p className="text-sm leading-relaxed text-clinic-slate-700">
                {t("missionTextExtra")}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-clinic-slate-900">
                {t("standardsTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-clinic-slate-700">
                {t("standardsText")}
              </p>
              <p className="text-sm leading-relaxed text-clinic-slate-700">
                {t("standardsTextExtra")}
              </p>
            </div>
          </div>
        </section>
        <TeamSection showStepLabel={false} />
      </div>
    </section>
  );
}
