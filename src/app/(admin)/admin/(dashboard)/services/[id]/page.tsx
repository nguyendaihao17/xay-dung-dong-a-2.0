import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { FormShell } from "@/components/admin/form-shell";
import { ServiceForm } from "@/components/admin/service-form";
import { updateServiceAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const boundAction = updateServiceAction.bind(null, id);

  return (
    <FormShell title="Sửa dịch vụ" description={service.title}>
      <ServiceForm action={boundAction} initial={service} submitLabel="Cập nhật" />
    </FormShell>
  );
}