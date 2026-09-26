"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/field";
import { MediaPicker } from "@/components/admin/media-picker";

type Initial = {
  title?: string;
  slug?: string;
  description?: string | null;
  coverImage?: string | null;
  published?: boolean;
  order?: number;
};

export function AlbumForm({
  action,
  initial = {},
  submitLabel = "Lưu",
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Initial;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-6 border border-neutral-200 bg-white p-8">
      <div>
        <Label htmlFor="title">Tên album *</Label>
        <Input id="title" name="title" required defaultValue={initial.title || ""} placeholder="VD: Dự án nhà phố An Phú" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="slug">Slug (để trống để tự sinh)</Label>
        <Input id="slug" name="slug" defaultValue={initial.slug || ""} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Textarea id="description" name="description" rows={3} defaultValue={initial.description || ""} className="mt-2" />
      </div>
      <MediaPicker name="coverImageUrl" initialUrl={initial.coverImage || ""} label="Ảnh đại diện album" />
      <div>
        <Label htmlFor="order">Thứ tự</Label>
        <Input id="order" name="order" type="number" defaultValue={initial.order ?? 0} className="mt-2" />
      </div>
      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" name="published" defaultChecked={initial.published !== false} />
        Hiển thị trên website
      </label>
      <div className="border-t border-neutral-200 pt-6">
        <Button type="submit" size="lg">{submitLabel}</Button>
      </div>
    </form>
  );
}