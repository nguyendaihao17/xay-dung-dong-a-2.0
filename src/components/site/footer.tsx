import Link from "next/link";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/lib/settings";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ZaloIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 5.94 2 10.8c0 2.67 1.41 5.06 3.64 6.69-.13.65-.55 2.02-1.34 2.94 0 0-.16.16.04.29.23.15 2.32.1 3.55-1.15.86.2 1.78.31 2.73.31.06 0 .11 0 .17-.01.13.34.32.85.65 1.3.19.26.41.56.41.56.15.2.36.5.65.81.3.32.3.3.3.3.42.38.95.58 1.5.58.42 0 .86-.11 1.24-.31.55-.3.94-.81 1.24-1.3.11.01.22.01.33.01h.01c4.79 0 8.67-3.36 8.67-7.5 0-4.14-3.88-7.5-8.67-7.5H12z" />
    </svg>
  );
}

const OFFICE = {
  address: "8C đường 168, Phường Phước Long B, TP Thủ Đức, TP.HCM",
  mapEmbed:
    "https://www.google.com/maps?q=8C+%C4%91%C6%B0%E1%BB%9Dng+168+Ph%C6%B0%E1%BB%9Bc+Long+B+Th%E1%BB%A7+%C4%90%E1%BB%A9c+TP.HCM&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=8C+%C4%91%C6%B0%E1%BB%9Dng+168+Ph%C6%B0%E1%BB%9Bc+Long+B+Th%E1%BB%A7+%C4%90%E1%BB%A9c+TP.HCM",
};

const SERVICES = [
  { label: "Tư vấn xây dựng", href: "/dich-vu" },
  { label: "Thiết kế kiến trúc", href: "/dich-vu" },
  { label: "Giám sát thi công", href: "/dich-vu" },
  { label: "Thi công xây dựng", href: "/dich-vu" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900 text-neutral-300">
      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-5" />
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <Container className="relative py-16">
        {/* ===== GRID: 4 cột — Brand (4) + Menu (3) + Dịch vụ (2) + Map (3) ===== */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* ===== CỘT 1: Brand + CTA (4/12) ===== */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              {settings.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.logoUrl}
                  alt={settings.companyName}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center bg-white font-display text-xl font-bold text-navy-900">
                  ĐA
                </div>
              )}
              <div>
                <div className="font-display text-base font-bold uppercase leading-tight text-white">
                  {settings.companyName}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Niềm tin • Chất lượng • Uy tín
                </div>
              </div>
            </div>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <a
                  href={OFFICE.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-accent"
                >
                  {OFFICE.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={16} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-neutral-400">
                  MST: <span className="text-neutral-300">0302481081</span>
                </span>
              </li>
            </ul>

            <div className="mt-7 space-y-3">
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="group flex w-full items-center justify-center gap-3 bg-accent px-6 py-3.5 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-accent-hover hover:shadow-glow"
                >
                  <Phone size={18} className="transition-transform group-hover:scale-110" />
                  {settings.phone}
                </a>
              )}

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex w-full items-center justify-center gap-3 border-2 border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-accent hover:bg-accent/10"
                >
                  <Mail size={16} />
                  {settings.email}
                </a>
              )}
            </div>
          </div>

          {/* ===== CỘT 2: Menu (3/12) ===== */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Menu
            </h3>
            <div className="mt-2 h-0.5 w-8 bg-accent" />
            <ul className="mt-6 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-neutral-400 transition-all hover:translate-x-1 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CỘT 3: Dịch vụ (2/12) ===== */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Dịch vụ
            </h3>
            <div className="mt-2 h-0.5 w-8 bg-accent" />
            <ul className="mt-6 space-y-3">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-neutral-400 transition-all hover:translate-x-1 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CỘT 4: Map + Social (3/12) ===== */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Bản đồ
            </h3>
            <div className="mt-2 h-0.5 w-8 bg-accent" />

            <div className="mt-6 border border-white/10 bg-neutral-900">
              <div className="relative aspect-square w-full">
                <iframe
                  title="Bản đồ Đông Á"
                  src={OFFICE.mapEmbed}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-neutral-400 transition-all hover:bg-accent hover:text-white hover:shadow-glow"
                >
                  <FacebookIcon size={16} />
                </a>
              )}
              {settings.zaloUrl && (
                <a
                  href={settings.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Zalo"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-neutral-400 transition-all hover:bg-accent hover:text-white hover:shadow-glow"
                >
                  <ZaloIcon size={16} />
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-neutral-400 transition-all hover:bg-accent hover:text-white hover:shadow-glow"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ===== BOTTOM ===== */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row">
          <span>
            © {year} <span className="text-neutral-400">{settings.companyName}</span>. Bảo lưu mọi quyền.
          </span>
          <span>
            Thiết kế bởi <span className="font-semibold text-accent">Đông Á</span>
          </span>
        </div>
      </Container>
    </footer>
  );
}