import { prisma } from "@/lib/db";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/field";
import { updateSettingsAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

async function getSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  for (const r of rows) {
    map[r.key] = typeof r.value === "string" ? r.value : JSON.stringify(r.value);
  }
  return map;
}

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSettings();
  const { saved } = await searchParams;

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar title="Cài đặt website" description="Thông tin công ty và SEO mặc định" />

      {saved === "1" && (
        <div className="mb-6 max-w-3xl border border-accent-green bg-accent-green/5 p-4 text-sm text-accent-green">
          Đã lưu cài đặt thành công.
        </div>
      )}

      <form action={updateSettingsAction} className="max-w-3xl space-y-8 border border-neutral-200 bg-white p-8">
        <div>
          <h2 className="font-display text-xl uppercase text-navy-900">Thông tin công ty</h2>
          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="company.name">Tên công ty</Label>
              <Input
                id="company.name"
                name="company.name"
                defaultValue={settings["company.name"] || "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á"}
                className="mt-2"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="company.phone">Điện thoại</Label>
                <Input
                  id="company.phone"
                  name="company.phone"
                  defaultValue={settings["company.phone"] || ""}
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
                  defaultValue={settings["company.email"] || ""}
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
                defaultValue={settings["company.address"] || ""}
                className="mt-2"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="company.zaloUrl">Link Zalo</Label>
                <Input
                  id="company.zaloUrl"
                  name="company.zaloUrl"
                  defaultValue={settings["company.zaloUrl"] || ""}
                  placeholder="https://zalo.me/..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="company.facebookUrl">Link Facebook</Label>
                <Input
                  id="company.facebookUrl"
                  name="company.facebookUrl"
                  defaultValue={settings["company.facebookUrl"] || ""}
                  placeholder="https://facebook.com/..."
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company.logoUrl">URL logo (ảnh trong Thư viện)</Label>
              <Input
                id="company.logoUrl"
                name="company.logoUrl"
                defaultValue={settings["company.logoUrl"] || ""}
                className="mt-2"
              />
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
                defaultValue={settings["seo.defaultTitle"] || "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á"}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="seo.defaultDescription">Mô tả mặc định</Label>
              <Textarea
                id="seo.defaultDescription"
                name="seo.defaultDescription"
                rows={3}
                defaultValue={settings["seo.defaultDescription"] || "Tư vấn • Thiết kế • Giám sát • Thi công xây dựng"}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <Button type="submit" size="lg">Lưu cài đặt</Button>
        </div>
      </form>
    </div>
  );
}