import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="lg:pl-64">{children}</div>
    </div>
  );
}