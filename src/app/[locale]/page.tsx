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
const ServicesSection = dynamicImport(() =>
  import("@/components/ui/ServicesSection").then((m) => m.ServicesSection),
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
            "linear-gradient(to bottom, rgb(var(--clinic-white)) 0%, rgb(var(--clinic-blue-100)) 18%, rgb(var(--clinic-white)) 36%, rgb(var(--clinic-blue-100)) 54%, rgb(var(--clinic-white)) 72%, rgb(var(--clinic-blue-100)) 90%, rgb(var(--clinic-white)) 100%)",
        }}
      />
      <ClinicJsonLd locale={locale} />
      <HeroSection />
      <ServicesSection showQualityBlock={false} showAllServicesCta />
      <MotionReveal delay={0.06}>
        <TeamSection />
      </MotionReveal>
      <MotionReveal delay={0.07}>
        <StatsSection />
      </MotionReveal>
      <MotionReveal delay={0.08}>
        <TestimonialsSection />
      </MotionReveal>
      <MotionReveal delay={0.1}>
        <GallerySection />
      </MotionReveal>
      <MotionReveal delay={0.12}>
        <ContactSection />
      </MotionReveal>
      <MotionReveal delay={0.14}>
        <HomeClosingStrip />
      </MotionReveal>
    </div>
  );
}
