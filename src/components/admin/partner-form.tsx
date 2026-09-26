"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { MediaPicker } from "@/components/admin/media-picker";

type Initial = {
  name?: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  order?: number;
  isActive?: boolean;
};

export function PartnerForm({
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
        <Label htmlFor="name">Tên đối tác *</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={initial.name || ""}
          placeholder="VD: VINGROUP"
          className="mt-2"
        />
      </div>

      <MediaPicker
        name="logoUrl"
        initialUrl={initial.logoUrl || ""}
        label="Logo đối tác (PNG nền trong suốt để đẹp nhất)"
      />

      <div>
        <Label htmlFor="websiteUrl">Website</Label>
        <Input
          id="websiteUrl"
          name="websiteUrl"
          type="url"
          defaultValue={initial.websiteUrl || ""}
          placeholder="https://vingroup.net"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="order">Thứ tự hiển thị (số nhỏ hiện trước)</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={initial.order ?? 0}
          className="mt-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={initial.isActive !== false}
        />
        Hiển thị trên website
      </label>

      <div className="border-t border-neutral-200 pt-6">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}