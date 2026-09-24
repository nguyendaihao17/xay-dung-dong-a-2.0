import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Quan tri vien";

  if (!email || !password) {
    console.warn("Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash, role: "ADMIN" },
  });
  console.log("Admin ready: " + email);

  const defaults = [
    { key: "company.name", value: "CONG TY TNHH XAY DUNG DONG A", group: "general" },
    { key: "company.foundedYear", value: 2003, group: "general" },
    { key: "seo.defaultTitleSuffix", value: "Xay Dung Dong A", group: "seo" },
    { key: "seo.robots", value: { index: true, follow: true }, group: "seo" },
  ];

  for (const s of defaults) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: { key: s.key, value: s.value, group: s.group },
    });
  }
  console.log("Default settings seeded.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());