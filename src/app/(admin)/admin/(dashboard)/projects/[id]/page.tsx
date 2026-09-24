import { notFound } from "next/navigation";
import { FormShell } from "@/components/admin/form-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { prisma } from "@/lib/db";
import { updateProjectAction } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { coverImage: true },
  });
  if (!project) notFound();

  const boundAction = updateProjectAction.bind(null, id);

  return (
    <FormShell title="Sửa dự án" description={project.title}>
      <ProjectForm
        action={boundAction}
        initial={{ ...project, coverImage: project.coverImage ? { url: project.coverImage.url } : null }}
        submitLabel="Cập nhật"
      />
    </FormShell>
  );
}