import { Container } from "@/components/ui/container";

const STATS = [
  { value: "20+",  label: "Năm kinh nghiệm" },
  { value: "500+", label: "Dự án hoàn thành" },
  { value: "300+", label: "Khách hàng tin tưởng" },
  { value: "150+", label: "Kỹ sư & công nhân" },
];

export function Stats() {
  return (
    <section id="stats" className="relative z-20 -mt-16 md:-mt-20">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden bg-navy-800 shadow-lift md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group bg-navy-900 px-6 py-10 text-center transition-colors hover:bg-navy-800"
            >
              <div className="font-display text-4xl font-extrabold text-accent md:text-5xl">
                {s.value}
              </div>
              <div className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}