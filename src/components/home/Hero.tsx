"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden rounded-3xl bg-hero-gradient bg-clinic-surface p-8 shadow-soft sm:p-12">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-[0.16em] text-clinic-accent"
      >
        {t("eyebrow")}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-clinic-text sm:text-5xl"
      >
        {t("title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mt-5 max-w-2xl text-base text-clinic-muted sm:text-lg"
      >
        {t("description")}
      </motion.p>
    </section>
  );
}
