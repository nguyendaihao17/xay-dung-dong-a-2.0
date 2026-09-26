import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

type Props = {
  title?: string;
  slogan?: string;
  subtitle?: string;
  imageUrl?: string;
};

export function Hero({
  title = "TƯ VẤN THIẾT KẾ - XÂY DỰNG ĐÔNG Á",
  slogan = "NIỀM TIN - CHẤT LƯỢNG - UY TÍN",
  subtitle = "Tư vấn - Thiết kế - Giám sát - Thi công xây dựng",
  imageUrl = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
}: Props) {
  return (
    <section className="relative flex min-h-[calc(100vh-var(--header-height))] items-center overflow-hidden bg-navy-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-20">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-block border-l-4 border-accent bg-navy-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
            Công ty TNHH Tư vấn Thiết kế - Xây dựng
          </span>

          <h1 className="mt-8 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>

          <p className="mt-6 font-display text-xl font-semibold uppercase tracking-[0.2em] text-accent md:text-2xl lg:text-3xl">
            {slogan}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/lien-he" variant="accent" size="lg">
              Nhận tư vấn miễn phí
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink
              href="/du-an"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Xem dự án
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <a
        href="#stats"
        aria-label="Cuộn xuống"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-white md:block"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </a>
    </section>
  );
}