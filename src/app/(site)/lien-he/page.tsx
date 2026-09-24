import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { clientConfig } from "@/lib/env-client";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với Công ty TNHH Xây dựng Đông Á để được tư vấn miễn phí về thiết kế, thi công và dự toán.",
};

export default function ContactPage() {
  const contacts = [
    { icon: Phone, label: "Điện thoại", value: clientConfig.NEXT_PUBLIC_PHONE || "Đang cập nhật" },
    { icon: Mail, label: "Email", value: "info@xddonga.vn" },
    { icon: MapPin, label: "Địa chỉ", value: "Đang cập nhật" },
    { icon: Clock, label: "Giờ làm việc", value: "T2 - T7, 8:00 - 17:30" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title="Kết nối với Đông Á"
        description="Chúng tôi luôn sẵn sàng lắng nghe và tư vấn cho dự án của bạn."
        crumbs={[{ label: "Liên hệ" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl uppercase text-navy-900">Thông tin liên hệ</h2>
              <dl className="mt-8 space-y-6">
                {contacts.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-300 text-navy-900">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                          {c.label}
                        </dt>
                        <dd className="mt-1 text-base text-navy-900">{c.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl uppercase text-navy-900">Gửi yêu cầu</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}