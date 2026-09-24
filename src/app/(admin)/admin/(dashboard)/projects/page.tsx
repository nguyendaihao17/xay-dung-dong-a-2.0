import Link from "next/link";
import { Edit } from "lucide-react";
import { projectRepository } from "@/lib/repositories/project.repository";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";
import { PublishBadge, FeatureBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProjectAction } from "@/lib/admin-actions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await projectRepository.list();

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar
        title="Dự án"
        description="Quản lý danh sách công trình"
        createHref="/admin/projects/new"
      />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Tiêu đề</AdminTh>
          <AdminTh>Danh mục</AdminTh>
          <AdminTh>Năm</AdminTh>
          <AdminTh>Trạng thái</AdminTh>
          <AdminTh>Nổi bật</AdminTh>
          <AdminTh className="text-right">Hành động</AdminTh>
        </AdminTableHead>
        <tbody>
          {projects.length === 0 ? (
            <AdminTr>
              <AdminTd className="text-neutral-500">Chưa có dự án nào.</AdminTd>
              <AdminTd /><AdminTd /><AdminTd /><AdminTd /><AdminTd />
            </AdminTr>
          ) : (
            projects.map((p) => (
              <AdminTr key={p.id}>
                <AdminTd>
                  <div className="font-medium text-navy-900">{p.title}</div>
                  <div className="text-xs text-neutral-500">{p.slug}</div>
                </AdminTd>
                <AdminTd className="text-neutral-600">{p.category?.name || "—"}</AdminTd>
                <AdminTd className="text-neutral-600">{p.year || "—"}</AdminTd>
                <AdminTd><PublishBadge published={p.published} /></AdminTd>
                <AdminTd><FeatureBadge featured={p.featured} /></AdminTd>
                <AdminTd className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/projects/${p.id}`} className="text-neutral-400 hover:text-navy-900">
                      <Edit size={16} />
                    </Link>
                    <DeleteButton action={async () => { "use server"; await deleteProjectAction(p.id); }} />
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