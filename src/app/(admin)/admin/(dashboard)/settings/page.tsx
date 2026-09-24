import { PageToolbar } from "@/components/admin/page-toolbar";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/settings";
import { updateSettingsAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const { saved } = await searchParams;

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar title="Cài đặt website" description="Thông tin công ty và SEO mặc định" />

      {saved === "1" && (
        <div className="mb-6 max-w-3xl border border-accent-green bg-accent-green/5 p-4 text-sm text-accent-green">
          Đã lưu cài đặt thành công.
        </div>
      )}

      <SettingsForm
        action={updateSettingsAction}
        initial={{
          companyName: settings.companyName,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          zaloUrl: settings.zaloUrl,
          facebookUrl: settings.facebookUrl,
          logoUrl: settings.logoUrl,
          seoTitle: settings.seoTitle,
          seoDescription: settings.seoDescription,
        }}
      />
    </div>
  );
}