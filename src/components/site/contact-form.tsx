"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError } from "@/components/ui/field";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json.errors) {
          setErrors(json.errors);
        }
        setMessage(json.error || "Gửi liên hệ thất bại. Vui lòng thử lại.");
        setState("error");
        return;
      }

      setState("success");
      setMessage("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.");
      form.reset();
    } catch {
      setMessage("Không thể kết nối máy chủ. Vui lòng thử lại sau.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <h3 className="mt-6 font-display text-xl font-bold uppercase text-emerald-900">
          Gửi thành công
        </h3>
        <p className="mt-3 text-sm text-emerald-700">{message}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-xs font-semibold uppercase tracking-wider text-emerald-700 underline hover:no-underline"
        >
          Gửi liên hệ khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {state === "error" && message && (
        <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Họ và tên *</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Nguyễn Văn A"
            className="mt-2"
          />
          <FieldError>{errors.name}</FieldError>
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="0909 123 456"
            className="mt-2"
          />
          <FieldError>{errors.phone}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          className="mt-2"
        />
        <FieldError>{errors.email}</FieldError>
      </div>

      <div>
        <Label htmlFor="subject">Tiêu đề</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="VD: Tư vấn thiết kế nhà phố"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="message">Nội dung *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Mô tả ngắn về dự án hoặc yêu cầu của bạn..."
          className="mt-2"
        />
        <FieldError>{errors.message}</FieldError>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={state === "loading"}
        className="w-full"
      >
        {state === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send size={18} />
            Gửi liên hệ
          </>
        )}
      </Button>

      <p className="text-center text-xs text-neutral-500">
        Thông tin của bạn được bảo mật tuyệt đối.
      </p>
    </form>
  );
}