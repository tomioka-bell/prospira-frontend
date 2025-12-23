import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Products | PROSPIRA Corporation",
  description: "Discover PROSPIRA's premium products including air springs, pneumatic chucks, and rubber solutions.",
};

export default function ProductPage() {
  return (
    <div>
        <h1 className="sr-only">Products</h1>
    </div>
  )
}