"use client";

import { useActionState } from "react";
import { Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { changePasswordAction, type PasswordState } from "@/lib/user-actions";

const initialState: PasswordState = {};

export default function ChangePasswordPage() {
  const [state, formAction, pending] = useActionState(
    changePasswordAction,
    initialState
  );

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold uppercase text-navy-900">
          Đổi mật khẩu
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Đổi mật khẩu đăng nhập của tài khoản admin
        </p>
      </div>

      <div className="max-w-lg border border-neutral-200 bg-white p-8">
        {/* Success */}
        {state.ok && (
          <div className="mb-6 flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <div>
              <strong>Đổi mật khẩu thành công!</strong>
              <p className="mt-1 text-xs">Lần đăng nhập sau dùng mật khẩu mới.</p>
            </div>
          </div>
        )}

        {/* Error */}
        {state.error && (
          <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="oldPassword">Mật khẩu hiện tại *</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="newPassword">Mật khẩu mới *</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-2"
            />
            <p className="mt-1.5 text-xs text-neutral-500">
              Tối thiểu 8 ký tự. Nên dùng chữ hoa, chữ thường, số và ký tự đặc biệt.
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-2"
            />
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Đang đổi...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Đổi mật khẩu
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}