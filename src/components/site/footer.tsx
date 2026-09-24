import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/lib/settings";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-navy-950 text-neutral-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              {settings.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.logoUrl} alt={settings.companyName} className="h-10 w-auto" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center bg-white text-lg font-bold text-navy-900">
                  ĐA
                </div>
              )}
              <span className="font-display text-xl uppercase tracking-wide text-white">
                {settings.companyName}
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400">
              Tư vấn • Thiết kế • Giám sát • Thi công xây dựng. Hơn 20 năm kiến tạo công trình bền vững.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-white">Liên kết</h3>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-white">Liên hệ</h3>
            <ul className="mt-5 space-y-3 text-sm text-neutral-400">
              {settings.phone && (
                <li>
                  Điện thoại: <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a>
                </li>
              )}
              {settings.email && (
                <li>
                  Email: <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
                </li>
              )}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {year} {settings.companyName}. Bảo lưu mọi quyền.
        </div>
      </Container>
    </footer>
  );
}