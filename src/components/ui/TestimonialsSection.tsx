"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
const INITIAL_VISIBLE_COUNT = 3;
const LOAD_STEP = 3;

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

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const visibleTestimonials = testimonialKeys.slice(0, visibleCount);
  const canShowMore = visibleCount < testimonialKeys.length;

  const handleShowMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_STEP, testimonialKeys.length),
    );
  };

  return (
    <section id="testimonials" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-sm">{t("title")}</h2>
          <p className="section-lead mt-4">{t("lead")}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {visibleTestimonials.map((key, index) => (
            <figure
              key={key}
              className="rounded-2xl border border-clinic-border bg-clinic-white p-6 shadow-none transition-shadow duration-200 hover:shadow-soft"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-clinic-border bg-clinic-white shadow-sm">
                  {index % 2 === 1 ? <FemaleDoctorIcon /> : <MaleDoctorIcon />}
                </div>
                <span className="rounded-full border border-clinic-border bg-clinic-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-clinic-teal-700 sm:px-3 sm:text-[11px] sm:tracking-[0.08em]">
                  {t(`${key}.type`)}
                </span>
              </div>
              <blockquote className="text-sm leading-relaxed text-clinic-slate-700">
                &ldquo;{t(`${key}.quote`)}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-clinic-teal-700">
                {t(`${key}.author`)}
              </figcaption>
            </figure>
          ))}
        </div>

        {canShowMore ? (
          <div className="mt-8 lg:mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleShowMore}
              className="inline-flex items-center justify-center rounded-full border border-clinic-border bg-clinic-white px-6 py-3 text-sm font-semibold text-clinic-slate-800 shadow-sm transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
            >
              {t("showMore")}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
