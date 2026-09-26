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
  Wrench,
  Handshake,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth-actions";

const items = [
  { href: "/admin", label: "Bảng điều khiển", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Dự án", icon: FolderKanban },
  { href: "/admin/articles", label: "Bài viết", icon: Newspaper },
  { href: "/admin/services", label: "Dịch vụ", icon: Wrench },
  { href: "/admin/careers", label: "Tuyển dụng", icon: Briefcase },
  { href: "/admin/media", label: "Thư viện", icon: ImageIcon },
  { href: "/admin/leads", label: "Liên hệ", icon: MessageSquare },
  { href: "/admin/partners", label: "Đối tác", icon: Handshake },
  { href: "/admin/users", label: "Người dùng", icon: Users },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings },
];

export function AdminNav({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-neutral-800 bg-navy-950 text-white lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-neutral-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center bg-white text-sm font-bold text-navy-900">
          ĐA
        </div>
        <span className="font-display text-sm uppercase tracking-wide">Đông Á CMS</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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