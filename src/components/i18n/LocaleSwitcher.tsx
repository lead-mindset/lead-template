"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const current = useLocale();

  return (
    <ul aria-label={t("label")} className="flex items-center gap-2">
      {routing.locales.map((locale) => (
        <li key={locale}>
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === current ? "true" : undefined}
            title={t(locale)}
            className={
              locale === current
                ? "font-bold text-navy"
                : "text-text/70 hover:text-violet"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
