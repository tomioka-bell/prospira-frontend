import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

import ClientLayout from "./client-layout";
import StructuredData from "./components/structured-data";

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
  keywords: "พรอสพิรา, แอร์สปริง, ชัคปนิวเมติก, ผลิตภัณฑ์ยาง, โซลูชั่นอุตสาหกรรม, industrial solutions",
  icons: {
    icon: "/logo-company.png",
  },
  openGraph: {
    type: "website",
    url: "https://prospira.com",
    title: "PROSPIRA Corporation | Premium Products & Solutions",
    description: "Leading provider of quality products and innovative solutions",
    images: [
      {
        url: "/logo-company.png",
        width: 1200,
        height: 630,
        alt: "PROSPIRA Corporation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROSPIRA Corporation",
    description: "Premium products and solutions from PROSPIRA",
    images: ["/logo-company.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://prospira.com",
    languages: {
      "th-TH": "https://prospira.com/th",
      "en-US": "https://prospira.com/en",
    },
  },
};

export async function generateStaticParams() {
  return [
    { lang: "th" },
    { lang: "en" },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        {/* Preload critical resources for faster LCP */}
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
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
      </head>
      <body className={`${kanit.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
