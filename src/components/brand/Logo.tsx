import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { withBasePath } from "@/lib/basePath";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  const t = useTranslations("Brand");

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Replace public/lead-logo.png with the official asset. */}
      <Image
        src={withBasePath("/lead-logo.png")}
        alt={t("logoAlt")}
        width={32}
        height={32}
        priority
      />
      <span className="text-2xl font-black tracking-tight text-navy">
        {t("name")}
      </span>
    </Link>
  );
}
