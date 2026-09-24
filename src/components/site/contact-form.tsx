"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError } from "@/components/ui/field";
import { Stack } from "@/components/ui/stack";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors || { _: data.error || "Có lỗi xảy ra" });
        setStatus("error");
        return;
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrors({ _: "Không kết nối được máy chủ" });
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-accent-green bg-accent-green/5 p-8">
        <h3 className="font-display text-xl uppercase text-accent-green">
          Đã gửi thành công
        </h3>
        <p className="mt-3 text-neutral-700">
          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Stack gap="md">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Họ tên *</Label>
            <Input id="fullName" name="fullName" required className="mt-2" />
            <FieldError>{errors.fullName}</FieldError>
          </div>
          <div>
            <Label htmlFor="phone">Điện thoại *</Label>
            <Input id="phone" name="phone" required className="mt-2" />
            <FieldError>{errors.phone}</FieldError>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" className="mt-2" />
            <FieldError>{errors.email}</FieldError>
          </div>
          <div>
            <Label htmlFor="company">Công ty</Label>
            <Input id="company" name="company" className="mt-2" />
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Chủ đề</Label>
          <Input id="subject" name="subject" className="mt-2" />
        </div>

        <div>
          <Label htmlFor="message">Nội dung *</Label>
          <Textarea id="message" name="message" required className="mt-2" rows={6} />
          <FieldError>{errors.message}</FieldError>
        </div>

        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0"
          aria-hidden="true"
        />

        <FieldError>{errors._}</FieldError>

        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Đang gửi..." : "Gửi liên hệ"}
        </Button>
      </Stack>
    </form>
  );
}