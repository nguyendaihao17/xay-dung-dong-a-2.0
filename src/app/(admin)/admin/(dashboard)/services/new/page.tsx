import { FormShell } from "@/components/admin/form-shell";
import { ServiceForm } from "@/components/admin/service-form";
import { createServiceAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <FormShell title="Thêm dịch vụ">
      <ServiceForm action={createServiceAction} submitLabel="Tạo dịch vụ" />
    </FormShell>
  );
}