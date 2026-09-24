export type NavItem = { label: string; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { label: "Gioi thieu", href: "/gioi-thieu" },
  { label: "Dich vu", href: "/dich-vu" },
  { label: "Du an", href: "/du-an" },
  { label: "Tin tuc", href: "/tin-tuc" },
  { label: "Thu vien", href: "/thu-vien" },
  { label: "Tuyen dung", href: "/tuyen-dung" },
  { label: "Lien he", href: "/lien-he" },
];