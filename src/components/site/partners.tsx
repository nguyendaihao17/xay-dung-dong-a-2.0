import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { prisma } from "@/lib/db";

const FALLBACK = [
  { id: "1", name: "VINGROUP", logoUrl: null, websiteUrl: null },
  { id: "2", name: "VICEM", logoUrl: null, websiteUrl: null },
  { id: "3", name: "HÒA PHÁT", logoUrl: null, websiteUrl: null },
  { id: "4", name: "COTECCONS", logoUrl: null, websiteUrl: null },
  { id: "5", name: "RẠNG ĐÔNG", logoUrl: null, websiteUrl: null },
  { id: "6", name: "PHÚ MỸ HƯNG", logoUrl: null, websiteUrl: null },
  { id: "7", name: "NOVALAND", logoUrl: null, websiteUrl: null },
  { id: "8", name: "SUNGROUP", logoUrl: null, websiteUrl: null },
];

async function getPartners() {
  try {
    const rows = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((p) => ({
      id: p.id,
      name: p.name,
      logoUrl: p.logoUrl,
      websiteUrl: p.websiteUrl,
    }));
  } catch {
    return [];
  }
}

export async function Partners() {
  const fromDb = await getPartners();
  const partners = fromDb.length > 0 ? fromDb : FALLBACK;
  const doubled = [...partners, ...partners];

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Đối tác tin cậy"
          title="Đồng hành cùng chúng tôi"
          description="Chúng tôi tự hào là đối tác chiến lược của nhiều thương hiệu lớn trong và ngoài nước."
        />
      </Container>

      <div className="relative mt-14 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-16">
          {doubled.map((p, idx) => {
            const content = p.logoUrl ? (
              <div className="relative h-16 w-40">
                <Image
                  src={p.logoUrl}
                  alt={p.name}
                  fill
                  sizes="160px"
                  className="object-contain transition-transform hover:scale-105"
                />
              </div>
            ) : (
              <span className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-navy-900/30 transition-colors hover:text-navy-900">
                {p.name}
              </span>
            );

            return (
              <div
                key={`${p.id}-${idx}`}
                className="flex h-20 min-w-[200px] items-center justify-center"
              >
                {p.websiteUrl ? (
                  <a
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.name}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}