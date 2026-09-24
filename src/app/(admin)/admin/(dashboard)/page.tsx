import Link from "next/link";
import { FolderKanban, Newspaper, Briefcase, MessageSquare } from "lucide-react";
import { projectRepository } from "@/lib/repositories/project.repository";
import { articleRepository } from "@/lib/repositories/article.repository";
import { careerRepository } from "@/lib/repositories/career.repository";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projectCount, articleCount, careerCount, newLeadCount, recentLeads] = await Promise.all([
    projectRepository.count(),
    articleRepository.count(),
    careerRepository.count(),
    leadRepository.count("NEW"),
    leadRepository.recent(5),
  ]);

  const stats = [
    { label: "Dự án", value: projectCount, href: "/admin/projects", icon: FolderKanban },
    { label: "Bài viết", value: articleCount, href: "/admin/articles", icon: Newspaper },
    { label: "Tuyển dụng", value: careerCount, href: "/admin/careers", icon: Briefcase },
    { label: "Liên hệ mới", value: newLeadCount, href: "/admin/leads", icon: MessageSquare },
  ];

  return (
    <div className="p-6 lg:p-10">
      <h1 className="font-display text-display-md uppercase text-navy-900">Bảng điều khiển</h1>
      <p className="mt-2 text-neutral-600">Tổng quan hoạt động website</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group border border-neutral-200 bg-white p-6 transition-colors hover:border-navy-900"
            >
              <Icon size={22} strokeWidth={1.5} className="text-navy-900" />
              <div className="mt-4 font-display text-4xl text-navy-900">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-widest text-neutral-500">
                {s.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl uppercase text-navy-900">Liên hệ gần đây</h2>
        <div className="mt-6 border border-neutral-200 bg-white">
          {recentLeads.length === 0 ? (
            <p className="p-6 text-sm text-neutral-500">Chưa có liên hệ nào.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr className="text-xs uppercase tracking-widest text-neutral-500">
                  <th className="px-6 py-3">Tên</th>
                  <th className="px-6 py-3">Điện thoại</th>
                  <th className="px-6 py-3">Nội dung</th>
                  <th className="px-6 py-3">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-6 py-4 font-medium text-navy-900">{lead.fullName}</td>
                    <td className="px-6 py-4 text-neutral-600">{lead.phone}</td>
                    <td className="px-6 py-4 text-neutral-600 line-clamp-1">{lead.message}</td>
                    <td className="px-6 py-4 text-neutral-500">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}