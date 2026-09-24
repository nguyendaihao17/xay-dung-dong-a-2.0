"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/field";

type Initial = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  published?: boolean;
  featured?: boolean;
};

export function ArticleForm({
  action,
  initial = {},
  submitLabel = "Lưu",
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Initial;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <Label htmlFor="title">Tiêu đề *</Label>
        <Input id="title" name="title" required defaultValue={initial.title} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" defaultValue={initial.slug} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="excerpt">Tóm tắt</Label>
        <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={initial.excerpt || ""} className="mt-2" />
      </div>
      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="published" defaultChecked={initial.published} />
          Đăng công khai
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="featured" defaultChecked={initial.featured} />
          Nổi bật
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="submit" size="lg">{submitLabel}</Button>
      </div>
    </form>
  );
}