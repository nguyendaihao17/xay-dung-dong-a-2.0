"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash, compare } from "bcryptjs";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// ===== ĐỔI MẬT KHẨU (user tự đổi) =====
const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Vui lòng nhập mật khẩu cũ"),
    newPassword: z.string().min(8, "Mật khẩu mới tối thiểu 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type PasswordState = {
  ok?: boolean;
  error?: string;
};

export async function changePasswordAction(
  _prev: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const parsed = changePasswordSchema.safeParse({
    oldPassword: String(formData.get("oldPassword") || ""),
    newPassword: String(formData.get("newPassword") || ""),
    confirmPassword: String(formData.get("confirmPassword") || ""),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, passwordHash: true },
  });

  if (!user || !user.passwordHash) {
    return { error: "Không tìm thấy tài khoản" };
  }

  const ok = await compare(parsed.data.oldPassword, user.passwordHash);
  if (!ok) {
    return { error: "Mật khẩu cũ không đúng" };
  }

  const passwordHash = await hash(parsed.data.newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  revalidatePath("/admin/thanh-vien");
  return { ok: true };
}