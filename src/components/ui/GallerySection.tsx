"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { galleryMedia } from "@/lib/media-assets";

export function GallerySection() {
  const t = useTranslations("Gallery");
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  return (
    <section id="gallery" className="relative isolate">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-sm">{t("title")}</h2>
          <p className="section-lead mt-4">{t("lead")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryMedia.map((item, index) => (
            <article
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              aria-label={t("itemAlt", { index: index + 1 })}
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
              <span className="absolute bottom-2 left-2 rounded-full bg-clinic-white/95 px-2.5 py-1 text-[10px] font-medium text-clinic-slate-700 sm:px-3 sm:text-xs">
                {item.caption}
              </span>
            </article>
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
      </div>
    </section>
  );
}
