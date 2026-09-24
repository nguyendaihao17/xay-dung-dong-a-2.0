import Link from "next/link";
import { Edit } from "lucide-react";
import { careerRepository } from "@/lib/repositories/career.repository";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";
import { PublishBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCareerAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const careers = await careerRepository.list();

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar title="Tuyển dụng" description="Vị trí đang tuyển" createHref="/admin/careers/new" />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Tiêu đề</AdminTh>
          <AdminTh>Phòng ban</AdminTh>
          <AdminTh>Địa điểm</AdminTh>
          <AdminTh>Trạng thái</AdminTh>
          <AdminTh className="text-right">Hành động</AdminTh>
        </AdminTableHead>
        <tbody>
          {careers.length === 0 ? (
            <AdminTr>
              <AdminTd className="text-neutral-500">Chưa có vị trí nào.</AdminTd>
              <AdminTd /><AdminTd /><AdminTd /><AdminTd />
            </AdminTr>
          ) : (
            careers.map((c) => (
              <AdminTr key={c.id}>
                <AdminTd>
                  <div className="font-medium text-navy-900">{c.title}</div>
                  <div className="text-xs text-neutral-500">{c.slug}</div>
                </AdminTd>
                <AdminTd className="text-neutral-600">{c.department || "—"}</AdminTd>
                <AdminTd className="text-neutral-600">{c.location || "—"}</AdminTd>
                <AdminTd><PublishBadge published={c.published} /></AdminTd>
                <AdminTd className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/careers/${c.id}`} className="text-neutral-400 hover:text-navy-900">
                      <Edit size={16} />
                    </Link>
                    <DeleteButton action={async () => { "use server"; await deleteCareerAction(c.id); }} />
                  </div>
                </AdminTd>
              </AdminTr>
            ))
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}