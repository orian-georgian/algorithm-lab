"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { MediaImage } from "@/lib/media-assets";
import { Button } from "@/components/ui/Button";

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
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount ?? items.length);
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const visibleItems = items.slice(0, visibleCount);
  const canShowMore = Boolean(showMoreLabel) && visibleCount < items.length;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? items.length - 1 : current - 1;
    });
  }, [items.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === items.length - 1 ? 0 : current + 1;
    });
  }, [items.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (activeIndex === null) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      setLightboxLoaded(false);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    // Preload the full gallery once lightbox opens so navigation is immediate.
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
    });
  }, [activeIndex, items]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeDisplayIndex = activeIndex === null ? 1 : activeIndex + 1;

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = endX - touchStartX;
    const swipeThreshold = 40;

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX < 0) showNext();
      else showPrevious();
    }

    setTouchStartX(null);
  };

  return (
    <section className={["section-space", className ?? ""].join(" ")}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-display-sm">{title}</h2>
        <p className="section-lead mt-4">{lead}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3">
        {visibleItems.map((item, index) => (
          <Button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            variant="neutral"
            className="group relative block aspect-[4/3] overflow-hidden rounded-none border-0 p-0 focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
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
            <span className="absolute bottom-2 left-2 rounded-full bg-clinic-white px-2.5 py-1 text-[10px] font-medium text-clinic-slate-700 sm:px-3 sm:text-xs">
              {item.caption}
            </span>
          </Button>
        ))}
      </div>
      {canShowMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + loadStep, items.length))
            }
            variant="secondary"
            size="lg"
            iconVariant="arrowRight"
          >
            {showMoreLabel}
          </Button>
        </div>
      ) : null}

      {mounted && activeItem
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-clinic-white p-2 sm:p-4 dark:bg-slate-950"
              role="dialog"
              aria-modal="true"
            >
              <Button
                onClick={closeLightbox}
                variant="secondary"
                size="iconLg"
                iconVariant="close"
                aria-label={closeLabel}
                className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 shadow-lg sm:right-4 sm:top-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              />
              <Button
                onClick={showPrevious}
                variant="secondary"
                size="iconLg"
                iconVariant="chevronLeft"
                aria-label={previousLabel}
                className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-1/2 z-20 -translate-y-1/2 shadow-lg sm:left-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              />

              <figure className="relative h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[1400px] sm:h-[calc(100vh-2rem)] sm:w-[calc(100vw-2rem)]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="100vw"
                  className={[
                    "object-contain transition duration-300",
                    lightboxLoaded ? "blur-0" : "blur-sm",
                  ].join(" ")}
                  priority
                  onLoad={() => setLightboxLoaded(true)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                />
                {!lightboxLoaded ? (
                  <>
                    <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="h-10 w-10 animate-spin rounded-full border-2 border-clinic-teal-200/60 border-t-clinic-teal-700"
                      />
                    </span>
                  </>
                ) : null}
              </figure>
              <div className="pointer-events-none absolute bottom-[max(0.85rem,env(safe-area-inset-bottom))] right-[max(0.85rem,env(safe-area-inset-right))] rounded-md bg-clinic-slate-900/70 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white backdrop-blur-sm dark:bg-slate-100/80 dark:text-slate-900">
                {activeDisplayIndex}/{items.length}
              </div>

              <Button
                onClick={showNext}
                variant="secondary"
                size="iconLg"
                iconVariant="chevronRight"
                aria-label={nextLabel}
                className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 z-20 -translate-y-1/2 shadow-lg sm:right-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}



