import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Props = {
  title?: string;
  description?: string;
};

export function CTABlock({
  title = "Sẵn sàng khởi công dự án của bạn?",
  description = "Liên hệ ngay để được tư vấn miễn phí về thiết kế, thi công và dự toán chi phí.",
}: Props) {
  return (
    <section className="bg-navy-950 text-white">
      <Container className="py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-md uppercase leading-tight">{title}</h2>
            <p className="mt-4 max-w-xl text-white/70">{description}</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/lien-he" size="lg" className="bg-white text-navy-900 hover:bg-neutral-100">
              Liên hệ tư vấn
            </Button>
            <Button
              href="/du-an"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Xem dự án
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}