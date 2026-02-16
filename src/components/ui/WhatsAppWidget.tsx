"use client";

import { useLocale } from "next-intl";

const WHATSAPP_PHONE = "40753081961";

const prefilledMessages: Record<string, string> = {
  ro: "Buna, as dori sa discutam!",
  en: "Hi, I'd like to chat!",
  de: "Hallo, ich moechte gerne chatten!",
};

const labels: Record<string, string> = {
  ro: "Chat pe WhatsApp",
  en: "Chat on WhatsApp",
  de: "WhatsApp Chat",
};

export function WhatsAppWidget() {
  const locale = useLocale();
  const message = prefilledMessages[locale] ?? prefilledMessages.en;
  const ariaLabel = labels[locale] ?? labels.en;
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#1FA855] text-white shadow-[0_10px_26px_rgba(15,23,42,0.28)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-clinic-white print:hidden sm:h-15 sm:w-15"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.11 17.24c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.14-1.3-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.24.27-.92.9-.92 2.19 0 1.29.95 2.53 1.08 2.71.13.18 1.86 2.84 4.51 3.98.63.27 1.12.43 1.5.55.63.2 1.21.17 1.66.1.51-.08 1.58-.64 1.8-1.26.22-.62.22-1.15.16-1.26-.07-.11-.25-.18-.52-.31z"
        />
        <path
          fill="currentColor"
          d="M16.03 3.2c-6.98 0-12.65 5.66-12.65 12.65 0 2.23.59 4.4 1.7 6.3L3.2 28.8l6.82-1.84a12.58 12.58 0 0 0 6.01 1.53h.01c6.98 0 12.65-5.66 12.65-12.65 0-3.38-1.32-6.56-3.71-8.95-2.39-2.39-5.57-3.7-8.95-3.69zm0 22.99h-.01c-1.89 0-3.74-.51-5.35-1.48l-.38-.22-4.05 1.09 1.08-3.95-.25-.41a10.3 10.3 0 0 1-1.58-5.46c0-5.7 4.64-10.34 10.35-10.34 2.76 0 5.36 1.07 7.31 3.03a10.27 10.27 0 0 1 3.03 7.31c0 5.7-4.64 10.34-10.15 10.43z"
        />
      </svg>
    </a>
  );
}
