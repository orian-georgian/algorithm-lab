"use client";

import { useState } from "react";
import Image from "next/image";

type TeamImageWithLoaderProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  withGalleryLoadingEffect?: boolean;
};

export function TeamImageWithLoader({
  src,
  alt,
  sizes,
  className = "",
  withGalleryLoadingEffect = false,
}: TeamImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <>
          {withGalleryLoadingEffect ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-clinic-blue-100/70 via-clinic-blue-50/70 to-clinic-teal-100/60"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div
              aria-hidden="true"
              className="h-9 w-9 animate-spin rounded-full border-2 border-clinic-teal-200/60 border-t-clinic-teal-700"
            />
          </div>
        </>
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={[
          className,
          "select-none transition duration-500",
          withGalleryLoadingEffect
            ? isLoading
              ? "scale-[1.02] blur-sm"
              : "scale-100 blur-0"
            : isLoading
              ? "opacity-0"
              : "opacity-100",
        ].join(" ")}
        draggable={false}
        onLoad={() => setIsLoading(false)}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </>
  );
}
