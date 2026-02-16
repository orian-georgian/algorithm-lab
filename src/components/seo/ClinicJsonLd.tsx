import { siteUrl } from "@/seo/next-seo.config";

type Props = {
  locale: string;
};

export function ClinicJsonLd({ locale }: Props) {
  const base = `${siteUrl}/${locale}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}#localbusiness`,
    name: "Algorithm",
    description: "Dental technical laboratory in Cluj-Napoca, Romania.",
    url: base,
    telephone: "+40 264 000 000",
    priceRange: "$$",
    image: `${siteUrl}/images/og/clinic-og.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Someșului 18-22",
      addressLocality: "Cluj-Napoca",
      addressRegion: "Cluj",
      postalCode: "400049",
      addressCountry: "RO"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.7780047,
      longitude: 23.594509
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    sameAs: ["https://www.facebook.com", "https://www.instagram.com"]
  };

  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${base}#medicalbusiness`,
    name: "Algorithm",
    url: base,
    image: `${siteUrl}/images/og/clinic-og.svg`,
    description:
      "Dental technical laboratory for prosthetics in Cluj-Napoca, Romania.",
    telephone: "+40 264 000 000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Someșului 18-22",
      addressLocality: "Cluj-Napoca",
      addressRegion: "Cluj",
      postalCode: "400049",
      addressCountry: "RO"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.7780047,
      longitude: 23.594509
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
    </>
  );
}
