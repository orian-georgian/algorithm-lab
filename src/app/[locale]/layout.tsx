import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import {
  getOpenGraphLocale,
  siteUrl,
  targetKeywords,
} from "@/seo/next-seo.config";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const localizedUrl = `${siteUrl}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: targetKeywords,
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: getOpenGraphLocale(locale),
      type: "website",
      url: localizedUrl,
      images: [
        {
          url: `${siteUrl}/images/og/clinic-og.svg`,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        ro: `${siteUrl}/ro`,
        en: `${siteUrl}/en`,
        de: `${siteUrl}/de`,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${siteUrl}/images/og/clinic-og.svg`],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main id="main-content" className="container-page">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </NextIntlClientProvider>
  );
}
