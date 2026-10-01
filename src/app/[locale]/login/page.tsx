import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default function LoginPage({ params, searchParams }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const { error } = use(searchParams);
  const t = useTranslations("LoginPage");

  return (
    <section className="px-4 py-7 sm:py-8">
      <div className="card-surface mx-auto flex max-w-md flex-col items-center gap-5 rounded-xl border border-border/60 p-6 text-center">
        <h1 className="text-h1 font-bold tracking-tight">{t("title")}</h1>
        <p className="text-small text-muted-foreground">{t("subtitle")}</p>
        <GoogleSignInButton initialError={Boolean(error)} />
      </div>
    </section>
  );
}
