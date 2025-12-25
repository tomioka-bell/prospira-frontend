import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./[lang]/globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด | ผลิตภัณฑ์และโซลูชันคุณภาพ",
  description: "ค้นหาผลิตภัณฑ์และโซลูชันคุณภาพของบริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด ผู้นำด้านแอร์สปริง ชัคแบบปนิวเมติก และผลิตภัณฑ์ยางเสริมอุตสาหกรรมที่มีนวัตกรรม",
  keywords: "Prospira, Prospira Thailand, prospira (thailand), พร๊อสไพร่า, บริษัท พร๊อสไพร่า, พร๊อสไพร่า ประเทศไทย, ยางกันสั่นสะเทือน, หางานพร๊อสไพร่า, พร๊อสไพร่าสมัครงาน, ตำแหน่งงานพร๊อสไพร่า, รับสมัครงานพร๊อสไพร่า, prospira thailand, เว็บไซต์พร๊อสไพร่า, ยางกันสั่นสะเทือน",
  verification: {
    google: "OSHa6gheVFg6s4Pl8uavcAaJXZV5AgxjZVQW0uDk3N4",
  },
  icons: {
    icon: "/logo-company.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link 
          rel="preload" 
          href="/logo-company.png" 
          as="image" 
          type="image/png"
        />
        <link 
          rel="preload" 
          href="/logo_footer.png" 
          as="image" 
          type="image/png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${kanit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
