import type { DefaultSeoProps } from "next-seo";

export const siteUrl = "https://algorithm-clinic.ro";

export const targetKeywords = [
  "tehnica dentara Cluj",
  "laborator tehnica dentara Cluj-Napoca",
  "dental laboratory Romania",
  "dental prosthetics lab"
];

export const defaultSeoConfig: DefaultSeoProps = {
  titleTemplate: "%s | Algorithm",
  defaultTitle: "Algorithm Dental Technical Laboratory",
  description:
    "Dental technical laboratory for prosthetics in Cluj-Napoca, Romania.",
  canonical: siteUrl,
  openGraph: {
    type: "website",
    siteName: "Algorithm",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/og/clinic-og.svg`,
        width: 1200,
        height: 630,
        alt: "Algorithm dental technical laboratory in Cluj-Napoca"
      }
    ]
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: targetKeywords.join(", ")
    }
  ]
};

export function getOpenGraphLocale(locale: string): string {
  if (locale === "ro") return "ro_RO";
  if (locale === "de") return "de_DE";
  return "en_US";
}
