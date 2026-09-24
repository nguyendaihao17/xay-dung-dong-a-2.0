import { prisma } from "@/lib/db";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar
        title="Thư viện"
        description="Hình ảnh và tệp đã tải lên"
      />

      <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
        <p className="text-sm text-neutral-500">
          Chức năng upload sẽ hoàn thiện ở Phase 8. Hiện tại có {media.length} tệp trong thư viện.
        </p>
      </div>

      {media.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((m) => (
            <div key={m.id} className="border border-neutral-200 bg-white">
              <div className="aspect-square bg-neutral-100">
                {m.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.alt || m.fileName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-400 text-xs">
                    {m.mimeType}
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="truncate text-xs font-medium text-navy-900">{m.fileName}</div>
                <div className="mt-1 text-xs text-neutral-500">{formatDate(m.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}