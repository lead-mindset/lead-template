import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("HomePage");
  const brand = useTranslations("Brand");

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-7 sm:py-8">
      <div className="flex max-w-3xl flex-col gap-5">
        <p className="font-display text-overline text-primary uppercase">
          {brand("tagline")}
        </p>
        <h1 className="text-h1 sm:text-display">{t("title")}</h1>
        <p className="text-body-lg">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/login">{t("cta")}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/design-system">
              {t("designSystem")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
