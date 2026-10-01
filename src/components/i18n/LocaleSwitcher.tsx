"use client";

import { useLocale } from "next-intl";
import { Segmented } from "@/components/ui/segmented";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Segmented
      value={locale}
      onChange={(next) => router.replace(pathname, { locale: next as Locale })}
      options={routing.locales.map((code) => ({ value: code, label: code.toUpperCase() }))}
    />
  );
}
