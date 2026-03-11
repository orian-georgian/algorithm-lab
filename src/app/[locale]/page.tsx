import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { ClinicJsonLd } from "@/components/seo/ClinicJsonLd";
import { routing } from "@/i18n/routing";
import { getPageMetadata } from "@/seo/metadata";
import { MotionReveal } from "@/components/system/MotionReveal";

const HeroSection = dynamicImport(() =>
  import("@/components/ui/HeroSection").then((m) => m.HeroSection),
);
const HomeProofSection = dynamicImport(() =>
  import("@/components/ui/HomeProofSection").then((m) => m.HomeProofSection),
);
const ServicesSection = dynamicImport(() =>
  import("@/components/ui/ServicesSection").then((m) => m.ServicesSection),
);
const SectionSeparator = dynamicImport(() =>
  import("@/components/ui/SectionSeparator").then((m) => m.SectionSeparator),
);
const TeamSection = dynamicImport(() =>
  import("@/components/ui/TeamSection").then((m) => m.TeamSection),
);
const StatsSection = dynamicImport(() =>
  import("@/components/ui/StatsSection").then((m) => m.StatsSection),
);
const TestimonialsSection = dynamicImport(() =>
  import("@/components/ui/TestimonialsSection").then(
    (m) => m.TestimonialsSection,
  ),
);
const GallerySection = dynamicImport(() =>
  import("@/components/ui/GallerySection").then((m) => m.GallerySection),
);
const ContactSection = dynamicImport(() =>
  import("@/components/ui/ContactSection").then((m) => m.ContactSection),
);
const HomeClosingStrip = dynamicImport(() =>
  import("@/components/ui/HomeClosingStrip").then((m) => m.HomeClosingStrip),
);

const separatorIcons = {
  proof: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  services: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M14 7h5v5" />
      <path d="M10 17H5v-5" />
      <path d="M20 4l-8 8-4-4L4 12" />
    </svg>
  ),
  team: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0z" />
      <path d="M4 20a8 8 0 0116 0" />
    </svg>
  ),
  stats: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 20h16" />
      <path d="M7 16v-4" />
      <path d="M12 16v-7" />
      <path d="M17 16v-10" />
    </svg>
  ),
  testimonials: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 7h7a4 4 0 014 4v1a4 4 0 01-4 4H9l-4 4V11a4 4 0 014-4z" />
      <path d="M11 11h2" />
    </svg>
  ),
  gallery: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 6h16v12H4z" />
      <path d="M8 10h.01" />
      <path d="M4 16l4-4 4 4 4-5 4 5" />
    </svg>
  ),
  contact: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  closing: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-clinic-teal-700"
      fill="currentColor"
    >
      <path d="M12 2.5l1.8 4.7 4.7 1.8-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.8L12 2.5z" />
    </svg>
  ),
};

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(params.locale, "home");
}

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(var(--clinic-white)) 0%, rgb(var(--clinic-white)) 5%, rgb(var(--clinic-blue-100)) 18%, rgb(var(--clinic-white)) 36%, rgb(var(--clinic-blue-100)) 54%, rgb(var(--clinic-white)) 72%, rgb(var(--clinic-blue-100)) 90%, rgb(var(--clinic-white)) 100%)",
        }}
      />
      <ClinicJsonLd locale={locale} />
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        <HeroSection />
        <SectionSeparator
          className="py-1.5 sm:py-2"
          icon={separatorIcons.proof}
        />
        <HomeProofSection />
        <SectionSeparator
          className="py-1.5 sm:py-2"
          icon={separatorIcons.services}
        />
        <MotionReveal delay={0.04}>
          <ServicesSection showQualityBlock={false} showAllServicesCta />
        </MotionReveal>
        <SectionSeparator className="py-1.5 sm:py-2" icon={separatorIcons.team} />
        <MotionReveal delay={0.06}>
          <TeamSection />
        </MotionReveal>
        <SectionSeparator className="py-1.5 sm:py-2" icon={separatorIcons.stats} />
        <MotionReveal delay={0.07}>
          <StatsSection />
        </MotionReveal>
        <SectionSeparator
          className="py-1.5 sm:py-2"
          icon={separatorIcons.testimonials}
        />
        <MotionReveal delay={0.08}>
          <TestimonialsSection />
        </MotionReveal>
        <SectionSeparator
          className="py-1.5 sm:py-2"
          icon={separatorIcons.gallery}
        />
        <MotionReveal delay={0.1}>
          <GallerySection />
        </MotionReveal>
        <SectionSeparator
          className="py-1.5 sm:py-2"
          icon={separatorIcons.contact}
        />
        <MotionReveal delay={0.12}>
          <ContactSection />
        </MotionReveal>
        <SectionSeparator
          className="py-1.5 sm:py-2"
          icon={separatorIcons.closing}
        />
        <MotionReveal delay={0.14}>
          <HomeClosingStrip />
        </MotionReveal>
      </div>
    </div>
  );
}
