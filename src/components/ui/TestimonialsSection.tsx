"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const testimonialKeys = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;
const SWIPE_OFFSET_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 500;
const DESKTOP_SIDE_SCALE = 0.74;
const DESKTOP_CARD_WIDTH_RATIO = 0.42;
const DESKTOP_CARD_MIN_WIDTH = 320;
const DESKTOP_CARD_MAX_WIDTH = 360;
const DESKTOP_BASE_GAP = 28;
const DESKTOP_MIN_GAP = 6;
const DESKTOP_PHASE1_START_WIDTH = 1220;
const DESKTOP_PHASE1_END_WIDTH = 980;
const DESKTOP_PHASE2_END_WIDTH = 760;
const DESKTOP_OVERLAP_MAX = 110;

function MaleDoctorIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="rgb(var(--clinic-blue-50))" />
      <circle cx="24" cy="18" r="7" fill="#fde68a" />
      <path d="M14 36c1.8-5.8 6.5-9 10-9s8.2 3.2 10 9" fill="#ffffff" />
      <path
        d="M17 15c1.6-3.8 4.7-5.7 7-5.7 2.3 0 5.4 1.9 7 5.7"
        fill="#0f172a"
      />
      <path d="M22 33h4v4h-4z" fill="#0ea5e9" />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0;0 -1;0 0"
        dur="2.2s"
        repeatCount="indefinite"
      />
    </svg>
  );
}

function FemaleDoctorIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="rgb(var(--clinic-blue-50))" />
      <circle cx="24" cy="18" r="7" fill="#fde68a" />
      <path d="M14 36c1.8-5.8 6.5-9 10-9s8.2 3.2 10 9" fill="#ffffff" />
      <path
        d="M16.5 18c0-5.2 3.4-8.7 7.5-8.7s7.5 3.5 7.5 8.7c0 0-1.2-2.7-3.5-4.1-2-1.3-4-1.5-4-1.5s-2 .2-4 1.5c-2.3 1.4-3.5 4.1-3.5 4.1Z"
        fill="#334155"
      />
      <path
        d="M19 30c1.8 2.4 8.2 2.4 10 0"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0;0 -1;0 0"
        dur="2.4s"
        repeatCount="indefinite"
      />
    </svg>
  );
}

type TestimonialsSectionProps = {
  showStepLabel?: boolean;
};

