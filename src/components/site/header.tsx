"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Props = {
  companyName: string;
  logoUrl: string;
  phone?: string;
};

export function Header({ companyName, logoUrl, phone }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div
        className={cn(
          "hidden border-b border-white/10 bg-navy-950 text-white transition-all duration-300 lg:block",
          scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <Container className="flex h-10 items-center justify-between text-xs">
          <span className="text-white/70">
            Tư vấn - Thiết kế - Giám sát - Thi công xây dựng
          </span>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-accent"
            >
              <Phone size={12} />
              {phone}
            </a>
          )}
        </Container>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-neutral-200 shadow-md" : "border-transparent"
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-6 transition-all duration-300",
            scrolled ? "h-16" : "h-20 lg:h-24"
          )}
        >
          {/* Logo + Name */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={companyName}
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  scrolled ? "h-10" : "h-12 lg:h-14"
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center bg-navy-900 font-display font-bold text-white transition-all duration-300",
                  scrolled ? "h-10 w-10 text-base" : "h-12 w-12 text-lg lg:h-14 lg:w-14 lg:text-xl"
                )}
              >
                ĐA
              </div>
            )}

            <span
              className={cn(
                "line-clamp-2 max-w-[220px] font-display font-bold uppercase leading-tight tracking-tight text-navy-900 transition-all duration-300 lg:max-w-[280px]",
                scrolled ? "text-sm" : "text-base lg:text-lg"
              )}
            >
              {companyName}
            </span>
          </Link>

          {/* Desktop Nav — 7 mục, KHÔNG có nút CTA bên phải */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                    active ? "text-accent" : "text-neutral-700 hover:text-navy-900"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu btn */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center text-navy-900 lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>

        {/* Mobile Menu */}
        <div
          className={cn(
            "overflow-hidden border-t border-neutral-200 bg-white transition-all duration-300 lg:hidden",
            open ? "max-h-[600px]" : "max-h-0"
          )}
        >
          <Container className="flex flex-col py-4">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-neutral-100 py-4 text-sm font-semibold uppercase tracking-wider transition-colors",
                    active ? "text-accent" : "text-navy-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="mt-4 inline-flex h-12 items-center justify-center gap-2 bg-navy-900 text-xs font-semibold uppercase tracking-wider text-white"
              >
                <Phone size={14} />
                {phone}
              </a>
            )}
          </Container>
        </div>
      </header>
    </>
  );
}