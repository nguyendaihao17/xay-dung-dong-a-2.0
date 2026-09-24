"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";

type Initial = {
  title?: string;
  slug?: string;
  department?: string | null;
  location?: string | null;
  salaryRange?: string | null;
  published?: boolean;
};

export function CareerForm({
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="department">Phòng ban</Label>
          <Input id="department" name="department" defaultValue={initial.department || ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="location">Địa điểm</Label>
          <Input id="location" name="location" defaultValue={initial.location || ""} className="mt-2" />
        </div>
      </div>
      <div>
        <Label htmlFor="salaryRange">Mức lương</Label>
        <Input id="salaryRange" name="salaryRange" defaultValue={initial.salaryRange || ""} className="mt-2" />
      </div>
      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" name="published" defaultChecked={initial.published} />
        Đăng công khai
      </label>
      <div className="flex gap-3 pt-4">
        <Button type="submit" size="lg">{submitLabel}</Button>
      </div>
    </form>
  );
}