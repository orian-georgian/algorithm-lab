"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function LocalizedNotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-clinic-border bg-clinic-white p-8 text-center">
      <h1 className="text-3xl font-semibold text-clinic-slate-900">{t("title")}</h1>
      <p className="mt-3 text-sm text-clinic-slate-700">{t("description")}</p>
      <Button
        href="/"
        variant="primary"
        size="md"
        iconVariant="arrowRight"
        className="mt-6"
      >
        {t("cta")}
      </Button>
    </section>
  );
}

