import { useTranslations } from "next-intl";

/** Footer in the lead-platform-prototype style: brand L + tagline + copyright. */
export function Footer() {
  const t = useTranslations("Footer");
  const brand = useTranslations("Brand");

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="brand-gradient flex size-8 items-center justify-center rounded-lg text-sm font-black tracking-tight text-primary-foreground">
            L
          </span>
          <span className="text-small font-semibold">LEAD</span>
        </div>
        <p className="text-caption text-muted-foreground">{brand("tagline")}</p>
        <p className="text-caption text-muted-foreground">{t("copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
