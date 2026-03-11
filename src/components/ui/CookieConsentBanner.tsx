"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "algorithm_cookie_consent";

type ConsentState = "accepted" | "rejected";

type Copy = {
  title: string;
  description: string;
  accept: string;
  reject: string;
  policy: string;
};

const copyByLocale: Record<string, Copy> = {
  ro: {
    title: "Preferinte cookie",
    description:
      "Folosim cookie-uri esentiale pentru functionarea site-ului si, cu acordul tau, cookie-uri de analiza pentru imbunatatirea experientei.",
    accept: "Accepta toate",
    reject: "Respinge optionale",
    policy: "Politica Cookie",
  },
  en: {
    title: "Cookie preferences",
    description:
      "We use essential cookies for website functionality and, with your consent, analytics cookies to improve the experience.",
    accept: "Accept all",
    reject: "Reject optional",
    policy: "Cookie Policy",
  },
  de: {
    title: "Cookie-Einstellungen",
    description:
      "Wir verwenden notwendige Cookies fuer die Funktion der Website und mit Ihrer Zustimmung Analyse-Cookies zur Verbesserung der Erfahrung.",
    accept: "Alle akzeptieren",
    reject: "Optionale ablehnen",
    policy: "Cookie-Richtlinie",
  },
};

export function CookieConsentBanner() {
  const locale = useLocale();
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") return;
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      const maxAge = 60 * 60 * 24 * 180;
      document.cookie = `cookie_consent=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
      window.dispatchEvent(new Event("cookie-consent-changed"));
    } catch {
      // Ignore storage errors; still hide to avoid blocking UX.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      id="cookie-consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label={copy.title}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] right-[max(1.25rem,env(safe-area-inset-right))] z-[65] print:hidden sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:left-[max(1.5rem,env(safe-area-inset-left))] sm:right-auto sm:w-[min(calc(100vw-3rem),340px)]"
    >
      <div className="w-full rounded-xl border border-clinic-border bg-clinic-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.14)] dark:border-slate-700 dark:bg-slate-950">
        <div className="flex flex-col gap-2.5">
          <div>
            <h2 className="text-xs font-semibold text-clinic-slate-900 dark:text-slate-100">
              {copy.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-clinic-slate-700 dark:text-slate-300">
              {copy.description}{" "}
              <Link
                href="/cookie-policy"
                className="font-medium text-clinic-teal-700 underline-offset-2 hover:underline dark:text-clinic-teal-300"
              >
                {copy.policy}
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <Button
              onClick={() => handleConsent("rejected")}
              variant="secondary"
              size="xs"
              className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              {copy.reject}
            </Button>
            <Button
              onClick={() => handleConsent("accepted")}
              variant="primary"
              size="xs"
            >
              {copy.accept}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

