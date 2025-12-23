"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ConfigProvider } from "antd";
import i18n from "@/i18n/config";
import Navbar from "./components/navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.split("/")[1] || "en";

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [pathname]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--font-kanit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Navbar />
      {children}
    </ConfigProvider>
  );
}
