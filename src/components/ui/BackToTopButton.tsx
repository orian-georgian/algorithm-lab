"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

const labels: Record<string, string> = {
  ro: "Înapoi sus",
  en: "Back to top",
  de: "Nach oben",
};

export function BackToTopButton() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 240);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      aria-label={labels[locale] ?? labels.en}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-clinic-border bg-clinic-white text-clinic-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.2)] transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-clinic-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 5.59 6.7 10.9l1.4 1.4 2.9-2.9V19h2V9.4l2.9 2.9 1.4-1.4L12 5.59Z"
        />
      </svg>
    </button>
  );
}
