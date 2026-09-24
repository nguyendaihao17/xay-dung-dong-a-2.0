import Link from "next/link";
import { Edit } from "lucide-react";
import { serviceRepository } from "@/lib/repositories/service.repository";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";
import { PublishBadge, FeatureBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteServiceAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await serviceRepository.list();

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar title="Dịch vụ" description="Quản lý dịch vụ" createHref="/admin/services/new" />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Tiêu đề</AdminTh>
          <AdminTh>Thứ tự</AdminTh>
          <AdminTh>Trạng thái</AdminTh>
          <AdminTh>Nổi bật</AdminTh>
          <AdminTh className="text-right">Hành động</AdminTh>
        </AdminTableHead>
        <tbody>
          {services.length === 0 ? (
            <AdminTr>
              <AdminTd className="text-neutral-500">Chưa có dịch vụ nào.</AdminTd>
              <AdminTd /><AdminTd /><AdminTd /><AdminTd />
            </AdminTr>
          ) : (
            services.map((s) => (
              <AdminTr key={s.id}>
                <AdminTd>
                  <div className="font-medium text-navy-900">{s.title}</div>
                  <div className="text-xs text-neutral-500">{s.slug}</div>
                </AdminTd>
                <AdminTd className="text-neutral-600">{s.sortOrder}</AdminTd>
                <AdminTd><PublishBadge published={s.published} /></AdminTd>
                <AdminTd><FeatureBadge featured={s.featured} /></AdminTd>
                <AdminTd className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/services/${s.id}`} className="text-neutral-400 hover:text-navy-900">
                      <Edit size={16} />
                    </Link>
                    <DeleteButton action={async () => { "use server"; await deleteServiceAction(s.id); }} />
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