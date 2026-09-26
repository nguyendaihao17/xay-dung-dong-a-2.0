import { Phone, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { getSiteSettings } from "@/lib/settings";

type Props = {
  title?: string;
  description?: string;
};

export async function CTABlock({
  title = "Bạn cần tư vấn về dự án xây dựng?",
  description = "Đội ngũ kỹ sư của Đông Á sẵn sàng lắng nghe và tư vấn miễn phí cho dự án của bạn. Hãy liên hệ ngay hôm nay.",
}: Props = {}) {
  const settings = await getSiteSettings();

  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <Container className="relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Liên hệ với chúng tôi
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[1.1] text-white md:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/lien-he" variant="accent" size="lg">
                Gửi yêu cầu
                <ArrowRight size={18} />
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="group flex items-center gap-5 border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-accent text-white">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    Điện thoại
                  </div>
                  <div className="mt-1 font-display text-xl font-bold text-white">
                    {settings.phone}
                  </div>
                </div>
              </a>
            )}

            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="group flex items-center gap-5 border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-accent text-white">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    Email
                  </div>
                  <div className="mt-1 font-display text-xl font-bold text-white break-all">
                    {settings.email}
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}