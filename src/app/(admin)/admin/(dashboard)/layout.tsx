import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav userName={session.user.name || session.user.email || "Admin"} />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}