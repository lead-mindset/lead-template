"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "./themeScript";

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage blocked (private mode): the theme still applies for this page.
  }
}

type ThemeToggleProps = {
  variant?: "icon" | "menu";
  className?: string;
};

/** Switches between the design system's light and dark themes. */
export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  if (variant === "menu") {
    return (
      <Button type="button" variant="ghost" className={cn("w-full justify-start gap-2", className)} onClick={toggleTheme}>
        <Moon className="size-4 in-data-[theme=dark]:hidden" />
        <Sun className="hidden size-4 in-data-[theme=dark]:flex" />
        <span className="hidden in-data-[theme=dark]:inline">Light theme</span>
      </Button>
    );
  }

  return (
    <Button type="button" variant="ghost" size="icon" aria-label="Toggle theme" title="Toggle theme" className={className} onClick={toggleTheme}>
      <Moon className="size-4 in-data-[theme=dark]:hidden" />
      <Sun className="hidden size-4 in-data-[theme=dark]:flex" />
    </Button>
  );
}