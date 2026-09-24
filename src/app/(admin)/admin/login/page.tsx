import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6">
      <div className="w-full max-w-md bg-white p-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-navy-900 font-display text-lg font-bold text-white">
            ĐA
          </div>
          <span className="font-display text-lg uppercase tracking-wide text-navy-900">
            Đông Á CMS
          </span>
        </div>
        <h1 className="font-display text-2xl uppercase text-navy-900">Đăng nhập</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Dành cho quản trị viên và biên tập viên
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}