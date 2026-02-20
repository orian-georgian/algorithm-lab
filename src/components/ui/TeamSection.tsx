"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TeamImageWithLoader } from "@/components/ui/TeamImageWithLoader";

type TeamSectionProps = {
  showStepLabel?: boolean;
};

export function TeamSection({ showStepLabel = true }: TeamSectionProps) {
  const t = useTranslations("AboutPage");
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  type CertificationIcon = "smile" | "chip" | "implant" | "wave" | "spark";
  type Certification = {
    id: number;
    title: string;
    description: string;
    icon: CertificationIcon;
    memberIds: number[];
    certX: number;
  };
  const teamAnchorX: Record<number, number> = {
    1: 170,
    2: 500,
    3: 830,
  };
  const team = [
    { id: 1, image: "/media/images/team-1.png" },
    { id: 2, image: "/media/images/team-2.png" },
    { id: 3, image: "/media/images/team-3.png" },
  ] as const;
  const certifications: Certification[] = [
    {
      id: 1,
      title: t("certification1Title"),
      description: t("certification1Description"),
      icon: "smile",
      memberIds: [1, 2],
      certX: 100,
    },
    {
      id: 2,
      title: t("certification2Title"),
      description: t("certification2Description"),
      icon: "chip",
      memberIds: [2],
      certX: 300,
    },
    {
      id: 3,
      title: t("certification3Title"),
      description: t("certification3Description"),
      icon: "implant",
      memberIds: [3],
      certX: 500,
    },
    {
      id: 4,
      title: t("certification4Title"),
      description: t("certification4Description"),
      icon: "wave",
      memberIds: [2, 3],
      certX: 700,
    },
    {
      id: 5,
      title: t("certification5Title"),
      description: t("certification5Description"),
      icon: "spark",
      memberIds: [1],
      certX: 900,
    },
  ];

  const renderCertificationIcon = (icon: CertificationIcon) => {
    if (icon === "smile") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
          <path d="M8.5 14c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    }
    if (icon === "chip") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 10h4v4h-4zM4 9h2M4 15h2M18 9h2M18 15h2M9 4v2M15 4v2M9 18v2M15 18v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    }
    if (icon === "implant") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <path d="M9 4h6M10 7h4M10 10h4M9.5 13h5M9 16h6M8.5 19h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="9" y="3" width="6" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    }
    if (icon === "wave") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <path d="M3 13c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
        <path d="M12 3l2.1 4.4L19 9.2l-3.5 3.4.8 4.9L12 15.1 7.7 17.5l.8-4.9L5 9.2l4.9-1.8L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <section id="team" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        {showStepLabel ? (
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
            {t("teamTimelineLabel")}
          </p>
        ) : null}
        <h2 className="mt-3 text-center text-display-sm">{t("teamTitle")}</h2>
        <p className="mt-4 mx-auto max-w-3xl text-center section-lead">
          {t("teamLead")}
        </p>

        <div className="relative mx-auto mt-7 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {team.map(({ id, image }) => (
              <article
                key={id}
                className="overflow-hidden rounded-3xl border border-clinic-border bg-clinic-white shadow-none transition-shadow duration-200 hover:shadow-soft"
                onMouseEnter={() => setActiveMemberId(id)}
                onMouseLeave={() => setActiveMemberId(null)}
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

          <div className="relative hidden h-[180px] lg:block">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 180"
              fill="none"
              aria-hidden="true"
            >
              {certifications.flatMap((cert) =>
                cert.memberIds.map((memberId) => {
                  const shouldHideLine =
                    activeMemberId !== null && memberId !== activeMemberId;

                  return (
                    <path
                      key={`line-${cert.id}-${memberId}`}
                      d={`M ${teamAnchorX[memberId]} 0 C ${teamAnchorX[memberId]} 46, ${cert.certX} 122, ${cert.certX} 180`}
                      stroke="rgb(var(--clinic-teal-700) / 0.5)"
                      strokeWidth={1.25}
                      strokeLinecap="round"
                      style={{
                        opacity: shouldHideLine ? 0 : 1,
                        transition: "opacity 180ms ease",
                      }}
                    />
                  );
                }),
              )}
            </svg>
          </div>

          <div className="mt-8 mb-5 flex flex-col items-center gap-2 text-center lg:hidden">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
              {t("certificationsEyebrow")}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-clinic-slate-700">
              {t("certificationsIntro")}
            </p>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className={[
                    "rounded-2xl border border-clinic-border/80 bg-clinic-white px-4 py-5 text-center transition-shadow duration-200",
                    activeMemberId !== null && cert.memberIds.includes(activeMemberId)
                      ? "shadow-soft"
                      : "shadow-none",
                  ].join(" ")}
                >
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-clinic-blue-50 text-clinic-teal-700">
                    {renderCertificationIcon(cert.icon)}
                  </div>
                  <p className="text-sm font-semibold text-clinic-slate-800">{cert.title}</p>
                  <p className="mt-3 text-xs leading-relaxed text-clinic-slate-600">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

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
