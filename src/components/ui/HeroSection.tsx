"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { HeroBiteMarks } from "@/components/ui/HeroBiteMarks";

export function HeroSection() {
  const t = useTranslations("Home");

  const handlePrimaryCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;
    event.preventDefault();
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleSecondaryCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const servicesSection = document.getElementById("services");
    if (!servicesSection) return;
    event.preventDefault();
    servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative isolate">
      <div className="py-4 sm:py-8 lg:py-10">
        <div className="relative overflow-hidden rounded-3xl bg-clinic-white px-8 py-8 sm:px-12 sm:pb-12 sm:pt-6 lg:px-16 lg:py-16">
          <HeroBiteMarks position="topRight" />
          <HeroBiteMarks position="leftCenter" />
          <HeroBiteMarks position="rightCenter" />
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
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-clinic-slate-900 sm:text-5xl lg:text-[48px]">
                {t("heroTitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-clinic-slate-700 sm:text-lg">
                {t("heroDescription")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/#contact"
                  onClick={handlePrimaryCtaClick}
                  variant="primary"
                  size="lg"
                  iconVariant="arrowRight"
                  className="w-full sm:w-auto"
                >
                  {t("primaryCta")}
                </Button>
                <Button
                  href="/#services"
                  onClick={handleSecondaryCtaClick}
                  variant="secondary"
                  size="lg"
                  iconVariant="spark"
                  className="w-full sm:w-auto"
                >
                  {t("secondaryCta")}
                </Button>
              </div>
            </div>

            <div className="order-2 relative mt-6 -mb-8 sm:-mb-12 lg:-mb-16 lg:mt-0 lg:self-end lg:pl-6">
              <div className="relative h-[240px] w-full sm:h-[300px] lg:h-[440px] xl:h-[500px]">
                <Image
                  src="/media/images/flaviu.png"
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
