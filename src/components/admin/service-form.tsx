"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/field";
import { MediaPicker } from "@/components/admin/media-picker";

type Initial = {
  title?: string;
  slug?: string;
  shortDescription?: string | null;
  content?: unknown;
  published?: boolean;
  featured?: boolean;
  coverImage?: { url: string } | null;
};

export function ServiceForm({
  action,
  initial = {},
  submitLabel = "Lưu",
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Initial;
  submitLabel?: string;
}) {
  const contentValue =
    typeof initial.content === "string"
      ? initial.content
      : initial.content
        ? JSON.stringify(initial.content)
        : "";

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
      <MediaPicker name="coverImageUrl" initialUrl={initial.coverImage?.url || ""} label="Ảnh đại diện" />
      <div>
        <Label htmlFor="shortDescription">Mô tả ngắn</Label>
        <Textarea id="shortDescription" name="shortDescription" rows={3} defaultValue={initial.shortDescription || ""} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="content">Nội dung chi tiết (HTML)</Label>
        <Textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={contentValue}
          className="mt-2 font-mono text-sm"
        />
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