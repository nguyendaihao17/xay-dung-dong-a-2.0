import Link from "next/link";
import { Plus, Pencil, Trash2, Images } from "lucide-react";
import { prisma } from "@/lib/db";
import { deleteAlbumAction } from "@/lib/album-actions";

export const dynamic = "force-dynamic";

export default async function AdminAlbumsPage() {
  let albums: any[] = [];
  let errorMsg = "";

  try {
    albums = await prisma.album.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        coverImage: { select: { url: true } },
        _count: { select: { items: true } },
      },
    });
  } catch (e) {
    errorMsg = e instanceof Error ? e.message : "Lỗi không xác định";
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase text-navy-900">Thư viện ảnh</h1>
          <p className="mt-1 text-sm text-neutral-500">{albums.length} album ảnh</p>
        </div>
        <Link href="/admin/albums/new" className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-800">
          <Plus size={16} /> Thêm album
        </Link>
      </div>

      {errorMsg && (
        <div className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <strong>Lỗi DB:</strong> {errorMsg}
        </div>
      )}

      {albums.length === 0 && !errorMsg && (
        <div className="border border-dashed border-neutral-300 bg-white p-16 text-center">
          <Images size={48} className="mx-auto text-neutral-300" />
          <p className="mt-4 text-neutral-500">Chưa có album nào.</p>
          <Link href="/admin/albums/new" className="mt-4 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-800">
            <Plus size={16} /> Tạo album đầu tiên
          </Link>
        </div>
      )}

      {albums.length > 0 && (
        <div className="overflow-hidden border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Ảnh đại diện</th>
                <th className="px-6 py-4 font-medium">Tên album</th>
                <th className="px-6 py-4 font-medium">Số ảnh</th>
                <th className="px-6 py-4 font-medium">Thứ tự</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 text-right font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {albums.map((a) => (
                <tr key={a.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    {a.coverImage?.url ? (
                      <img src={a.coverImage.url} alt={a.title} className="h-12 w-20 object-cover" />
                    ) : (
                      <div className="flex h-12 w-20 items-center justify-center bg-neutral-100 text-xs text-neutral-400">Chưa có</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-navy-900">{a.title}</td>
                  <td className="px-6 py-4 text-neutral-600">{a._count.items} ảnh</td>
                  <td className="px-6 py-4 text-neutral-600">{a.sortOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${a.published ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${a.published ? "bg-emerald-500" : "bg-neutral-400"}`} />
                      {a.published ? "Đang hiện" : "Đã ẩn"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/albums/${a.id}`} className="flex h-9 w-9 items-center justify-center text-navy-900 hover:bg-navy-50" title="Sửa">
                        <Pencil size={16} />
                      </Link>
                      <form action={deleteAlbumAction.bind(null, a.id)}>
                        <button type="submit" className="flex h-9 w-9 items-center justify-center text-red-600 hover:bg-red-50" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}