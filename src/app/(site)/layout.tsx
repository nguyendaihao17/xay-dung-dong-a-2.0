import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCTA } from "@/components/site/mobile-cta";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header companyName={settings.companyName} logoUrl={settings.logoUrl} />
      <main id="main" className="pb-20 lg:pb-0">
        {children}
      </main>
      <Footer settings={settings} />
      <MobileCTA phone={settings.phone} zaloUrl={settings.zaloUrl} />
    </>
  );
}