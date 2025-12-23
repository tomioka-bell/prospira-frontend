import type { Metadata } from 'next';
import Content from "./content";
import Footer from "../components/footer";
import Header from "./header";

export const metadata: Metadata = {
  title: "จุดแข็งของเรา | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "เรียนรู้เกี่ยวกับจุดแข็งหลัก ข้อได้เปรียบในการแข่งขัน และความมุ่งมั่นต่อความเป็นเลิศของบริษัท พรอสพิรา",
};

export default function OurStrengths() {
  return (
    <div >
        <Header />
        <Content />
        <Footer />
    </div>
  )
}