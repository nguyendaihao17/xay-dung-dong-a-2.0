import { prisma } from "@/lib/db";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar
        title="Cài đặt"
        description="Cấu hình website"
      />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Khóa</AdminTh>
          <AdminTh>Nhóm</AdminTh>
          <AdminTh>Giá trị</AdminTh>
        </AdminTableHead>
        <tbody>
          {settings.map((s) => (
            <AdminTr key={s.key}>
              <AdminTd className="font-mono text-xs text-navy-900">{s.key}</AdminTd>
              <AdminTd className="text-neutral-600">{s.group}</AdminTd>
              <AdminTd className="font-mono text-xs text-neutral-600">
                {JSON.stringify(s.value)}
              </AdminTd>
            </AdminTr>
          ))}
        </tbody>
      </AdminTable>

      <p className="mt-6 text-xs text-neutral-500">
        Chỉnh sửa cài đặt sẽ hoàn thiện ở Phase 8.
      </p>
    </div>
  );
}