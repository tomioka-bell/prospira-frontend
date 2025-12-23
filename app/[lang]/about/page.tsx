import type { Metadata } from 'next';
import Header from "./header";
import Environmental from "./environmental";
import Content from "./content";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "เรียนรู้เกี่ยวกับประวัติ พันธกิจ และค่านิยมของบริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด พร้อมความมุ่งมั่นในความเป็นเลิศด้านโซลูชั่นอุตสาหกรรม",
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

