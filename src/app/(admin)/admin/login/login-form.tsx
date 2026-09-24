"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/field";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="password">Mật khẩu</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2" />
      </div>
      {state?.error && <FieldError>{state.error}</FieldError>}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}