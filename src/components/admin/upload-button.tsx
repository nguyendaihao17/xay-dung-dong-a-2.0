"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";

export function UploadButton({ onUploaded }: { onUploaded?: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const router = useRouter();

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    const total = files.length;
    let success = 0;
    let failed = 0;

    for (let i = 0; i < total; i++) {
      const file = files[i];
      if (!file) continue;
      setProgress(`Đang tải ${i + 1}/${total}: ${file.name}`);

      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Upload thất bại");
        }
        success++;
      } catch (e) {
        console.error(e);
        failed++;
      }
    }

    setUploading(false);
    setProgress("");
    if (inputRef.current) inputRef.current.value = "";

    if (failed > 0) {
      alert(`Đã tải ${success}/${total} ảnh. ${failed} ảnh bị lỗi.`);
    }
    router.refresh();
    onUploaded?.();
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-white hover:bg-navy-800 disabled:opacity-50"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? progress || "Đang tải..." : "Tải ảnh lên"}
      </button>
    </>
  );
}