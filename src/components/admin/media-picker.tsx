"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Image as ImageIcon, X, Check, Loader2, Upload } from "lucide-react";

type MediaItem = {
  id: string;
  url: string;
  fileName: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type Props = {
  name: string;
  initialUrl?: string;
  label?: string;
};

export function MediaPicker({ name, initialUrl, label = "Ảnh" }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string>(initialUrl || "");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media/list");
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Upload thất bại");
        }
      }
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-600">
        {label}
      </div>
      <input type="hidden" name={name} value={selected} />

      {selected ? (
        <div className="relative border border-neutral-300 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={selected} alt="Selected" className="h-48 w-full object-cover" />
          <div className="flex items-center justify-between border-t border-neutral-200 p-3">
            <span className="truncate text-xs text-neutral-500">{selected}</span>
            <div className="flex gap-2">
              <button
                type="button" suppressHydrationWarning
                onClick={() => setOpen(true)}
                className="text-xs text-navy-900 underline"
              >
                Đổi
              </button>
              <button
                type="button" suppressHydrationWarning
                onClick={() => setSelected("")}
                className="text-xs text-accent-red underline"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button" suppressHydrationWarning
          onClick={() => setOpen(true)}
          className="flex h-32 w-full items-center justify-center gap-2 border border-dashed border-neutral-300 bg-neutral-50 text-sm text-neutral-500 hover:border-navy-900 hover:text-navy-900"
        >
          <ImageIcon size={18} />
          Chọn ảnh
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4">
          <div className="flex max-h-[85vh] w-full max-w-4xl flex-col bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 p-4">
              <h3 className="font-display text-lg uppercase text-navy-900">Chọn ảnh</h3>
              <div className="flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files)}
                />
                <button
                  type="button" suppressHydrationWarning
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 bg-navy-900 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white hover:bg-navy-800 disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploading ? "Đang tải..." : "Tải ảnh mới"}
                </button>
                <button type="button" suppressHydrationWarning onClick={() => setOpen(false)} className="text-neutral-500">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 size={28} className="animate-spin text-navy-900" />
                </div>
              ) : items.length === 0 ? (
                <div className="py-20 text-center text-sm text-neutral-500">
                  Chưa có ảnh. Nhấn "Tải ảnh mới" ở trên để thêm.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                  {items.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelected(m.url);
                        setOpen(false);
                      }}
                      className={`group relative aspect-square overflow-hidden border-2 ${
                        selected === m.url ? "border-navy-900" : "border-transparent"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.url}
                        alt={m.fileName}
                        className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                        loading="lazy"
                      />
                      {selected === m.url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-navy-950/50">
                          <Check size={24} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-neutral-200 p-4 text-right">
              <button
                type="button" suppressHydrationWarning
                onClick={() => setOpen(false)}
                className="bg-neutral-200 px-5 py-2 text-sm font-medium uppercase tracking-wider text-navy-900 hover:bg-neutral-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}