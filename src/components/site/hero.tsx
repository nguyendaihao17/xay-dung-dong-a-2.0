import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Props = {
  imageUrl?: string;
};

export function Hero({ imageUrl }: Props) {
  return (
    <section className="relative flex min-h-[calc(100vh-var(--header-height))] items-end overflow-hidden bg-navy-950 text-white">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

      <Container className="relative pb-20 pt-32 lg:pb-32 lg:pt-40">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-white/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Từ năm 2003
            </span>
          </div>

          <h1 className="mt-8 font-display text-display-xl uppercase leading-[0.95]">
            Xây Dựng Đông Á
            <span className="mt-4 block text-[0.7em] leading-tight text-white/80">
              Hơn 20 năm<br />
              kiến tạo công trình bền vững
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 lg:text-xl">
            Tư vấn • Thiết kế • Giám sát • Thi công xây dựng
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/du-an" variant="primary" size="lg" className="bg-white text-navy-900 hover:bg-neutral-100">
              Khám phá dự án
            </Button>
            <Button href="/lien-he" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-widest text-white/50 lg:flex">
        <span>Cuộn xuống</span>
        <span className="block h-12 w-px bg-white/30" />
      </div>
    </section>
  );
}