import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PartnerForm } from "@/components/admin/partner-form";
import { updatePartnerAction } from "@/lib/partner-actions";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const action = updatePartnerAction.bind(null, partner.id);

  return (
    <div className="p-6 lg:p-10">
      <Link
        href="/admin/partners"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-navy-900"
      >
        <ArrowLeft size={14} />
        Quay lại
      </Link>

      <h1 className="font-display text-2xl font-bold uppercase text-navy-900">
        Sửa đối tác
      </h1>

      <div className="mt-8 max-w-2xl">
        <PartnerForm
          action={action}
          submitLabel="Lưu thay đổi"
          initial={{
            name: partner.name,
            logoUrl: partner.logoUrl,
            websiteUrl: partner.websiteUrl,
            order: partner.order,
            isActive: partner.isActive,
          }}
        />
      </div>
    </div>
  );
}