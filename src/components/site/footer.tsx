import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { clientConfig } from "@/lib/env-client";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-navy-950 text-neutral-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-white text-lg font-bold text-navy-900">
                ĐA
              </div>
              <span className="font-display text-xl uppercase tracking-wide text-white">
                {clientConfig.NEXT_PUBLIC_SITE_NAME}
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
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-white">Liên hệ</h3>
            <ul className="mt-5 space-y-3 text-sm text-neutral-400">
              <li>Điện thoại: <a href={`tel:${clientConfig.NEXT_PUBLIC_PHONE}`} className="hover:text-white">{clientConfig.NEXT_PUBLIC_PHONE || "Đang cập nhật"}</a></li>
              <li>Email: <a href="mailto:info@xddonga.vn" className="hover:text-white">info@xddonga.vn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {year} {clientConfig.NEXT_PUBLIC_SITE_NAME}. Bảo lưu mọi quyền.
        </div>
      </Container>
    </footer>
  );
}