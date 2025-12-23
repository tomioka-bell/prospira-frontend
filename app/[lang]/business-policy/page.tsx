import type { Metadata } from 'next';
import BusinessPolicyContent from "./content";
import Header from "./header";

export const metadata: Metadata = {
  title: "นโยบายทางการค้า | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "ตรวจสอบนโยบายทางการค้าและความมุ่งมั่นของบริษัท พรอสพิราต่อคุณภาพ ความยั่งยืน และความพึงพอใจของลูกค้า",
};

export default function BusinessPolicyPage() {
  return (
    <div>
        <Header />
        <BusinessPolicyContent />
    </div>
  )
}