"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createPartnerAction(formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Tên đối tác là bắt buộc");

  await prisma.partner.create({
    data: {
      name,
      logoUrl: String(formData.get("logoUrl") || "").trim() || null,
      websiteUrl: String(formData.get("websiteUrl") || "").trim() || null,
      order: Number(formData.get("order") || 0),
      isActive: formData.get("isActive") !== "off",
    },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners");
}

export async function updatePartnerAction(id: string, formData: FormData) {
  await requireRole("ADMIN", "EDITOR");
  const name = String(formData.get("name") || "").trim();

  await prisma.partner.update({
    where: { id },
    data: {
      name,
      logoUrl: String(formData.get("logoUrl") || "").trim() || null,
      websiteUrl: String(formData.get("websiteUrl") || "").trim() || null,
      order: Number(formData.get("order") || 0),
      isActive: formData.get("isActive") !== "off",
    },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners");
}

export async function deletePartnerAction(id: string) {
  await requireRole("ADMIN");
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}