export function TestimonialsSection({
  showStepLabel = true,
}: TestimonialsSectionProps) {
  const t = useTranslations("Testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageWidth, setStageWidth] = useState(0);

  const total = testimonialKeys.length;

  const goTo = (nextDirection: 1 | -1) => {
    setCurrentIndex((prev) => (prev + nextDirection + total) % total);
  };

  const currentKey = testimonialKeys[currentIndex];
  const previousIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  useEffect(() => {
    const stageElement = stageRef.current;
    if (!stageElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setStageWidth(entry.contentRect.width);
    });

    resizeObserver.observe(stageElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const computedDesktopCardWidth = Math.max(
    DESKTOP_CARD_MIN_WIDTH,
    Math.min(
      DESKTOP_CARD_MAX_WIDTH,
      stageWidth > 0 ? stageWidth * DESKTOP_CARD_WIDTH_RATIO : 260,
    ),
  );
  const stageForMath = stageWidth > 0 ? stageWidth : DESKTOP_PHASE1_START_WIDTH;
  const phase1Progress = Math.min(
    1,
    Math.max(
      0,
      (DESKTOP_PHASE1_START_WIDTH - stageForMath) /
        (DESKTOP_PHASE1_START_WIDTH - DESKTOP_PHASE1_END_WIDTH),
    ),
  );
  const dynamicGap =
    DESKTOP_BASE_GAP - (DESKTOP_BASE_GAP - DESKTOP_MIN_GAP) * phase1Progress;
  const baseSideOffset =
    (computedDesktopCardWidth * (1 + DESKTOP_SIDE_SCALE)) / 2 + dynamicGap;
  const phase2Progress = Math.min(
    1,
    Math.max(
      0,
      (DESKTOP_PHASE1_END_WIDTH - stageForMath) /
        (DESKTOP_PHASE1_END_WIDTH - DESKTOP_PHASE2_END_WIDTH),
    ),
  );
  const computedSideOffset = Math.max(
    computedDesktopCardWidth * 0.42,
    baseSideOffset - DESKTOP_OVERLAP_MAX * phase2Progress,
  );

  const renderCard = (key: (typeof testimonialKeys)[number], index: number) => (
    <>
      <div className="mb-4 flex items-center gap-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-clinic-border bg-clinic-white shadow-sm">
          {index % 2 === 1 ? <FemaleDoctorIcon /> : <MaleDoctorIcon />}
        </div>
        <span className="rounded-full border border-clinic-border bg-clinic-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-clinic-teal-700 sm:px-3 sm:text-[11px] sm:tracking-[0.08em]">
          {t(`${key}.type`)}
        </span>
      </div>
      <blockquote className="text-sm leading-relaxed text-clinic-slate-700 sm:text-base">
        &ldquo;{t(`${key}.quote`)}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-clinic-teal-700">
        {t(`${key}.author`)}
      </figcaption>
    </>
  );

  return (
    <section id="testimonials" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          {showStepLabel ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
              {t("timelineLabel")}
            </p>
          ) : null}
          <h2 className="mt-3 text-display-sm">{t("title")}</h2>
          <p className="section-lead mt-4">{t("lead")}</p>
        </div>

        <div className="mx-auto mt-20 w-full">
          <div className="sm:hidden">
            <motion.figure
              key={currentKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragDirectionLock
              style={{ touchAction: "pan-y" }}
              onDragEnd={(_, info) => {
                const { offset, velocity } = info;
                if (
                  offset.x <= -SWIPE_OFFSET_THRESHOLD ||
                  velocity.x <= -SWIPE_VELOCITY_THRESHOLD
                ) {
                  goTo(1);
                  return;
                }
                if (
                  offset.x >= SWIPE_OFFSET_THRESHOLD ||
                  velocity.x >= SWIPE_VELOCITY_THRESHOLD
                ) {
                  goTo(-1);
                }
              }}
              className="mx-auto w-full rounded-2xl border border-clinic-border bg-clinic-white p-4 shadow-soft"
            >
              {renderCard(currentKey, currentIndex)}
            </motion.figure>

            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                onClick={() => goTo(-1)}
                variant="secondary"
                size="iconMd"
                iconVariant="chevronLeft"
                aria-label="Previous testimonial"
              />

              <Button
                onClick={() => goTo(1)}
                variant="secondary"
                size="iconMd"
                iconVariant="chevronRight"
                aria-label="Next testimonial"
              />
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative mx-auto hidden h-[340px] w-full overflow-hidden px-14 sm:block lg:h-[400px] lg:px-16"
          >
            <Button
              onClick={() => goTo(-1)}
              variant="secondary"
              size="iconMd"
              iconVariant="chevronLeft"
              className="absolute left-2 top-1/2 z-[70] -translate-y-1/2 lg:left-3"
              aria-label="Previous testimonial"
            />

            <Button
              onClick={() => goTo(1)}
              variant="secondary"
              size="iconMd"
              iconVariant="chevronRight"
              className="absolute right-2 top-1/2 z-[70] -translate-y-1/2 lg:right-3"
              aria-label="Next testimonial"
            />

            {[previousIndex, currentIndex, nextIndex].map((index) => {
              const key = testimonialKeys[index];
              const relative =
                index === currentIndex ? 0 : index === previousIndex ? -1 : 1;
              const isCurrent = relative === 0;
              const isPrevious = relative === -1;
              const isNext = relative === 1;

              let targetX = 0;
              let targetScale = 1;
              let targetOpacity = 1;
              let targetZIndex = 40;

              if (relative === -1) {
                targetX = -computedSideOffset;
                targetScale = DESKTOP_SIDE_SCALE;
                targetOpacity = 0.4;
                targetZIndex = 20;
              } else if (relative === 1) {
                targetX = computedSideOffset;
                targetScale = DESKTOP_SIDE_SCALE;
                targetOpacity = 0.4;
                targetZIndex = 20;
              } else {
                targetX = 0;
              }

              return (
                <div
                  key={key}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ zIndex: targetZIndex }}
                >
                  <motion.figure
                    initial={false}
                    animate={{
                      x: targetX,
                      scale: targetScale,
                      opacity: targetOpacity,
                    }}
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    className={`min-h-[250px] rounded-2xl border border-clinic-border bg-clinic-white p-6 transition-shadow duration-200 ${
                      isCurrent ? "shadow-soft" : "shadow-none"
                    } ${
                      isCurrent ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                    style={{
                      width: `${computedDesktopCardWidth}px`,
                      transformOrigin: isPrevious
                        ? "left center"
                        : isNext
                          ? "right center"
                          : "center center",
                    }}
                    aria-hidden={!isCurrent}
                  >
                    {renderCard(key, index)}
                  </motion.figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
