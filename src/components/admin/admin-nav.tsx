"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  Image as ImageIcon,
  Images,
  Wrench,
  Handshake,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth-actions";
import { useState } from "react";

type MenuItem = {
  href?: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  children?: { href: string; label: string }[];
};

const MENU: MenuItem[] = [
  { href: "/admin", label: "Bảng điều khiển", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Dự án", icon: FolderKanban },
  { href: "/admin/articles", label: "Bài viết", icon: Newspaper },
  { href: "/admin/services", label: "Dịch vụ", icon: Wrench },
  { href: "/admin/careers", label: "Tuyển dụng", icon: Briefcase },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/albums", label: "Album ảnh", icon: Images },
  { href: "/admin/leads", label: "Liên hệ", icon: MessageSquare },
  { href: "/admin/partners", label: "Đối tác", icon: Handshake },
  {
    label: "Hệ thống",
    icon: Settings,
    children: [
      { href: "/admin/thanh-vien", label: "Thành viên" },
      { href: "/admin/thanh-vien/doi-mat-khau", label: "Đổi mật khẩu" },
      { href: "/admin/settings", label: "Cài đặt website" },
    ],
  },
];

export function AdminNav({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [systemOpen, setSystemOpen] = useState(pathname.startsWith("/admin/thanh-vien") || pathname.startsWith("/admin/settings"));

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-neutral-800 bg-navy-950 text-white lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-neutral-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center bg-white text-sm font-bold text-navy-900">
          ĐA
        </div>
        <span className="font-display text-sm uppercase tracking-wide">Đông Á CMS</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        {MENU.map((item) => {
          const Icon = item.icon;

          // Menu có children
          if (item.children) {
            const isActive = item.children.some((c) => pathname.startsWith(c.href));
            return (
              <div key={item.label}>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSystemOpen(!systemOpen)}
                  className={cn(
                    "flex w-full items-center gap-3 border-l-2 px-6 py-3 text-sm transition-colors",
                    isActive
                      ? "border-white bg-white/5 text-white"
                      : "border-transparent text-neutral-400 hover:border-neutral-600 hover:text-white"
                  )}
                >
                  <Icon size={18} strokeWidth={1.75} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform",
                      systemOpen && "rotate-180"
                    )}
                  />
                </button>

                {systemOpen && (
                  <div className="bg-navy-900/50">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block border-l-2 py-2.5 pl-14 pr-6 text-xs transition-colors",
                            childActive
                              ? "border-accent bg-white/5 text-accent"
                              : "border-transparent text-neutral-400 hover:text-white"
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Menu thường
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href || "");

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 border-l-2 px-6 py-3 text-sm transition-colors",
                active
                  ? "border-white bg-white/5 text-white"
                  : "border-transparent text-neutral-400 hover:border-neutral-600 hover:text-white"
              )}
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-4">
        <div className="mb-3 px-2 text-xs text-neutral-500">{userName}</div>
        <form action={logoutAction}>
          <button
            type="submit"
            suppressHydrationWarning
            className="flex w-full items-center gap-3 rounded px-2 py-2 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} strokeWidth={1.75} />
            Đăng xuất
          </button>
        </form>
      </div>
    </aside>
  );
}