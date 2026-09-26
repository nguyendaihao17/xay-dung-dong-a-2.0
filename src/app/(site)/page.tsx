import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Services } from "@/components/site/services";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { Partners } from "@/components/site/partners";
import { CTABlock } from "@/components/site/cta-block";
import { JsonLd } from "@/components/site/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data";

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <Stats />
      <Services />
      <FeaturedProjects />
      <Partners />
      <CTABlock />
    </>
  );
}