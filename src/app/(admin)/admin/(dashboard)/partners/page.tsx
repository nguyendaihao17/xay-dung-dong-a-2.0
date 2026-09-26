import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { prisma } from "@/lib/db";
import { deletePartnerAction } from "@/lib/partner-actions";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  let partners: Awaited<ReturnType<typeof prisma.partner.findMany>> = [];
  let errorMsg = "";

  try {
    partners = await prisma.partner.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch (e) {
    errorMsg = e instanceof Error ? e.message : "Lỗi không xác định";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-navy-900">
                Đối tác
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Quản lý logo đối tác hiển thị trên website · <span className="font-semibold text-navy-900">{partners.length} đối tác</span>
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-navy-900/20 transition-all hover:bg-navy-800 hover:shadow-xl hover:shadow-navy-900/30 active:scale-95"
        >
          <Plus size={16} />
          Thêm đối tác
        </Link>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong>Lỗi DB:</strong> {errorMsg}
        </div>
      )}

      {/* Empty state */}
      {!errorMsg && partners.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold text-navy-900">
            Chưa có đối tác nào
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">
            Thêm logo đối tác đầu tiên để hiển thị trên trang chủ website.
          </p>
          <Link
            href="/admin/partners/new"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-navy-900/20 transition-all hover:bg-navy-800 active:scale-95"
          >
            <Plus size={16} />
            Thêm đối tác đầu tiên
          </Link>
        </div>
      )}

      {/* Grid card list */}
      {partners.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-xl"
            >
              {/* Status badge */}
              <div className="absolute right-3 top-3 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    p.isActive
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-neutral-100 text-neutral-500 ring-1 ring-neutral-200"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      p.isActive ? "bg-emerald-500" : "bg-neutral-400"
                    }`}
                  />
                  {p.isActive ? "Đang hiện" : "Đã ẩn"}
                </span>
              </div>

              {/* Logo area */}
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
                {p.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.logoUrl}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="text-xs text-neutral-400">Chưa có logo</div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col border-t border-neutral-100 p-4">
                <h3 className="line-clamp-1 font-display text-base font-semibold text-navy-900">
                  {p.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                  {p.websiteUrl ? (
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 truncate text-accent hover:underline"
                    >
                      <span className="truncate">{p.websiteUrl.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-neutral-400">Chưa có website</span>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400">
                  <GripVertical size={11} />
                  Thứ tự: <span className="font-semibold text-neutral-600">{p.order}</span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2 border-t border-neutral-100 pt-3">
                  <Link
                    href={`/admin/partners/${p.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
                  >
                    <Pencil size={13} />
                    Sửa
                  </Link>
                  <form
                    action={deletePartnerAction.bind(null, p.id)}
                    className="flex-1"
                  >
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={13} />
                      Xóa
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}