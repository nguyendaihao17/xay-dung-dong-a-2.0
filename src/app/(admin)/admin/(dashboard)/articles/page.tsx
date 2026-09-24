import Link from "next/link";
import { Edit } from "lucide-react";
import { articleRepository } from "@/lib/repositories/article.repository";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";
import { PublishBadge, FeatureBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteArticleAction } from "@/lib/admin-actions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await articleRepository.list();

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar title="Bài viết" description="Tin tức và kiến thức" createHref="/admin/articles/new" />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Tiêu đề</AdminTh>
          <AdminTh>Danh mục</AdminTh>
          <AdminTh>Ngày đăng</AdminTh>
          <AdminTh>Trạng thái</AdminTh>
          <AdminTh>Nổi bật</AdminTh>
          <AdminTh className="text-right">Hành động</AdminTh>
        </AdminTableHead>
        <tbody>
          {articles.length === 0 ? (
            <AdminTr>
              <AdminTd className="text-neutral-500">Chưa có bài viết nào.</AdminTd>
              <AdminTd /><AdminTd /><AdminTd /><AdminTd /><AdminTd />
            </AdminTr>
          ) : (
            articles.map((a) => (
              <AdminTr key={a.id}>
                <AdminTd>
                  <div className="font-medium text-navy-900">{a.title}</div>
                  <div className="text-xs text-neutral-500">{a.slug}</div>
                </AdminTd>
                <AdminTd className="text-neutral-600">{a.category?.name || "—"}</AdminTd>
                <AdminTd className="text-neutral-600">{a.publishedAt ? formatDate(a.publishedAt) : "—"}</AdminTd>
                <AdminTd><PublishBadge published={a.published} /></AdminTd>
                <AdminTd><FeatureBadge featured={a.featured} /></AdminTd>
                <AdminTd className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/articles/${a.id}`} className="text-neutral-400 hover:text-navy-900">
                      <Edit size={16} />
                    </Link>
                    <DeleteButton action={async () => { "use server"; await deleteArticleAction(a.id); }} />
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