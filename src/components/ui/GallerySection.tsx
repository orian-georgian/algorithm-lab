"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { galleryMedia, galleryPageMedia } from "@/lib/media-assets";

type GallerySectionProps = {
  showStepLabel?: boolean;
};

export function GallerySection({ showStepLabel = true }: GallerySectionProps) {
  const t = useTranslations("Gallery");
  const g = useTranslations("GalleryPage");
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? galleryPageMedia.length - 1 : current - 1;
    });
  }, []);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === galleryPageMedia.length - 1 ? 0 : current + 1;
    });
  }, []);

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

    // Preload full gallery once lightbox opens for smoother navigation.
    galleryPageMedia.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
    });
  }, [activeIndex]);

  const activeItem = activeIndex !== null ? galleryPageMedia[activeIndex] : null;

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
    <section id="gallery" className="relative isolate">
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

        <div className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3">
          {galleryMedia.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const fullIndex = galleryPageMedia.findIndex(
                  (fullItem) => fullItem.id === item.id,
                );
                setActiveIndex(fullIndex >= 0 ? fullIndex : 0);
              }}
              className="group relative aspect-[4/3] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
              aria-label={`${g("openImage")}: ${t("itemAlt", { index: index + 1 })}`}
            >
              <Image
                src={item.src}
                alt={t("itemAlt", { index: index + 1 })}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className={[
                  "object-cover transition duration-500 group-hover:scale-[1.03]",
                  loaded[item.id] ? "blur-0 scale-100" : "scale-[1.02] blur-sm",
                ].join(" ")}
                onLoad={() =>
                  setLoaded((prev) => ({ ...prev, [item.id]: true }))
                }
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
            </button>
          ))}
        </div>

        <div className="mt-8 lg:mt-12 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full border border-clinic-border bg-clinic-white px-6 py-3 text-sm font-semibold text-clinic-slate-800 shadow-sm transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("viewMore")}
          </Link>
        </div>

        {mounted && activeItem
          ? createPortal(
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-clinic-white p-2 sm:p-4 dark:bg-slate-950"
                role="dialog"
                aria-modal="true"
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label={g("closeLightbox")}
                  className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-clinic-border bg-clinic-white text-clinic-slate-800 shadow-lg transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:right-4 sm:top-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M6 6 18 18M18 6 6 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label={g("previousImage")}
                  className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-clinic-border bg-clinic-white text-clinic-slate-800 shadow-lg transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:left-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M15 6 9 12l6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <figure className="relative h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[1400px] sm:h-[calc(100vh-2rem)] sm:w-[calc(100vw-2rem)]">
                  <Image
                    src={activeItem.src}
                    alt={t("itemAlt", { index: activeIndex + 1 })}
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
                  {activeIndex + 1}/{galleryPageMedia.length}
                </div>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label={g("nextImage")}
                  className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-clinic-border bg-clinic-white text-clinic-slate-800 shadow-lg transition hover:bg-clinic-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 sm:right-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="m9 6 6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>,
              document.body,
            )
          : null}

      </div>
    </section>
  );
}


