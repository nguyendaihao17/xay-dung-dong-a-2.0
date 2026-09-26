"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxImage = {
  id: string;
  url: string;
  caption?: string | null;
};

export function AlbumLightbox({ images }: { images: LightboxImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(() => {
    setIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (index === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, next, prev]);

  if (images.length === 0) return null;

  // Lấy ảnh hiện tại — an toàn với TypeScript
  const current = index !== null ? images[index] : null;

  return (
    <>
      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100 transition-all hover:border-navy-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || `Ảnh ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/20" />
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {index !== null && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white"
            aria-label="Đóng"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 flex h-14 w-14 items-center justify-center bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.caption || ""}
              className="max-h-[85vh] max-w-full object-contain"
            />
            {current.caption && (
              <p className="mt-4 text-center text-sm text-white/70">
                {current.caption}
              </p>
            )}
            <p className="mt-2 text-center text-xs text-white/50">
              {index + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 flex h-14 w-14 items-center justify-center bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Ảnh sau"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </>
  );
}