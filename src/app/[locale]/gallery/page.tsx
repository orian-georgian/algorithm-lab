import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getPageMetadata } from "@/seo/metadata";
import { galleryPageMedia, videoMedia } from "@/lib/media-assets";

const ImageGallery = dynamicImport(
  () =>
    import("@/components/ui/media/ImageGallery").then((m) => m.ImageGallery),
  {
    loading: () => (
      <section className="section-space">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-10 w-72 rounded-xl bg-clinic-blue-100/70" />
          <div className="mx-auto mt-4 h-5 w-96 max-w-full rounded-xl bg-clinic-blue-100/60" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] rounded-2xl bg-clinic-blue-100/70 animate-pulse"
            />
          ))}
        </div>
      </section>
    ),
  },
);
const VideoSection = dynamicImport(
  () =>
    import("@/components/ui/media/VideoSection").then((m) => m.VideoSection),
  {
    loading: () => (
      <section className="section-space">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-10 w-56 rounded-xl bg-clinic-blue-100/70" />
          <div className="mx-auto mt-4 h-5 w-80 max-w-full rounded-xl bg-clinic-blue-100/60" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="aspect-video rounded-2xl bg-clinic-blue-100/70 animate-pulse" />
          <div className="aspect-video rounded-2xl bg-clinic-blue-100/70 animate-pulse" />
        </div>
      </section>
    ),
  },
);

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(params.locale, "gallery");
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "GalleryPage" });

  return (
    <section className="relative isolate -mx-4 sm:-mx-6 lg:-mx-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-clinic-white via-clinic-blue-100/70 to-clinic-white"
      />
      <div className="space-y-8 px-4 pt-4 pb-10 sm:space-y-12 sm:px-6 sm:py-10 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-blue-100 blur-3xl"
          />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.5fr_0.5fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clinic-teal-700">
                {t("eyebrow")}
              </p>
              <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-clinic-slate-900 sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-clinic-slate-700 sm:text-lg">
                {t("description")}
              </p>
            </div>
            <div className="flex justify-end">
              <Image
                src="/media/images/camera-guy.png"
                alt=""
                width={220}
                height={220}
                className="h-auto w-auto max-h-[250px] object-contain"
              />
            </div>
          </div>
        </section>
        <ImageGallery
          className="pt-6 sm:pt-8 lg:pt-10"
          items={galleryPageMedia}
          title={t("gridTitle")}
          lead={t("gridLead")}
          openLabel={t("openImage")}
          closeLabel={t("closeLightbox")}
          previousLabel={t("previousImage")}
          nextLabel={t("nextImage")}
          showMoreLabel={t("showMore")}
          initialVisibleCount={6}
          loadStep={6}
        />
        <VideoSection
          className="pt-6 sm:pt-8 lg:pt-10"
          items={videoMedia}
          title={t("videoTitle")}
          lead={t("videoLead")}
        />
        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-soft transition hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600"
          >
            {t("videoCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
