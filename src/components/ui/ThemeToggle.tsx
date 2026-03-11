"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeToggle() {
  const t = useTranslations("Navigation");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const nextTheme = saved ?? getSystemTheme();
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const isDark = theme === "dark";

  function toggleTheme() {
    const nextTheme: Theme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }

  return (
    <Button
      onClick={toggleTheme}
      aria-label={isDark ? t("switchThemeLight") : t("switchThemeDark")}
      variant="secondary"
      size="iconSm"
      icon={
        isDark ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M21 12.75A8.75 8.75 0 1 1 11.25 3a7 7 0 1 0 9.75 9.75Z"
            />
            <path d="M17.5 4.5h3M19 3v3" />
          </svg>
        )
      }
      className={[
        "rounded-xl text-clinic-slate-700",
        "border-clinic-border bg-clinic-white text-clinic-teal-700 shadow-soft hover:bg-clinic-blue-50 dark:border-slate-600 dark:bg-slate-900 dark:text-clinic-teal-300 dark:hover:bg-slate-800",
      ].join(" ")}
    />
  );
}

