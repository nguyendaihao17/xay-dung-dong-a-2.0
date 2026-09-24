import { FormShell } from "@/components/admin/form-shell";
import { CareerForm } from "@/components/admin/career-form";
import { createCareerAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default function NewCareerPage() {
  return (
    <FormShell title="Thêm vị trí tuyển dụng">
      <CareerForm action={createCareerAction} submitLabel="Tạo vị trí" />
    </FormShell>
  );
}