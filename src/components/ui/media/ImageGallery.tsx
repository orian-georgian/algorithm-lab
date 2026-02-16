"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { MediaImage } from "@/lib/media-assets";

type Props = {
  items: MediaImage[];
  title: string;
  lead: string;
  openLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  showMoreLabel?: string;
  initialVisibleCount?: number;
  loadStep?: number;
  className?: string;
};

export function ImageGallery({
  items,
  title,
  lead,
  openLabel,
  closeLabel,
  previousLabel,
  nextLabel,
  showMoreLabel,
  initialVisibleCount,
  loadStep = 6,
  className
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount ?? items.length);
  const visibleItems = items.slice(0, visibleCount);
  const canShowMore = Boolean(showMoreLabel) && visibleCount < items.length;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? visibleItems.length - 1 : current - 1;
    });
  }, [visibleItems.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === visibleItems.length - 1 ? 0 : current + 1;
    });
  }, [visibleItems.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const activeItem = activeIndex !== null ? visibleItems[activeIndex] : null;

  return (
    <section className={["section-space", className ?? ""].join(" ")}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-display-sm">{title}</h2>
        <p className="section-lead mt-4">{lead}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {visibleItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
            aria-label={`${openLabel}: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={[
                "object-cover transition duration-500 group-hover:scale-[1.03]",
                loaded[item.id] ? "blur-0 scale-100" : "scale-[1.02] blur-sm"
              ].join(" ")}
              onLoad={() => setLoaded((prev) => ({ ...prev, [item.id]: true }))}
              loading="lazy"
            />
            {!loaded[item.id] ? (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse bg-gradient-to-br from-clinic-blue-100/70 via-clinic-blue-50/70 to-clinic-teal-100/60"
                />
                <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="h-9 w-9 animate-spin rounded-full border-2 border-clinic-teal-200/60 border-t-clinic-teal-700"
                  />
                </span>
              </>
            ) : null}
            <span className="absolute bottom-2 left-2 rounded-full bg-clinic-white/95 px-2.5 py-1 text-[10px] font-medium text-clinic-slate-700 sm:px-3 sm:text-xs">
              {item.caption}
            </span>
          </button>
        ))}
      </div>
      {canShowMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + loadStep, items.length))
            }
            className="inline-flex items-center justify-center rounded-full border border-clinic-border bg-clinic-white px-6 py-3 text-sm font-semibold text-clinic-slate-800 shadow-sm transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {showMoreLabel}
          </button>
        </div>
      ) : null}

      {activeItem ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-clinic-slate-900/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-clinic-white px-4 py-2 text-sm font-semibold text-clinic-slate-800"
          >
            {closeLabel}
          </button>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-3 rounded-full bg-clinic-white px-3 py-2 text-sm font-semibold text-clinic-slate-800"
          >
            {previousLabel}
          </button>

          <figure className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-2xl">
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </figure>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 rounded-full bg-clinic-white px-3 py-2 text-sm font-semibold text-clinic-slate-800"
          >
            {nextLabel}
          </button>
        </div>
      ) : null}
    </section>
  );
}
