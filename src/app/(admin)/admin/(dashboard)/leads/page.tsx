import { leadRepository } from "@/lib/repositories/lead.repository";
import { PageToolbar } from "@/components/admin/page-toolbar";
import { AdminTable, AdminTableHead, AdminTh, AdminTd, AdminTr } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteLeadAction, updateLeadStatusAction } from "@/lib/admin-actions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  NEW: "Mới",
  IN_PROGRESS: "Đang xử lý",
  CONTACTED: "Đã liên hệ",
  WON: "Thành công",
  LOST: "Mất",
  SPAM: "Spam",
};

export default async function AdminLeadsPage() {
  const leads = await leadRepository.list({ limit: 100 });

  return (
    <div className="p-6 lg:p-10">
      <PageToolbar title="Liên hệ" description="Yêu cầu từ khách hàng" />

      <AdminTable>
        <AdminTableHead>
          <AdminTh>Khách hàng</AdminTh>
          <AdminTh>Điện thoại</AdminTh>
          <AdminTh>Nội dung</AdminTh>
          <AdminTh>Ngày</AdminTh>
          <AdminTh>Trạng thái</AdminTh>
          <AdminTh className="text-right">Xóa</AdminTh>
        </AdminTableHead>
        <tbody>
          {leads.length === 0 ? (
            <AdminTr>
              <AdminTd className="text-neutral-500">Chưa có liên hệ nào.</AdminTd>
              <AdminTd /><AdminTd /><AdminTd /><AdminTd /><AdminTd />
            </AdminTr>
          ) : (
            leads.map((lead) => (
              <AdminTr key={lead.id}>
                <AdminTd>
                  <div className="font-medium text-navy-900">{lead.fullName}</div>
                  <div className="text-xs text-neutral-500">{lead.email || "—"}</div>
                </AdminTd>
                <AdminTd className="text-neutral-600">{lead.phone}</AdminTd>
                <AdminTd className="max-w-md">
                  <div className="line-clamp-2 text-sm text-neutral-600">{lead.message}</div>
                </AdminTd>
                <AdminTd className="text-neutral-500 text-xs">{formatDate(lead.createdAt)}</AdminTd>
                <AdminTd>
                  <form
                    action={async (formData) => {
                      "use server";
                      await updateLeadStatusAction(lead.id, String(formData.get("status")));
                    }}
                    className="flex items-center gap-2"
                  >
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="border border-neutral-300 bg-white px-2 py-1 text-xs"
                    >
                      {Object.entries(STATUS_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs text-navy-900 underline">Lưu</button>
                  </form>
                </AdminTd>
                <AdminTd className="text-right">
                  <DeleteButton action={async () => { "use server"; await deleteLeadAction(lead.id); }} />
                </AdminTd>
              </AdminTr>
            ))
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}