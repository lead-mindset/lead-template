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
    <section className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-20 text-center">
      <h1 className="text-3xl">{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <GoogleSignInButton initialError={Boolean(error)} />
    </section>
  );
}
