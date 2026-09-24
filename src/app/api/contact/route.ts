import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() || "_";
        errors[key] = issue.message;
      }
      return NextResponse.json({ errors }, { status: 400 });
    }

    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent") || null;

    await prisma.contactLead.create({
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        company: parsed.data.company || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
        source: "contact-page",
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Có lỗi xảy ra, vui lòng thử lại sau." }, { status: 500 });
  }
}