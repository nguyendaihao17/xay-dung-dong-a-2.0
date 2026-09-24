"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/field";
import { MediaPicker } from "@/components/admin/media-picker";

type Initial = {
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  zaloUrl?: string;
  facebookUrl?: string;
  logoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export function SettingsForm({
  action,
  initial = {},
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: Initial;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-8 border border-neutral-200 bg-white p-8">
      <div>
        <h2 className="font-display text-xl uppercase text-navy-900">Thông tin công ty</h2>
        <div className="mt-6 space-y-6">
          <div>
            <Label htmlFor="company.name">Tên công ty</Label>
            <Input
              id="company.name"
              name="company.name"
              defaultValue={initial.companyName || "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á"}
              className="mt-2"
            />
          </div>
          <MediaPicker name="company.logoUrl" initialUrl={initial.logoUrl || ""} label="Logo công ty" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="company.phone">Điện thoại</Label>
              <Input
                id="company.phone"
                name="company.phone"
                defaultValue={initial.phone || ""}
                placeholder="0909 123 456"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="company.email">Email</Label>
              <Input
                id="company.email"
                name="company.email"
                type="email"
                defaultValue={initial.email || ""}
                placeholder="info@xddonga.vn"
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="company.address">Địa chỉ</Label>
            <Textarea
              id="company.address"
              name="company.address"
              rows={2}
              defaultValue={initial.address || ""}
              className="mt-2"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="company.zaloUrl">Link Zalo</Label>
              <Input
                id="company.zaloUrl"
                name="company.zaloUrl"
                defaultValue={initial.zaloUrl || ""}
                placeholder="https://zalo.me/..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="company.facebookUrl">Link Facebook</Label>
              <Input
                id="company.facebookUrl"
                name="company.facebookUrl"
                defaultValue={initial.facebookUrl || ""}
                placeholder="https://facebook.com/..."
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-8">
        <h2 className="font-display text-xl uppercase text-navy-900">SEO mặc định</h2>
        <div className="mt-6 space-y-6">
          <div>
            <Label htmlFor="seo.defaultTitle">Tiêu đề mặc định</Label>
            <Input
              id="seo.defaultTitle"
              name="seo.defaultTitle"
              defaultValue={initial.seoTitle || ""}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="seo.defaultDescription">Mô tả mặc định</Label>
            <Textarea
              id="seo.defaultDescription"
              name="seo.defaultDescription"
              rows={3}
              defaultValue={initial.seoDescription || ""}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-8">
        <Button type="submit" size="lg">Lưu cài đặt</Button>
      </div>
    </form>
  );
}