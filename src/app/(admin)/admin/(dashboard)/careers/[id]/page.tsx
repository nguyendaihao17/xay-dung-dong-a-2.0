import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { FormShell } from "@/components/admin/form-shell";
import { CareerForm } from "@/components/admin/career-form";
import { updateCareerAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const career = await prisma.career.findUnique({ where: { id } });
  if (!career) notFound();

  const boundAction = updateCareerAction.bind(null, id);

  return (
    <FormShell title="Sửa vị trí" description={career.title}>
      <CareerForm action={boundAction} initial={career} submitLabel="Cập nhật" />
    </FormShell>
  );
}