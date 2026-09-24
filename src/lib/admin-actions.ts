"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugifyVietnamese } from "@/lib/utils";

// ─── Helpers ────────────────────────────────────────────────
async function uniqueSlug(
  base: string,
  model: "project" | "article" | "service" | "career",
  excludeId?: string
): Promise<string> {
  const clean = base.trim() || "untitled";
  let candidate = clean;
  let n = 1;

  while (true) {
    const where: Record<string, unknown> = { slug: candidate };
    if (excludeId) where.NOT = { id: excludeId };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (prisma as any)[model].findFirst({ where });
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

function htmlOrUndefined(v: FormDataEntryValue | null): { html: string } | undefined {
  const s = String(v || "").trim();
  return s ? { html: s } : undefined;
}

// ─── PROJECTS ────────────────────────────────────────────────
export async function createProjectAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "project");

  await prisma.project.create({
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "").trim() || null,
      location: String(formData.get("location") || "").trim() || null,
      client: String(formData.get("client") || "").trim() || null,
      year: formData.get("year") ? Number(formData.get("year")) : null,
      scope: String(formData.get("scope") || "").trim() || null,
      status: String(formData.get("status") || "COMPLETED") as never,
      coverImageId: await mediaIdByUrl(String(formData.get("coverImageUrl") || "")),
      content: htmlOrUndefined(formData.get("content")),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
      publishedAt: formData.get("published") === "on" ? new Date() : null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/du-an");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "project", id);

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "").trim() || null,
      location: String(formData.get("location") || "").trim() || null,
      client: String(formData.get("client") || "").trim() || null,
      year: formData.get("year") ? Number(formData.get("year")) : null,
      scope: String(formData.get("scope") || "").trim() || null,
      status: String(formData.get("status") || "COMPLETED") as never,
      coverImageId: await mediaIdByUrl(String(formData.get("coverImageUrl") || "")),
      content: htmlOrUndefined(formData.get("content")),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/du-an");
  revalidatePath(`/du-an/${slug}`);
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  await requireRole("ADMIN");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/du-an");
  revalidatePath("/");
}

// ─── ARTICLES ────────────────────────────────────────────────
export async function createArticleAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "article");
  const published = formData.get("published") === "on";

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: String(formData.get("excerpt") || "").trim() || null,
      content: htmlOrUndefined(formData.get("content")),
      coverImageId: await mediaIdByUrl(String(formData.get("coverImageUrl") || "")),
      published,
      publishedAt: published ? new Date() : null,
      featured: formData.get("featured") === "on",
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function updateArticleAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "article", id);
  const published = formData.get("published") === "on";

  const existing = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: String(formData.get("excerpt") || "").trim() || null,
      content: htmlOrUndefined(formData.get("content")),
      coverImageId: await mediaIdByUrl(String(formData.get("coverImageUrl") || "")),
      published,
      publishedAt: published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
      featured: formData.get("featured") === "on",
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${slug}`);
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string) {
  await requireRole("ADMIN");
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  revalidatePath("/");
}

// ─── SERVICES ────────────────────────────────────────────────
export async function createServiceAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "service");

  await prisma.service.create({
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "").trim() || null,
      content: htmlOrUndefined(formData.get("content")),
      coverImageId: await mediaIdByUrl(String(formData.get("coverImageUrl") || "")),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateServiceAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "service", id);

  await prisma.service.update({
    where: { id },
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "").trim() || null,
      content: htmlOrUndefined(formData.get("content")),
      coverImageId: await mediaIdByUrl(String(formData.get("coverImageUrl") || "")),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  revalidatePath(`/dich-vu/${slug}`);
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string) {
  await requireRole("ADMIN");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  revalidatePath("/");
}

// ─── CAREERS ─────────────────────────────────────────────────
export async function createCareerAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "career");

  await prisma.career.create({
    data: {
      title,
      slug,
      department: String(formData.get("department") || "").trim() || null,
      location: String(formData.get("location") || "").trim() || null,
      salaryRange: String(formData.get("salaryRange") || "").trim() || null,
      description: htmlOrUndefined(formData.get("description")),
      requirements: htmlOrUndefined(formData.get("requirements")),
      benefits: htmlOrUndefined(formData.get("benefits")),
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
  redirect("/admin/careers");
}

export async function updateCareerAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = await uniqueSlug(rawSlug || slugifyVietnamese(title), "career", id);

  await prisma.career.update({
    where: { id },
    data: {
      title,
      slug,
      department: String(formData.get("department") || "").trim() || null,
      location: String(formData.get("location") || "").trim() || null,
      salaryRange: String(formData.get("salaryRange") || "").trim() || null,
      description: htmlOrUndefined(formData.get("description")),
      requirements: htmlOrUndefined(formData.get("requirements")),
      benefits: htmlOrUndefined(formData.get("benefits")),
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
  revalidatePath(`/tuyen-dung/${slug}`);
  redirect("/admin/careers");
}

export async function deleteCareerAction(id: string) {
  await requireRole("ADMIN");
  await prisma.career.delete({ where: { id } });
  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
}

// ─── LEADS ───────────────────────────────────────────────────
export async function updateLeadStatusAction(id: string, status: string) {
  await requireRole("ADMIN", "EDITOR");
  await prisma.contactLead.update({
    where: { id },
    data: { status: status as never },
  });
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(id: string) {
  await requireRole("ADMIN");
  await prisma.contactLead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

// ─── SETTINGS ────────────────────────────────────────────────
export async function updateSettingsAction(formData: FormData) {
  await requireRole("ADMIN");

  const keys = [
    "company.name",
    "company.phone",
    "company.email",
    "company.address",
    "company.zaloUrl",
    "company.facebookUrl",
    "company.logoUrl",
    "seo.defaultTitle",
    "seo.defaultDescription",
  ];

  for (const key of keys) {
    const value = formData.get(key);
    if (value === null) continue;
    const stringValue = String(value).trim();
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: stringValue },
      create: { key, value: stringValue, group: key.split(".")[0] || "general" },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}