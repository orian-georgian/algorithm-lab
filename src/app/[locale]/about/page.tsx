import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { TeamImageWithLoader } from "@/components/ui/TeamImageWithLoader";
import { getPageMetadata } from "@/seo/metadata";

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
  const team = [
    { id: 1, image: "/media/images/team-1.png" },
    { id: 2, image: "/media/images/team-2.png" },
    { id: 3, image: "/media/images/team-3.png" },
  ] as const;

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-8 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-10 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-8 sm:p-12">
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
            <div className="relative mt-6 lg:-mb-16 lg:mt-0 lg:self-end lg:pl-2">
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

        <section>
          <h2 className="py-6 text-center text-display-sm sm:py-8">
            {t("teamTitle")}
          </h2>
          <p className="-mt-4 mx-auto max-w-3xl text-center section-lead">
            {t("teamLead")}
          </p>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {team.map(({ id, image }) => (
              <article
                key={id}
                className="overflow-hidden rounded-3xl border border-clinic-border bg-clinic-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
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
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-clinic-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-clinic-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
            >
              {t("teamCta")}
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
