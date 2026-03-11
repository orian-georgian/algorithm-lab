"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const statKeys = ["dentists", "clinics", "cases", "years"] as const;

type StatsSectionProps = {
  showStepLabel?: boolean;
};

type CountUpStatValueProps = {
  value: string;
  shouldAnimate: boolean;
  durationMs?: number;
};

function CountUpStatValue({
  value,
  shouldAnimate,
  durationMs = 1300,
}: CountUpStatValueProps) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefersReducedMotion = useReducedMotion();
  const [, prefix = "", digits = "", suffix = ""] = match ?? [];
  const target = digits ? Number.parseInt(digits, 10) : Number.NaN;
  const isCountable = Number.isFinite(target);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isCountable) {
      return;
    }

    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    if (!shouldAnimate) {
      return;
    }

    let animationFrame = 0;
    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(target * eased);
      setDisplayValue((prev) => (prev === nextValue ? prev : nextValue));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [durationMs, isCountable, prefersReducedMotion, shouldAnimate, target]);

  if (!match) {
    return <>{value}</>;
  }

  return (
    <>
      {prefix}
      {displayValue}
      {suffix}
    </>
  );
}

export function StatsSection({ showStepLabel = true }: StatsSectionProps) {
  const t = useTranslations("HomeStats");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const shouldAnimate = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section id="stats" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          {showStepLabel ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
              {t("timelineLabel")}
            </p>
          ) : null}
          <h2 className="mt-3 text-display-sm">{t("title")}</h2>
          <p className="section-lead mt-4">{t("lead")}</p>
        </div>

        <div
          ref={sectionRef}
          className="mt-10 grid gap-4 py-4 sm:mt-12 sm:grid-cols-2 sm:py-6 lg:grid-cols-4 lg:py-8"
        >
          {statKeys.map((key) => (
            <article key={key} className="px-2 py-3 text-center">
              <p className="text-4xl font-extrabold leading-none text-clinic-teal-700 sm:text-5xl lg:text-6xl">
                <CountUpStatValue
                  value={t(`${key}.value`)}
                  shouldAnimate={shouldAnimate}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-clinic-slate-700 sm:text-base">
                {t(`${key}.label`)}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
          {t("bridgeToFeedback")}
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            iconVariant="arrowRight"
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}

