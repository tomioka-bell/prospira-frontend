import type { Metadata } from 'next';
import Header from "./header";
import Environmental from "./environmental";
import Content from "./content";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "About Us | PROSPIRA Corporation",
  description: "Learn about PROSPIRA Corporation's history, mission, values, and commitment to excellence in industrial solutions.",
};
import Overview from "./overview";
import GlobalFootprint from "./global-footprint";
import ProductLineup from "./product-lineup";
import BusinessCarModels from "./business-car-models";
import AwardHistory from "./award-history";

export default function AboutPage() {
  return (
    <section>
      <Header />
      <Content />
      <GlobalFootprint />
      <ProductLineup />
      <Overview />
      <AwardHistory />
      <BusinessCarModels />
      <Environmental />
      <Footer />
    </section>
  );
}

