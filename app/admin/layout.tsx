"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import i18n from "@/i18n/config";
import { UserProvider } from "./contexts/UserContext";
import Sidebar from "./components/sidebar";
import NavbarAdmin from "./components/navbar-admin";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (i18n.language !== "th") {
      i18n.changeLanguage("th");
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  const isLoginPage = pathname.includes("/admin/login");

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--font-kanit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <UserProvider>
        {isLoginPage ? (
          <div className="flex flex-col h-screen">
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        ) : (
          <div className="flex flex-col h-screen ">
            <NavbarAdmin />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-auto bg-gray-200">
                <div className="p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )}
      </UserProvider>
    </ConfigProvider>
  );
}