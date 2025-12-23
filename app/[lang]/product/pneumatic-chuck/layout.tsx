import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pneumatic Chucks | PROSPIRA Products",
  description: "Discover PROSPIRA's pneumatic chuck products. Reliable gripping and clamping solutions for precision manufacturing and industrial applications.",
};

export default function PneumaticChuckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
