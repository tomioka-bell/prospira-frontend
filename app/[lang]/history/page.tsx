import type { Metadata } from 'next';
import HistoryContent from "./content";
import Header from "./header";

export const metadata: Metadata = {
  title: "ประวัติบริษัท | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "ค้นพบประวัติความเป็นมาอันยาวนาน จุดสำคัญ และการเดินทางของการสร้างนวัตกรรมในอุตสาหกรรมของบริษัท พรอสพิรา",
};

export default function HistoryPage() {
  return (
    <div>
        <Header />
        <HistoryContent />
    </div>
  )
}