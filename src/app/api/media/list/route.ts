import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { mediaRepository } from "@/lib/repositories/media.repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAuth();
    const items = await mediaRepository.list({ limit: 200 });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });
  }
}