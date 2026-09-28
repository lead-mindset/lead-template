import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const brand = useTranslations("Brand");

  return (
    <footer className="bg-navy text-white">
      <div className="lead-gradient h-1" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-6 text-sm sm:flex-row sm:justify-between">
        <p className="font-semibold tracking-wide">{brand("tagline")}</p>
        <p className="text-white/70">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
