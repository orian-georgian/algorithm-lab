import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { defaultSeoConfig, siteUrl, targetKeywords } from "@/seo/next-seo.config";
import "./globals.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  applicationName: "Algorithm Laboratory",
  title: {
    default: defaultSeoConfig.defaultTitle ?? "Algorithm Dental Technical Laboratory",
    template: defaultSeoConfig.titleTemplate ?? "%s | Algorithm"
  },
  description: defaultSeoConfig.description,
  keywords: targetKeywords,
  openGraph: {
    type: "website",
    siteName: defaultSeoConfig.openGraph?.siteName,
    images: [
      {
        url: `${siteUrl}/images/og/clinic-og.svg`,
        width: 1200,
        height: 630,
        alt: "Algorithm dental technical laboratory in Cluj-Napoca"
      }
    ]
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0e5a54" },
    { media: "(prefers-color-scheme: dark)", color: "#0e5a54" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const themeInitScript = `
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = saved || (systemDark ? 'dark' : 'light');
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } catch (e) {}
    })();
  `;

  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={sora.variable}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
