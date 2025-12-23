import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ผลิตภัณฑ์ | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "ค้นพบผลิตภัณฑ์คุณภาพของพรอสพิรา รวมถึงแอร์สปริง ชัคปนิวเมติก และโซลูชั่นผลิตภัณฑ์ยาง",
};

export default function ProductPage() {
  return (
    <div>
        <h1 className="sr-only">Products</h1>
    </div>
  )
}