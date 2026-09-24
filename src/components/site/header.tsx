"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Props = {
  companyName: string;
  logoUrl: string;
};

export function Header({ companyName, logoUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <Container className="flex h-[var(--header-height-mobile)] items-center justify-between lg:h-[var(--header-height)]">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={companyName} className="h-10 w-auto" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center bg-navy-900 text-lg font-bold text-white">
              ĐA
            </div>
          )}
          <span className="hidden font-display text-lg uppercase tracking-wide text-navy-900 sm:block">
            {companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wider text-neutral-700 transition-colors hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/lien-he"
            className="bg-navy-900 px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
          >
            Liên hệ
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-neutral-200 bg-white transition-all lg:hidden",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col py-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-neutral-100 py-4 text-base font-medium uppercase tracking-wider text-neutral-800"
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}