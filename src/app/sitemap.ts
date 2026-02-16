import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/seo/next-seo.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/services", "/gallery", "/cases", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of pages) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: locale === "ro" && page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            ro: `${siteUrl}/ro${page}`,
            en: `${siteUrl}/en${page}`,
            de: `${siteUrl}/de${page}`
          }
        }
      });
    }
  }

  return entries;
}
