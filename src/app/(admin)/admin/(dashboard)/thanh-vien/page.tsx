import { Users, Shield, Mail, Calendar } from "lucide-react";
import { prisma } from "@/lib/db";
import type { Role } from "@prisma/client";

export const dynamic = "force-dynamic";

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Quản trị viên",
  EDITOR: "Biên tập viên",
  VIEWER: "Người xem",
};

const ROLE_CLASSES: Record<Role, string> = {
  ADMIN: "bg-blue-50 text-blue-700",
  EDITOR: "bg-emerald-50 text-emerald-700",
  VIEWER: "bg-neutral-100 text-neutral-600",
};

function formatDate(d: Date | null | undefined) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(d));
}

export default async function MembersPage() {
  const users = await prisma.user.findMany({
    orderBy: [{ createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold uppercase text-navy-900">
          Thành viên
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Danh sách tài khoản quản trị hệ thống ({users.length} thành viên)
        </p>
      </div>

      {users.length === 0 ? (
        <div className="border border-dashed border-neutral-300 bg-white p-16 text-center">
          <Users size={48} className="mx-auto text-neutral-300" />
          <p className="mt-4 text-neutral-500">Chưa có thành viên nào.</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Thành viên</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Vai trò</th>
                <th className="px-6 py-4 font-medium">Ngày tạo</th>
                <th className="px-6 py-4 font-medium">Đăng nhập cuối</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                        {(u.name || u.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-navy-900">
                          {u.name || "Chưa đặt tên"}
                        </div>
                        {!u.isActive && (
                          <div className="text-xs text-red-500">Đã khóa</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <Mail size={11} />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${ROLE_CLASSES[u.role as Role] || "bg-neutral-100 text-neutral-600"}`}
                    >
                      <Shield size={11} />
                      {ROLE_LABELS[u.role as Role] || u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {formatDate(u.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500">
                    {formatDate(u.lastLoginAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}