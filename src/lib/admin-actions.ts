"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugifyVietnamese } from "@/lib/utils";

// ─── PROJECTS ───────────────────────────────────────────────
export async function createProjectAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);

  await prisma.project.create({
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "") || null,
      location: String(formData.get("location") || "") || null,
      client: String(formData.get("client") || "") || null,
      year: formData.get("year") ? Number(formData.get("year")) : null,
      scope: String(formData.get("scope") || "") || null,
      status: (String(formData.get("status") || "COMPLETED") as never),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/du-an");
  redirect("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "") || null,
      location: String(formData.get("location") || "") || null,
      client: String(formData.get("client") || "") || null,
      year: formData.get("year") ? Number(formData.get("year")) : null,
      scope: String(formData.get("scope") || "") || null,
      status: (String(formData.get("status") || "COMPLETED") as never),
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/du-an");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  await requireRole("ADMIN");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/du-an");
}

// ─── ARTICLES ───────────────────────────────────────────────
export async function createArticleAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);
  const published = formData.get("published") === "on";

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: String(formData.get("excerpt") || "") || null,
      published,
      publishedAt: published ? new Date() : null,
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  redirect("/admin/articles");
}

export async function updateArticleAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);
  const published = formData.get("published") === "on";

  const existing = await prisma.article.findUnique({ where: { id } });
  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: String(formData.get("excerpt") || "") || null,
      published,
      publishedAt: published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string) {
  await requireRole("ADMIN");
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/tin-tuc");
}

// ─── SERVICES ───────────────────────────────────────────────
export async function createServiceAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);

  await prisma.service.create({
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "") || null,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  redirect("/admin/services");
}

export async function updateServiceAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);

  await prisma.service.update({
    where: { id },
    data: {
      title,
      slug,
      shortDescription: String(formData.get("shortDescription") || "") || null,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string) {
  await requireRole("ADMIN");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/dich-vu");
}

// ─── CAREERS ────────────────────────────────────────────────
export async function createCareerAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);

  await prisma.career.create({
    data: {
      title,
      slug,
      department: String(formData.get("department") || "") || null,
      location: String(formData.get("location") || "") || null,
      salaryRange: String(formData.get("salaryRange") || "") || null,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
  redirect("/admin/careers");
}

export async function updateCareerAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "") || slugifyVietnamese(title);

  await prisma.career.update({
    where: { id },
    data: {
      title,
      slug,
      department: String(formData.get("department") || "") || null,
      location: String(formData.get("location") || "") || null,
      salaryRange: String(formData.get("salaryRange") || "") || null,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
  redirect("/admin/careers");
}

export async function deleteCareerAction(id: string) {
  await requireRole("ADMIN");
  await prisma.career.delete({ where: { id } });
  revalidatePath("/admin/careers");
  revalidatePath("/tuyen-dung");
}

// ─── LEADS ──────────────────────────────────────────────────
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