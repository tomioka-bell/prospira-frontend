import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Air Springs | PROSPIRA Products",
  description: "Explore PROSPIRA's premium air spring products. High-performance shock absorption solutions for industrial and automotive applications.",
};

export default function AirSpringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
