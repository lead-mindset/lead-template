"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const NAV = [
  { key: "home", href: "/" },
  { key: "dashboard", href: "/dashboard" },
  { key: "designSystem", href: "/design-system" },
] as const;

/** App header in the lead-platform-prototype style: brand L + nav pills + actions. */
export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = NAV.map(({ key, href }) => ({
    label: t(key),
    href,
    active: href === "/" ? pathname === "/" : pathname.startsWith(href),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="brand-gradient flex size-8 items-center justify-center rounded-lg text-sm font-black tracking-tight text-primary-foreground">
            L
          </span>
          <span className="text-lg font-bold tracking-tight">LEAD</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label={t("nav")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-small font-medium transition-colors",
                link.active ? "bg-muted font-semibold text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />
          <LocaleSwitcher />
          <Button size="sm" variant="secondary" asChild className="hidden sm:inline-flex">
            <Link href="/login">{t("login")}</Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label={open ? t("menu") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-6 py-3 backdrop-blur md:hidden" aria-label={t("nav")}>
          {[...links, { label: t("login"), href: "/login", active: false }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-body font-medium transition-colors",
                link.active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}