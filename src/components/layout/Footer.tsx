import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer id="contact" className="mt-16 border-t border-clinic-primary/10 bg-clinic-surface">
      <div className="container-page grid gap-6 py-10 md:grid-cols-2">
        <div>
          <p className="text-lg font-semibold text-clinic-primary">Algorithm</p>
          <p className="mt-2 text-sm text-clinic-muted">{t("tagline")}</p>
        </div>
        <div className="text-sm text-clinic-muted md:text-right">
          <p>{t("address")}</p>
          <p>{t("phone")}</p>
          <p>{t("email")}</p>
        </div>
      </div>
    </footer>
  );
}
