"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { galleryMedia, galleryPageMedia } from "@/lib/media-assets";

const CAROUSEL_SWIPE_OFFSET_THRESHOLD = 70;
const CAROUSEL_SWIPE_VELOCITY_THRESHOLD = 600;

type GallerySectionProps = {
  showStepLabel?: boolean;
};

export function GallerySection({ showStepLabel = true }: GallerySectionProps) {
  const t = useTranslations("Gallery");
  const g = useTranslations("GalleryPage");
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<1 | -1>(1);
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
  const changeCarousel = useCallback((direction: 1 | -1) => {
    setCarouselDirection(direction);
    setCarouselIndex((current) => {
      if (direction === 1) {
        return current === galleryMedia.length - 1 ? 0 : current + 1;
      }
      return current === 0 ? galleryMedia.length - 1 : current - 1;
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

  const currentCarouselItem = galleryMedia[carouselIndex];
  const previousCarouselIndex =
    carouselIndex === 0 ? galleryMedia.length - 1 : carouselIndex - 1;
  const nextCarouselIndex =
    carouselIndex === galleryMedia.length - 1 ? 0 : carouselIndex + 1;
  const previousCarouselItem = galleryMedia[previousCarouselIndex];
  const nextCarouselItem = galleryMedia[nextCarouselIndex];

  const activeItem =
    activeIndex !== null ? galleryPageMedia[activeIndex] : null;
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

        <div className="mt-10">
          <div className="relative mx-auto max-w-8xl">
            <div className="pointer-events-none absolute inset-y-10 left-4 hidden w-[20%] md:block lg:left-10">
              <div className="relative h-full overflow-hidden rounded-2xl border border-clinic-border/70 bg-clinic-white/70 opacity-65 shadow-sm">
                <Image
                  src={previousCarouselItem.src}
                  alt={t("itemAlt", { index: previousCarouselIndex + 1 })}
                  fill
                  sizes="20vw"
                  className="object-cover blur-[4px] scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-10 right-4 hidden w-[20%] md:block lg:right-10">
              <div className="relative h-full overflow-hidden rounded-2xl border border-clinic-border/70 bg-clinic-white/70 opacity-65 shadow-sm">
                <Image
                  src={nextCarouselItem.src}
                  alt={t("itemAlt", { index: nextCarouselIndex + 1 })}
                  fill
                  sizes="20vw"
                  className="object-cover blur-[4px] scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-4xl px-2 sm:px-12">
              <Button
                onClick={() => changeCarousel(-1)}
                variant="secondary"
                size="iconMd"
                iconVariant="chevronLeft"
                className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 sm:-left-3"
                aria-label={g("previousImage")}
              />

              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-clinic-border bg-clinic-white shadow-soft">
                <AnimatePresence
                  initial={false}
                  mode="wait"
                  custom={carouselDirection}
                >
                  <motion.div
                    key={currentCarouselItem.id}
                    custom={carouselDirection}
                    initial={{
                      x: carouselDirection === 1 ? 100 : -100,
                      opacity: 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: carouselDirection === 1 ? -100 : 100,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={(_, info) => {
                      const { offset, velocity } = info;
                      if (
                        offset.x <= -CAROUSEL_SWIPE_OFFSET_THRESHOLD ||
                        velocity.x <= -CAROUSEL_SWIPE_VELOCITY_THRESHOLD
                      ) {
                        changeCarousel(1);
                        return;
                      }
                      if (
                        offset.x >= CAROUSEL_SWIPE_OFFSET_THRESHOLD ||
                        velocity.x >= CAROUSEL_SWIPE_VELOCITY_THRESHOLD
                      ) {
                        changeCarousel(-1);
                      }
                    }}
                    onClick={() => {
                      const fullIndex = galleryPageMedia.findIndex(
                        (fullItem) => fullItem.id === currentCarouselItem.id,
                      );
                      setActiveIndex(fullIndex >= 0 ? fullIndex : 0);
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      const fullIndex = galleryPageMedia.findIndex(
                        (fullItem) => fullItem.id === currentCarouselItem.id,
                      );
                      setActiveIndex(fullIndex >= 0 ? fullIndex : 0);
                    }}
                    className="group absolute inset-0 block touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
                    role="button"
                    tabIndex={0}
                    aria-label={`${g("openImage")}: ${t("itemAlt", { index: carouselIndex + 1 })}`}
                  >
                    <Image
                      src={currentCarouselItem.src}
                      alt={t("itemAlt", { index: carouselIndex + 1 })}
                      fill
                      sizes="(max-width: 768px) 94vw, (max-width: 1200px) 78vw, 900px"
                      className={[
                        "object-cover transition duration-500 group-hover:scale-[1.02]",
                        loaded[currentCarouselItem.id]
                          ? "blur-0 scale-100"
                          : "scale-[1.02] blur-sm",
                      ].join(" ")}
                      onLoad={() =>
                        setLoaded((prev) => ({
                          ...prev,
                          [currentCarouselItem.id]: true,
                        }))
                      }
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-clinic-slate-900/55 via-clinic-slate-900/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-clinic-white px-3 py-1 text-[11px] font-semibold text-clinic-slate-700 sm:bottom-4 sm:left-4 sm:text-xs">
                      {currentCarouselItem.caption}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {!loaded[currentCarouselItem.id] ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-clinic-blue-100/70 via-clinic-blue-50/70 to-clinic-teal-100/60"
                    />
                    <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="h-9 w-9 animate-spin rounded-full border-2 border-clinic-teal-200/60 border-t-clinic-teal-700"
                      />
                    </span>
                  </>
                ) : null}

                <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-clinic-slate-900/70 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-clinic-white backdrop-blur-sm sm:right-4 sm:top-4 sm:text-xs">
                  {carouselIndex + 1}/{galleryMedia.length}
                </span>
              </div>

              <Button
                onClick={() => changeCarousel(1)}
                variant="secondary"
                size="iconMd"
                iconVariant="chevronRight"
                className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 sm:-right-3"
                aria-label={g("nextImage")}
              />
            </div>
          </div>

        </div>

        <div className="mt-8 lg:mt-12 flex justify-center">
          <Button
            href="/gallery"
            variant="secondary"
            size="lg"
            iconVariant="arrowRight"
          >
            {t("viewMore")}
          </Button>
        </div>

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
                  aria-label={g("closeLightbox")}
                  className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 shadow-lg sm:right-4 sm:top-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                />
                <Button
                  onClick={showPrevious}
                  variant="secondary"
                  size="iconLg"
                  iconVariant="chevronLeft"
                  aria-label={g("previousImage")}
                  className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-1/2 z-20 -translate-y-1/2 shadow-lg sm:left-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                />

                <figure className="relative h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[1400px] sm:h-[calc(100vh-2rem)] sm:w-[calc(100vw-2rem)]">
                  <Image
                    src={activeItem.src}
                    alt={t("itemAlt", { index: activeDisplayIndex })}
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
                  {activeDisplayIndex}/{galleryPageMedia.length}
                </div>

                <Button
                  onClick={showNext}
                  variant="secondary"
                  size="iconLg"
                  iconVariant="chevronRight"
                  aria-label={g("nextImage")}
                  className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 z-20 -translate-y-1/2 shadow-lg sm:right-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                />
              </div>,
              document.body,
            )
          : null}
      </div>
    </section>
  );
}
