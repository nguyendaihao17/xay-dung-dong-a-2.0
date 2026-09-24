import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { FormShell } from "@/components/admin/form-shell";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticleAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const boundAction = updateArticleAction.bind(null, id);

  return (
    <FormShell title="Sửa bài viết" description={article.title}>
      <ArticleForm action={boundAction} initial={article} submitLabel="Cập nhật" />
    </FormShell>
  );
}