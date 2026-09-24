import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: Request) {
  try {
    await requireRole("ADMIN", "EDITOR");

    const form = await req.formData();
    const file = form.get("file") as File | null;
    const alt = (form.get("alt") as string) || null;
    const folder = (form.get("folder") as string) || undefined;

    if (!file) {
      return NextResponse.json({ error: "Không có tệp nào được gửi" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Tệp quá lớn (tối đa 10MB)" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Định dạng không hỗ trợ (chỉ JPG, PNG, WebP, GIF, SVG)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, { folder, filename: file.name });

    const type = result.resource_type === "video" ? "VIDEO" : "IMAGE";

    const media = await prisma.media.create({
      data: {
        type,
        url: result.secure_url,
        storageKey: result.public_id,
        fileName: file.name,
        mimeType: file.type,
        size: result.bytes,
        width: result.width,
        height: result.height,
        alt,
        folder: "/",
      },
    });

    return NextResponse.json({ ok: true, media });
  } catch (err) {
    console.error("[upload]", err);
    const message = err instanceof Error ? err.message : "Upload thất bại";
    if (message === "UNAUTHORIZED" || message === "FORBIDDEN") {
      return NextResponse.json({ error: "Không có quyền" }, { status: 403 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}