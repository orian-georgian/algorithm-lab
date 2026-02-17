"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function HeroSection() {
  const t = useTranslations("Home");
  const handleScrollToServices = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const servicesSection = document.getElementById("services");
    if (!servicesSection) return;

    const header = document.querySelector("header");
    const headerHeight =
      header instanceof HTMLElement ? header.offsetHeight : 0;
    const targetY =
      servicesSection.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      12;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 950;
    let startTime: number | null = null;

    const easeInOutCubic = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <section id="home" className="relative isolate">
      <div className="py-4 sm:py-8 lg:py-10">
        <div className="relative overflow-hidden rounded-3xl bg-clinic-white px-8 py-8 sm:px-12 sm:pb-12 sm:pt-6 lg:px-16 lg:py-16">
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
                  className="w-full rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-6 py-3 text-center text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:w-auto"
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/#services"
                  onClick={handleScrollToServices}
                  className="w-full rounded-full border border-clinic-border bg-clinic-white px-6 py-3 text-center text-sm font-semibold text-clinic-slate-800 transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:w-auto"
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>

            <div className="order-2 relative mt-6 -mb-8 sm:-mb-12 lg:-mb-16 lg:mt-0 lg:self-end lg:pl-6">
              <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[500px] xl:h-[560px]">
                <Image
                  src="/media/images/person-1.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                  className="object-contain object-bottom"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
