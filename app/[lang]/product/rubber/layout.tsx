import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rubber Products | PROSPIRA",
  description: "Premium rubber products from PROSPIRA for industrial applications. Custom rubber solutions for manufacturing and automotive industries.",
};

export default function RubberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
