import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AlbumForm } from "@/components/admin/album-form";
import { createAlbumAction } from "@/lib/album-actions";

export default function NewAlbumPage() {
  return (
    <div className="p-6 lg:p-10">
      <Link href="/admin/albums" className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-navy-900">
        <ArrowLeft size={14} /> Quay lại
      </Link>
      <h1 className="font-display text-2xl font-bold uppercase text-navy-900">Thêm album mới</h1>
      <div className="mt-8 max-w-2xl">
        <AlbumForm action={createAlbumAction} submitLabel="Tạo album" />
      </div>
    </div>
  );
}