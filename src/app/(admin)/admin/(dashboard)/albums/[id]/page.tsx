import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { AlbumForm } from "@/components/admin/album-form";
import { MultiImageUploader } from "@/components/admin/multi-image-uploader";
import {
  updateAlbumAction,
  removeImageFromAlbumAction,
} from "@/lib/album-actions";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditAlbumPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const album = await prisma.album.findUnique({
    where: { id },
    include: {
      coverImage: { select: { url: true } },
      items: {
        orderBy: { sortOrder: "asc" },
        include: { media: true },
      },
    },
  });

  if (!album) notFound();

  const action = updateAlbumAction.bind(null, album.id);

  return (
    <div className="p-6 lg:p-10">
      <Link
        href="/admin/albums"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-navy-900"
      >
        <ArrowLeft size={14} />
        Quay lại
      </Link>

      <h1 className="font-display text-2xl font-bold uppercase text-navy-900">
        Sửa album
      </h1>

      {saved === "1" && (
        <div className="mt-6 max-w-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Đã lưu album thành công.
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-display text-lg font-bold uppercase text-navy-900">
            Thông tin album
          </h2>
          <AlbumForm
            action={action}
            submitLabel="Lưu thay đổi"
            initial={{
              title: album.title,
              slug: album.slug,
              description: album.description,
              coverImage: album.coverImage?.url ?? null,
              published: album.published,
              order: album.sortOrder,
            }}
          />
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg font-bold uppercase text-navy-900">
            Ảnh trong album ({album.items.length})
          </h2>

          <MultiImageUploader albumId={album.id} />

          {album.items.length > 0 ? (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {album.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.media.url}
                    alt={item.caption || album.title}
                    className="h-full w-full object-cover"
                  />
                  <form
                    action={removeImageFromAlbumAction.bind(null, album.id, item.id)}
                    className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <button
                      type="submit" suppressHydrationWarning
                      className="flex h-8 w-8 items-center justify-center bg-red-600 text-white shadow-lg hover:bg-red-700"
                      title="Xóa ảnh khỏi album"
                    >
                      <Trash2 size={14} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-neutral-500">
              Chưa có ảnh nào. Upload ảnh ở trên để thêm vào album.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}