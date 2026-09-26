import { Lightbulb, PencilRuler, ClipboardCheck, HardHat, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/site/reveal";

const SERVICES = [
  {
    icon: Lightbulb,
    title: "Tư vấn xây dựng",
    description: "Tư vấn giải pháp, lập dự án đầu tư, thẩm tra thiết kế và dự toán công trình.",
  },
  {
    icon: PencilRuler,
    title: "Thiết kế kiến trúc",
    description: "Thiết kế kiến trúc, kết cấu, MEP cho công trình dân dụng và công nghiệp.",
  },
  {
    icon: ClipboardCheck,
    title: "Giám sát thi công",
    description: "Giám sát chất lượng, tiến độ, khối lượng và an toàn lao động tại công trường.",
  },
  {
    icon: HardHat,
    title: "Thi công xây dựng",
    description: "Thi công trọn gói từ móng đến hoàn thiện, đảm bảo tiến độ và chất lượng.",
  },
];

export function Services() {
  return (
    <Section className="bg-neutral-50">
      <Reveal>
        <SectionHeader
          eyebrow="Lĩnh vực hoạt động"
          title="Dịch vụ của chúng tôi"
          description="Đông Á cung cấp giải pháp xây dựng toàn diện từ tư vấn, thiết kế đến thi công và giám sát."
        />
      </Reveal>

      <div className="mt-16 grid gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} variant="up" delay={idx * 100}>
              <Link
                href="/dich-vu"
                className="group relative flex h-full flex-col overflow-hidden bg-white p-8 transition-all duration-500 hover:bg-navy-900"
              >
                {/* Accent line top */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                <div className="flex h-14 w-14 items-center justify-center bg-navy-900 text-white transition-all duration-500 group-hover:bg-accent group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={26} strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-navy-900 transition-colors duration-300 group-hover:text-white">
                  {s.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-white/70">
                  {s.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Tìm hiểu
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}