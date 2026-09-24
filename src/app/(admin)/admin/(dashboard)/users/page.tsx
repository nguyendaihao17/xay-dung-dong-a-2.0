import { prisma } from "@/lib/db";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar
        title="Người dùng"
        description="Tài khoản quản trị và biên tập"
      />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Email</AdminTh>
          <AdminTh>Tên</AdminTh>
          <AdminTh>Vai trò</AdminTh>
          <AdminTh>Trạng thái</AdminTh>
          <AdminTh>Đăng nhập cuối</AdminTh>
        </AdminTableHead>
        <tbody>
          {users.map((u) => (
            <AdminTr key={u.id}>
              <AdminTd>
                <div className="font-medium text-navy-900">{u.email}</div>
                {session?.user?.email === u.email && (
                  <div className="text-xs text-neutral-400">(bạn)</div>
                )}
              </AdminTd>
              <AdminTd className="text-neutral-600">{u.name}</AdminTd>
              <AdminTd>
                <Badge variant={u.role === "ADMIN" ? "navy" : "default"}>{u.role}</Badge>
              </AdminTd>
              <AdminTd>
                <Badge variant={u.isActive ? "green" : "red"}>
                  {u.isActive ? "Hoạt động" : "Khóa"}
                </Badge>
              </AdminTd>
              <AdminTd className="text-neutral-500 text-xs">
                {u.lastLoginAt ? formatDate(u.lastLoginAt) : "Chưa đăng nhập"}
              </AdminTd>
            </AdminTr>
          ))}
        </tbody>
      </AdminTable>

      <p className="mt-6 text-xs text-neutral-500">
        Thêm / sửa tài khoản sẽ hoàn thiện ở Phase 8.
      </p>
    </div>
  );
}