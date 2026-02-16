"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ServiceGrid() {
  const t = useTranslations("Home");

  const services = [
    { title: t("service1Title"), description: t("service1Description") },
    { title: t("service2Title"), description: t("service2Description") },
    { title: t("service3Title"), description: t("service3Description") }
  ];

  return (
    <section id="services" className="mt-10">
      <h2 className="text-2xl font-semibold text-clinic-text">{t("servicesHeading")}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-2xl border border-clinic-primary/10 bg-clinic-surface p-5 shadow-soft"
          >
            <h3 className="text-lg font-semibold text-clinic-primary">{service.title}</h3>
            <p className="mt-2 text-sm text-clinic-muted">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
