"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function LocalizedNotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-clinic-border bg-clinic-white p-8 text-center">
      <h1 className="text-3xl font-semibold text-clinic-slate-900">{t("title")}</h1>
      <p className="mt-3 text-sm text-clinic-slate-700">{t("description")}</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950"
      >
        {t("cta")}
      </Link>
    </section>
  );
}

