import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getOpenGraphLocale, siteUrl, targetKeywords } from "./next-seo.config";

const routeMap = {
  home: "",
  about: "about",
  services: "services",
  gallery: "gallery",
  cases: "cases",
  contact: "contact"
} as const;

export type SeoPageKey = keyof typeof routeMap;

export async function getPageMetadata(locale: string, page: SeoPageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "SeoPages" });
  const path = routeMap[page];
  const localizedPath = path ? `/${locale}/${path}` : `/${locale}`;
  const canonical = `${siteUrl}${localizedPath}`;

  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    keywords: targetKeywords,
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: canonical,
      title: t(`${page}.title`),
      description: t(`${page}.description`),
      images: [
        {
          url: `${siteUrl}/images/og/clinic-og.svg`,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt")
        }
      ]
    }
  };
}
