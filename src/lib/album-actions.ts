"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugifyVietnamese } from "@/lib/utils";

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const clean = base.trim() || "album";
  let candidate = clean;
  let n = 1;

  while (true) {
    const existing = await prisma.album.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });
    if (!existing) return candidate;
    n++;
    candidate = `${clean}-${n}`;
  }
}

async function mediaIdByUrl(url: string | null | undefined): Promise<string | null> {
  if (!url || !url.trim()) return null;
  const media = await prisma.media.findFirst({ where: { url } });
  return media?.id ?? null;
}

// ===== ALBUM =====
export async function createAlbumAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Tên album là bắt buộc");

  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title));
  const coverImageId = await mediaIdByUrl(String(formData.get("coverImageUrl") || ""));

  const album = await prisma.album.create({
    data: {
      title,
      slug,
      description: String(formData.get("description") || "").trim() || null,
      coverImageId,
      published: formData.get("published") !== "off",
      sortOrder: Number(formData.get("order") || 0),
    },
  });

  revalidatePath("/admin/albums");
  revalidatePath("/thu-vien");
  redirect(`/admin/albums/${album.id}`);
}

export async function updateAlbumAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), id);
  const coverImageId = await mediaIdByUrl(String(formData.get("coverImageUrl") || ""));

  await prisma.album.update({
    where: { id },
    data: {
      title,
      slug,
      description: String(formData.get("description") || "").trim() || null,
      coverImageId,
      published: formData.get("published") !== "off",
      sortOrder: Number(formData.get("order") || 0),
    },
  });

  revalidatePath("/admin/albums");
  revalidatePath(`/admin/albums/${id}`);
  revalidatePath("/thu-vien");
  revalidatePath(`/thu-vien/${slug}`);
  redirect(`/admin/albums/${id}?saved=1`);
}

export async function deleteAlbumAction(id: string) {
  await requireRole("ADMIN");
  await prisma.album.delete({ where: { id } });
  revalidatePath("/admin/albums");
  revalidatePath("/thu-vien");
  redirect("/admin/albums");
}

// ===== ALBUM ITEMS =====
export async function addImageToAlbumAction(albumId: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const mediaUrl = String(formData.get("mediaUrl") || "").trim();
  if (!mediaUrl) return;

  const media = await prisma.media.findFirst({ where: { url: mediaUrl } });
  if (!media) throw new Error("Không tìm thấy media");

  // Kiểm tra đã có trong album chưa
  const existing = await prisma.albumItem.findUnique({
    where: { albumId_mediaId: { albumId, mediaId: media.id } },
  });
  if (existing) return;

  const count = await prisma.albumItem.count({ where: { albumId } });

  await prisma.albumItem.create({
    data: {
      albumId,
      mediaId: media.id,
      sortOrder: count,
    },
  });

  revalidatePath(`/admin/albums/${albumId}`);
  revalidatePath("/thu-vien");
}

export async function removeImageFromAlbumAction(albumId: string, itemId: string) {
  await requireRole("ADMIN", "EDITOR");
  await prisma.albumItem.delete({ where: { id: itemId } });
  revalidatePath(`/admin/albums/${albumId}`);
  revalidatePath("/thu-vien");
}