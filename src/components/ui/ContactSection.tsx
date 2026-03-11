"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/lib/validation/contact";
import { Button } from "@/components/ui/Button";

type ContactSectionProps = {
  showStepLabel?: boolean;
  title?: string;
  lead?: string;
};

export function ContactSection({
  showStepLabel = true,
  title,
  lead,
}: ContactSectionProps) {
  const t = useTranslations("Contact");
  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const errorText = (code?: string) => (code ? t(`errors.${code}`) : "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      gdprAccepted: false,
      website: "",
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setSubmitState("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    setSubmitState("success");
    reset();
  }

  return (
    <section id="contact" className="relative isolate scroll-mt-24">
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          {showStepLabel ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs">
              {t("timelineLabel")}
            </p>
          ) : null}
          <h2 className="mt-3 text-display-sm">{title ?? t("title")}</h2>
          <p className="section-lead mt-4">{lead ?? t("lead")}</p>
        </div>

        <div className="mx-auto mt-10 overflow-hidden rounded-3xl border border-clinic-border bg-clinic-white dark:border-slate-700 dark:bg-slate-900">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <article className="border-b border-clinic-border bg-gradient-to-br from-clinic-blue-50 to-clinic-white p-6 sm:p-8 lg:border-b-0 lg:border-r dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
              <h3 className="text-xl font-semibold text-clinic-slate-900 dark:text-slate-100 sm:text-2xl">
                {t("formTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-clinic-slate-700 dark:text-slate-300">
                {t("careMessage")}
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                    {t("hoursLabel")}
                  </p>
                  <ul className="mt-2 text-sm">
                    {weekDays.map((dayKey) => (
                      <li
                        key={dayKey}
                        className="flex items-center justify-between gap-3 border-b border-clinic-border/70 py-2 last:border-b-0 dark:border-slate-700/80"
                      >
                        <span className="text-clinic-slate-700 dark:text-slate-300">
                          {t(`hours.${dayKey}.day`)}
                        </span>
                        <span className="text-clinic-slate-800 dark:text-slate-200">
                          {t(`hours.${dayKey}.time`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                    {t("emailLabel")}
                  </p>
                  <p className="mt-1 text-sm text-clinic-slate-800 dark:text-slate-200">
                    {t("emailValue")}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                    {t("phoneLabel")}
                  </p>
                  <p className="mt-1 text-sm text-clinic-slate-800 dark:text-slate-200">
                    {t("phoneValue")}
                  </p>
                </div>
              </div>
            </article>

            <div className="p-6 sm:p-8 lg:p-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
              <input
                type="text"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />

              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("name")}
                <input
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-clinic-border bg-white px-4 py-3 text-sm text-clinic-slate-900 outline-none transition focus:border-clinic-teal-600 focus:ring-2 focus:ring-clinic-teal-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-clinic-teal-400 dark:focus:ring-clinic-teal-900/60"
                  placeholder={t("namePlaceholder")}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                    {errorText(errors.name.message)}
                  </p>
                ) : null}
              </label>

              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("phone")}
                <input
                  type="tel"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-clinic-border bg-white px-4 py-3 text-sm text-clinic-slate-900 outline-none transition focus:border-clinic-teal-600 focus:ring-2 focus:ring-clinic-teal-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-clinic-teal-400 dark:focus:ring-clinic-teal-900/60"
                  placeholder={t("phonePlaceholder")}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                    {errorText(errors.phone.message)}
                  </p>
                ) : null}
              </label>

              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("email")}
                <input
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-clinic-border bg-white px-4 py-3 text-sm text-clinic-slate-900 outline-none transition focus:border-clinic-teal-600 focus:ring-2 focus:ring-clinic-teal-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-clinic-teal-400 dark:focus:ring-clinic-teal-900/60"
                  placeholder={t("emailPlaceholder")}
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                    {errorText(errors.email.message)}
                  </p>
                ) : null}
              </label>

              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-clinic-teal-700 dark:text-clinic-teal-300">
                {t("message")}
                <textarea
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-clinic-border bg-white px-4 py-3 text-sm text-clinic-slate-900 outline-none transition focus:border-clinic-teal-600 focus:ring-2 focus:ring-clinic-teal-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-clinic-teal-400 dark:focus:ring-clinic-teal-900/60"
                  placeholder={t("messagePlaceholder")}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                    {errorText(errors.message.message)}
                  </p>
                ) : null}
              </label>

              <label className="flex items-start gap-3 text-sm text-clinic-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-clinic-border accent-clinic-teal-700 dark:border-slate-600"
                  {...register("gdprAccepted")}
                />
                <span>{t("gdprText")}</span>
              </label>
              {errors.gdprAccepted ? (
                <p className="-mt-3 text-xs text-red-700 dark:text-red-400">
                  {errorText(errors.gdprAccepted.message)}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  iconVariant="send"
                  className="w-full sm:ml-auto sm:w-auto sm:min-w-44"
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                </Button>

                {submitState === "success" ? (
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">
                    {t("successMessage")}
                  </p>
                ) : null}
                {submitState === "error" ? (
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {t("errorMessage")}
                  </p>
                ) : null}
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

