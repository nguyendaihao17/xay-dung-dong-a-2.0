import { mediaRepository } from "@/lib/repositories/media.repository";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { MediaGrid } from "@/components/admin/media-grid";
import { UploadButton } from "@/components/admin/upload-button";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const items = await mediaRepository.list({ limit: 200 });

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar
        title="Thư viện ảnh"
        description={`${items.length} ảnh đã tải lên`}
        extra={<UploadButton />}
      />

      <MediaGrid items={items} />
    </div>
  );
}