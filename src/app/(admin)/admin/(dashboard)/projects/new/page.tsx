import { FormShell } from "@/components/admin/form-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { createProjectAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <FormShell title="Thêm dự án" description="Tạo dự án mới">
      <ProjectForm action={createProjectAction} submitLabel="Tạo dự án" />
    </FormShell>
  );
}