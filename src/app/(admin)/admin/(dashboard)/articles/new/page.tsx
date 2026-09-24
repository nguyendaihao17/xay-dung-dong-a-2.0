import { FormShell } from "@/components/admin/form-shell";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticleAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  return (
    <FormShell title="Thêm bài viết">
      <ArticleForm action={createArticleAction} submitLabel="Tạo bài viết" />
    </FormShell>
  );
}