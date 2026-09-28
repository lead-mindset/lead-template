import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { Logo } from "./Logo";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="border-b border-gray-light bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav aria-label={t("nav")} className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-violet">
            {t("home")}
          </Link>
          <Link href="/dashboard" className="hover:text-violet">
            {t("dashboard")}
          </Link>
          <Link href="/login" className="hover:text-violet">
            {t("login")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
