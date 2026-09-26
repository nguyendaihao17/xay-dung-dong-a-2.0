import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(10, "Nội dung tối thiểu 10 ký tự"),
});

export async function POST(req: Request) {
  try {
    // Rate limit theo IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const limit = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Bạn gửi quá nhiều lần. Vui lòng thử lại sau 1 phút." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    const data = {
      fullName: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        // Map fullName về name cho client
        errors[key === "fullName" ? "name" : key] = issue.message;
      }
      return NextResponse.json(
        { error: "Vui lòng kiểm tra lại thông tin", errors },
        { status: 400 }
      );
    }

    const lead = await prisma.contactLead.create({
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
        status: "NEW",
        ip: ip !== "unknown" ? ip : null,
        userAgent: req.headers.get("user-agent") || null,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json(
      { error: "Không thể gửi liên hệ. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}