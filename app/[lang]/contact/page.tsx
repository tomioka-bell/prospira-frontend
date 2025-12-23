import type { Metadata } from 'next';
import Content from "./content";
import Footer from "../components/footer";
import Header from "./header";

export const metadata: Metadata = {
  title: "ติดต่อเรา | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "ติดต่อบริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด สอบถามข้อมูล รับสนับสนุน หรือหาโอกาสทางการค้า",
};

export default function ContactPage() {
 
  return (
    <section className="min-h-screen bg-linear-to-br from-cyan-600 via-slate-600 to-cyan-900 text-white">
      <Header />
      <div className="pb-20">
      <Content />
       </div>
      <Footer />
    </section>
  );
}
