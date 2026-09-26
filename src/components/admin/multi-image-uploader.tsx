"use client";

import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { addImageToAlbumAction } from "@/lib/album-actions";

export function MultiImageUploader({ albumId }: { albumId: string }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    setProgress({ done: 0, total: files.length });

    let done = 0;
    for (const file of Array.from(files)) {
      try {
        // 1. Upload lên Cloudinary qua /api/upload
        const form = new FormData();
        form.append("file", file);
        const upRes = await fetch("/api/upload", { method: "POST", body: form });

        if (!upRes.ok) {
          const data = await upRes.json().catch(() => ({}));
          throw new Error(data.error || `Upload ${file.name} thất bại`);
        }

        // API trả về { ok: true, media: { url, ... } }
        const data = await upRes.json();
        const url: string | undefined = data?.media?.url;

        if (!url) {
          throw new Error(`Upload ${file.name} không trả về URL`);
        }

        // 2. Thêm vào album
        const albumForm = new FormData();
        albumForm.append("mediaUrl", url);
        await addImageToAlbumAction(albumId, albumForm);

        done++;
        setProgress({ done, total: files.length });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
      }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    if (done > 0) setTimeout(() => window.location.reload(), 500);
  }

  return (
    <div className="border-2 border-dashed border-neutral-300 bg-neutral-50 p-6">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button" suppressHydrationWarning
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex w-full flex-col items-center gap-3 py-6 text-center transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 size={32} className="animate-spin text-navy-900" />
            <span className="text-sm font-medium text-navy-900">
              Đang upload {progress.done}/{progress.total} ảnh...
            </span>
          </>
        ) : (
          <>
            <Upload size={32} className="text-navy-900" />
            <span className="text-sm font-medium text-navy-900">
              Nhấn để chọn nhiều ảnh
            </span>
            <span className="text-xs text-neutral-500">
              Hỗ trợ JPG, PNG, WebP · Chọn được nhiều file 1 lúc
            </span>
          </>
        )}
      </button>
      {error && (
        <div className="mt-3 border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}