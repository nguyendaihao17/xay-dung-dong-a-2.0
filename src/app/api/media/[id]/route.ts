import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

    if (media.storageKey) {
      try {
        await deleteFromCloudinary(media.storageKey, media.type === "VIDEO" ? "video" : "image");
      } catch (e) {
        console.warn("[cloudinary delete]", e);
      }
    }

    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[media delete]", err);
    const message = err instanceof Error ? err.message : "Xóa thất bại";
    if (message === "UNAUTHORIZED" || message === "FORBIDDEN") {
      return NextResponse.json({ error: "Không có quyền" }, { status: 403 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}