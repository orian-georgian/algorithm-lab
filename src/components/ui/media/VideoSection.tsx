"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaVideo } from "@/lib/media-assets";

type Props = {
  items: MediaVideo[];
  title: string;
  lead: string;
  className?: string;
};

export function VideoSection({ items, title, lead, className }: Props) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const primedRef = useRef<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const markLoaded = (id: string) =>
    setLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  const primeFirstFrame = async (id: string, video: HTMLVideoElement) => {
    if (primedRef.current[id]) return;
    primedRef.current[id] = true;
    try {
      await video.play();
      video.pause();
      video.currentTime = 0;
    } catch {
      // Ignore autoplay restrictions and keep normal hover-play behavior.
    }
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.type !== "mp4") return;
      const video = videoRefs.current[item.id];
      if (!video) return;
      if (video.readyState >= 1) {
        markLoaded(item.id);
      }
    });
  }, [items]);

  return (
    <section className={["section-space", className ?? ""].join(" ")}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-display-sm">{title}</h2>
        <p className="section-lead mt-4">{lead}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="relative overflow-hidden">
            <span className="absolute left-2 top-2 z-10 rounded-full bg-clinic-white/95 px-2.5 py-1 text-[10px] font-medium text-clinic-slate-700 sm:px-3 sm:text-xs">
              {item.title}
            </span>
            <div className="overflow-hidden">
              {item.type === "youtube" && item.youtubeId ? (
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube.com/embed/${item.youtubeId}`}
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : null}
              {item.type === "mp4" && item.src ? (
                <video
                  ref={(node) => {
                    videoRefs.current[item.id] = node;
                  }}
                  className={[
                    "aspect-video h-full w-full object-cover transition duration-500",
                    loaded[item.id] ? "blur-0 scale-100" : "scale-[1.02] blur-sm"
                  ].join(" ")}
                  controls={activeVideoId === item.id}
                  preload="auto"
                  muted
                  playsInline
                  onLoadedMetadata={() => markLoaded(item.id)}
                  onLoadedData={() => markLoaded(item.id)}
                  onCanPlay={(event) => {
                    markLoaded(item.id);
                    void primeFirstFrame(item.id, event.currentTarget);
                  }}
                  onPlaying={() => markLoaded(item.id)}
                  onError={() => markLoaded(item.id)}
                  onMouseEnter={(event) => {
                    setActiveVideoId(item.id);
                    void event.currentTarget.play().catch(() => undefined);
                  }}
                  onMouseLeave={(event) => {
                    setActiveVideoId((current) => (current === item.id ? null : current));
                    event.currentTarget.pause();
                    event.currentTarget.currentTime = 0;
                  }}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : null}
              {item.type === "mp4" && !loaded[item.id] ? (
                <span className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-clinic-blue-100/55 via-clinic-blue-50/50 to-clinic-teal-100/45" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center">
                    <span className="h-9 w-9 animate-spin rounded-full border-2 border-clinic-teal-200/60 border-t-clinic-teal-700" />
                  </span>
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
