import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { buttonClasses } from "@/components/brand/Button";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("HomePage");

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl">{t("title")}</h1>
      <p className="max-w-xl text-lg">{t("subtitle")}</p>
      <Link href="/login" className={buttonClasses()}>
        {t("cta")}
      </Link>
    </section>
  );
}
