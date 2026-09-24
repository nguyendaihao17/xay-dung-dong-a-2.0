import { prisma } from "@/lib/db";

export type SiteSettings = {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  zaloUrl: string;
  facebookUrl: string;
  logoUrl: string;
  seoTitle: string;
  seoDescription: string;
};

const DEFAULTS: SiteSettings = {
  companyName: "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á",
  phone: "",
  email: "info@xddonga.vn",
  address: "",
  zaloUrl: "",
  facebookUrl: "",
  logoUrl: "",
  seoTitle: "CÔNG TY TNHH XÂY DỰNG ĐÔNG Á",
  seoDescription: "Tư vấn • Thiết kế • Giám sát • Thi công xây dựng",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            "company.name",
            "company.phone",
            "company.email",
            "company.address",
            "company.zaloUrl",
            "company.facebookUrl",
            "company.logoUrl",
            "seo.defaultTitle",
            "seo.defaultDescription",
          ],
        },
      },
    });
    const map: Record<string, string> = {};
    for (const r of rows) {
      map[r.key] = typeof r.value === "string" ? r.value : String(r.value ?? "");
    }
    return {
      companyName: map["company.name"] || DEFAULTS.companyName,
      phone: map["company.phone"] || DEFAULTS.phone,
      email: map["company.email"] || DEFAULTS.email,
      address: map["company.address"] || DEFAULTS.address,
      zaloUrl: map["company.zaloUrl"] || DEFAULTS.zaloUrl,
      facebookUrl: map["company.facebookUrl"] || DEFAULTS.facebookUrl,
      logoUrl: map["company.logoUrl"] || DEFAULTS.logoUrl,
      seoTitle: map["seo.defaultTitle"] || DEFAULTS.seoTitle,
      seoDescription: map["seo.defaultDescription"] || DEFAULTS.seoDescription,
    };
  } catch {
    return DEFAULTS;
  }
}