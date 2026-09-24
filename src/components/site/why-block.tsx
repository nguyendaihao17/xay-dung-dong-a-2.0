import { Shield, Award, Users, Wrench } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Kinh nghiệm 20+ năm",
    description:
      "Hoạt động từ năm 2003, chúng tôi đã tích lũy kinh nghiệm qua hàng trăm công trình dân dụng và công nghiệp.",
  },
  {
    icon: Shield,
    title: "Chất lượng đảm bảo",
    description:
      "Quy trình kiểm soát chất lượng nghiêm ngặt từ khảo sát, thiết kế đến thi công và bàn giao.",
  },
  {
    icon: Users,
    title: "Đội ngũ chuyên nghiệp",
    description:
      "Kỹ sư, kiến trúc sư và công nhân kỹ thuật được đào tạo bài bản, giàu kinh nghiệm thực tế.",
  },
  {
    icon: Wrench,
    title: "Thiết bị hiện đại",
    description:
      "Đầu tư máy móc, thiết bị thi công hiện đại, đáp ứng các công trình quy mô lớn và phức tạp.",
  },
];

export function WhyBlock() {
  return (
    <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="border-t border-neutral-300 pt-8">
            <Icon size={28} className="text-navy-900" strokeWidth={1.5} />
            <h3 className="mt-6 font-display text-xl uppercase text-navy-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}