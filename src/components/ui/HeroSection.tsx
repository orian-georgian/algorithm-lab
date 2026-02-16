"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function HeroSection() {
  const t = useTranslations("Home");

  return (
    <section id="home" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="relative overflow-hidden rounded-3xl bg-clinic-white px-8 pb-8 pt-3 sm:px-12 sm:pb-12 sm:pt-5 lg:px-16 lg:pb-16 lg:pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="order-1 max-w-none lg:pr-6">
              <p className="inline-flex rounded-full border border-clinic-border bg-clinic-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-clinic-teal-700 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                {t("heroEyebrow")}
              </p>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-clinic-slate-900 sm:text-5xl lg:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-clinic-slate-700 sm:text-lg">
                {t("heroDescription")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="w-full rounded-full bg-clinic-teal-700 px-6 py-3 text-center text-sm font-semibold text-white shadow-soft transition hover:bg-clinic-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:w-auto"
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/#services"
                  className="w-full rounded-full border border-clinic-border bg-clinic-white px-6 py-3 text-center text-sm font-semibold text-clinic-slate-800 transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:w-auto"
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>

            <div className="order-2 relative mt-6 lg:-mb-16 lg:mt-0 lg:self-end lg:pl-6">
              <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[500px] xl:h-[560px]">
                <Image
                  src="/media/images/person-1.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 48vw"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
