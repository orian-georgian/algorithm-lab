"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const proofKeys = ["one", "two", "three", "four"] as const;

type AnimatedProofValueProps = {
  value: string;
  isActive: boolean;
};

function AnimatedProofValue({ value, isActive }: AnimatedProofValueProps) {
  const prefersReducedMotion = useReducedMotion();
  const inactiveColor = "rgb(var(--clinic-teal-700) / 0.72)";
  const activeColor = "rgb(var(--clinic-slate-900))";
  const colorAnimation = { color: isActive ? activeColor : inactiveColor };
  const colorTransition = {
    duration: prefersReducedMotion ? 0 : 0.6,
    ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
  };

  return (
    <motion.span
      animate={colorAnimation}
      transition={colorTransition}
      style={{ display: "inline-block" }}
    >
      {value}
    </motion.span>
  );
}

export function HomeProofSection() {
  const t = useTranslations("HomeProof");
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sequenceRef, { amount: 0.45 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionInView) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveProofIndex((prev) => (prev + 1) % proofKeys.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, sectionInView]);

  return (
    <section className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
            {t("timelineLabel")}
          </p>
          <h2 className="mt-3 text-display-sm">{t("whyTitle")}</h2>
          <p className="section-lead mt-4">{t("whySubtitle")}</p>
        </div>

        <div
          ref={sequenceRef}
          className="mt-8 grid gap-4 py-4 sm:grid-cols-2 sm:py-6 lg:grid-cols-4 lg:py-8"
        >
          {proofKeys.map((key, index) => (
            <article key={key} className="px-2 py-3 text-center">
              <p className="text-4xl font-extrabold leading-none text-clinic-teal-700 sm:text-5xl lg:text-6xl">
                <AnimatedProofValue
                  value={t(`${key}.value`)}
                  isActive={
                    !prefersReducedMotion &&
                    sectionInView &&
                    index === activeProofIndex
                  }
                />
              </p>
              <p className="mt-2 text-sm font-medium text-clinic-slate-700 sm:text-base">
                {t(`${key}.label`)}
              </p>
              <p className="mx-auto mt-2 max-w-[22ch] text-xs leading-relaxed text-clinic-slate-600 sm:text-sm">
                {t(`${key}.text`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            href="/quality-control-protocol"
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
