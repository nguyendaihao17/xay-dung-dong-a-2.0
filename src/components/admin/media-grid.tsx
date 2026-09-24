"use client";

import { useState } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import type { MediaItem } from "@/lib/repositories/media.repository";

export function MediaGrid({ items: initialItems }: { items: MediaItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, fileName: string) {
    if (!confirm(`Xóa ảnh "${fileName}"? Hành động này không thể hoàn tác.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa thất bại");
      setItems((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Có lỗi xảy ra");
    } finally {
      setDeleting(null);
    }
  }

  async function handleCopy(url: string, id: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  }

  if (items.length === 0) {
    return (
      <div className="border border-dashed border-neutral-300 bg-white p-12 text-center">
        <p className="text-sm text-neutral-500">
          Chưa có ảnh nào. Dùng ô phía trên để tải ảnh lên.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((m) => (
        <div key={m.id} className="group relative border border-neutral-200 bg-white">
          <div className="relative aspect-square overflow-hidden bg-neutral-100">
            {m.mimeType.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.url}
                alt={m.alt || m.fileName}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                {m.mimeType}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-navy-950/70 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => handleCopy(m.url, m.id)}
                className="flex h-9 w-9 items-center justify-center bg-white text-navy-900 hover:bg-neutral-100"
                title="Copy URL"
              >
                {copied === m.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                type="button"
                disabled={deleting === m.id}
                onClick={() => handleDelete(m.id, m.fileName)}
                className="flex h-9 w-9 items-center justify-center bg-white text-accent-red hover:bg-neutral-100 disabled:opacity-50"
                title="Xóa"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="truncate text-xs font-medium text-navy-900">{m.fileName}</div>
            <div className="mt-0.5 text-[10px] text-neutral-500">
              {m.width && m.height ? `${m.width}×${m.height} · ` : ""}
              {Math.round(m.size / 1024)} KB
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}