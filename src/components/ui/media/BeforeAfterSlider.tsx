"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  width: number;
  height: number;
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width,
  height,
  beforeLabel,
  afterLabel
}: Props) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const updateFromClientX = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const next = clamp((relativeX / rect.width) * 100, 0, 100);
    setPosition(next);
  };

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden bg-clinic-white">
        <div
          ref={frameRef}
          className="relative h-auto w-full touch-none select-none"
          style={{ aspectRatio: `${width} / ${height}` }}
          onPointerDown={(event) => {
            updateFromClientX(event.clientX);
            setIsDragging(true);
          }}
          onPointerMove={(event) => {
            if (!isDragging) return;
            updateFromClientX(event.clientX);
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          onDragStart={(event) => event.preventDefault()}
          aria-label={`${beforeLabel} / ${afterLabel}`}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="pointer-events-none select-none object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            draggable={false}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              className="pointer-events-none select-none object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0"
            style={{ left: `${position}%` }}
          >
            <div className="h-full w-0.5 -translate-x-1/2 bg-white/95 shadow-[0_0_16px_rgba(0,0,0,0.25)]" />
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-clinic-teal-700 dark:bg-clinic-teal-300 shadow-soft">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-white dark:text-slate-950"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 6 4.5 10 8 14M12 6l3.5 4-3.5 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <span className="absolute left-3 top-3 rounded-full bg-clinic-white/95 px-3 py-1 text-[11px] font-semibold text-clinic-slate-700 shadow-sm backdrop-blur">
            {beforeLabel}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-clinic-white/95 px-3 py-1 text-[11px] font-semibold text-clinic-slate-700 shadow-sm backdrop-blur">
            {afterLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

