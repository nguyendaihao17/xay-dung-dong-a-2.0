"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, Select } from "@/components/ui/field";
import { MediaPicker } from "@/components/admin/media-picker";

type Initial = {
  title?: string;
  slug?: string;
  shortDescription?: string | null;
  location?: string | null;
  client?: string | null;
  year?: number | null;
  scope?: string | null;
  status?: string;
  published?: boolean;
  featured?: boolean;
  coverImage?: { url: string } | null;
  content?: unknown;
};

function pickContent(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null && "html" in v) return String((v as { html: unknown }).html || "");
  return "";
}

export function ProjectForm({
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
        <Label htmlFor="slug">Slug (để trống để tự sinh)</Label>
        <Input id="slug" name="slug" defaultValue={initial.slug} className="mt-2" />
      </div>
      <MediaPicker name="coverImageUrl" initialUrl={initial.coverImage?.url || ""} label="Ảnh đại diện" />
      <div>
        <Label htmlFor="shortDescription">Mô tả ngắn</Label>
        <Textarea id="shortDescription" name="shortDescription" rows={3} defaultValue={initial.shortDescription || ""} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="content">Nội dung chi tiết (HTML: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;strong&gt;...)</Label>
        <Textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={pickContent(initial.content)}
          className="mt-2 font-mono text-sm"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="location">Vị trí</Label>
          <Input id="location" name="location" defaultValue={initial.location || ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="client">Chủ đầu tư</Label>
          <Input id="client" name="client" defaultValue={initial.client || ""} className="mt-2" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="year">Năm hoàn thành</Label>
          <Input id="year" name="year" type="number" defaultValue={initial.year || ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="scope">Phạm vi</Label>
          <Input id="scope" name="scope" defaultValue={initial.scope || ""} className="mt-2" />
        </div>
      </div>
      <div>
        <Label htmlFor="status">Trạng thái</Label>
        <Select id="status" name="status" defaultValue={initial.status || "COMPLETED"} className="mt-2">
          <option value="PLANNING">Đang lên kế hoạch</option>
          <option value="IN_PROGRESS">Đang thi công</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="ON_HOLD">Tạm dừng</option>
        </Select>
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