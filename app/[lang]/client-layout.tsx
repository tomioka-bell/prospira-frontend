"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ConfigProvider } from "antd";
import i18n from "@/i18n/config";
import Navbar from "./components/navbar";

interface ClientLayoutProps {
  children: React.ReactNode;
  lang?: string;
}

export default function ClientLayout({ children, lang = "en" }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes("/admin");

  useEffect(() => {
    const currentLang = pathname.split("/")[1] || lang;

    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [pathname, lang]);

  // Initialize i18n with the correct language from props
  // This prevents hydration mismatch by ensuring client uses same language as server
  useEffect(() => {
    if (i18n.language !== lang && lang !== "en") {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--font-kanit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      {!isAdminRoute && <Navbar />}
      {children}
    </ConfigProvider>
  );
}
