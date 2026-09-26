import { Container } from "@/components/ui/container";
import { Counter } from "@/components/site/counter";
import { Reveal } from "@/components/site/reveal";

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
          {STATS.map((s, idx) => (
            <Reveal key={s.label} variant="up" delay={idx * 100}>
              <div className="group relative overflow-hidden bg-navy-900 px-6 py-10 text-center transition-colors hover:bg-navy-800">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/0 via-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/10 group-hover:via-accent/5" />

                <div className="relative font-display text-4xl font-extrabold text-accent md:text-5xl">
                  <Counter value={s.value} />
                </div>
                <div className="relative mt-3 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}