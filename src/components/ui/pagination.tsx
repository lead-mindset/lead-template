"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Paginación" className={cn("flex items-center gap-1", className)}>
      <Button variant="outline" size="icon-sm" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Anterior">
        <ChevronLeft />
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          size="icon-sm"
          variant={p === page ? "default" : "ghost"}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Button>
      ))}
      <Button variant="outline" size="icon-sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Siguiente">
        <ChevronRight />
      </Button>
    </nav>
  );
}
