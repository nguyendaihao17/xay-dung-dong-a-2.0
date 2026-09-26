import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { getSiteSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ với Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á để được tư vấn miễn phí về dự án của bạn.",
  path: "/lien-he",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const contacts = [
    {
      icon: Phone,
      label: "Điện thoại",
      value: settings.phone || "Đang cập nhật",
      href: settings.phone ? `tel:${settings.phone}` : undefined,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.email || "info@xddonga.vn",
      href: settings.email ? `mailto:${settings.email}` : undefined,
    },
    {
      icon: MapPin,
      label: "Địa chỉ",
      value: settings.address || "Đang cập nhật",
    },
    {
      icon: Clock,
      label: "Giờ làm việc",
      value: "Thứ 2 - Thứ 7: 8:00 - 17:30",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title="Kết nối với Đông Á"
        description="Chúng tôi luôn sẵn sàng lắng nghe và tư vấn cho dự án của bạn. Hãy liên hệ ngay hôm nay."
        crumbs={[{ label: "Liên hệ" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Info */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Thông tin liên hệ
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-tight text-navy-900 md:text-3xl">
                Chúng tôi ở đây để giúp bạn
              </h2>
              <div className="mt-6 h-1 w-16 bg-accent" />

              <p className="mt-8 text-base leading-relaxed text-neutral-600">
                Dù bạn đang có ý tưởng xây dựng, cần tư vấn thiết kế, hay tìm nhà thầu
                thi công uy tín — hãy để lại thông tin, đội ngũ Đông Á sẽ liên hệ trong
                vòng 24 giờ.
              </p>

              <dl className="mt-10 space-y-6">
                {contacts.map((c) => {
                  const Icon = c.icon;
                  const content = (
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-navy-900 text-white">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          {c.label}
                        </dt>
                        <dd className="mt-1 text-base font-medium text-navy-900">
                          {c.value}
                        </dd>
                      </div>
                    </div>
                  );

                  return (
                    <div key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="block transition-opacity hover:opacity-70">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
              </dl>

              {/* Social */}
              <div className="mt-10 flex gap-3">
                {settings.zaloUrl && (
                  <a
                    href={settings.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 bg-accent px-5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
                  >
                    Chat Zalo
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 border border-navy-900 px-5 text-xs font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="border border-neutral-200 bg-white p-8 md:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Gửi yêu cầu
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase text-navy-900 md:text-3xl">
                  Điền form để được tư vấn
                </h2>
                <div className="mt-6 h-1 w-16 bg-accent" />

                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <section className="relative h-[400px] w-full bg-neutral-100">
        <iframe
          title="Bản đồ Đông Á"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.434!2d106.7!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM2LjgiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2svn!4v1700000000000"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}