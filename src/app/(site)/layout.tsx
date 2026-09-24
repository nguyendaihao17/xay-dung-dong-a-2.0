import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCTA } from "@/components/site/mobile-cta";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}