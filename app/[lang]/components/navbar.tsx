"use client";

import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

import logo from "../images/logo_header.svg";
import logo_white from "../images/logo_footer.svg";
import CompanyMenu from "./company-menu";
import ProductInformation from "./product-information";

type Lang = "th" | "en";

const labelMap: Record<Lang, string> = {
  th: "ไทย",
  en: "English",
};

interface NavbarProps {
  lang?: string;
}

export default function Navbar({ }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isIpad, setIsIpad] = useState(false);

  const { t, i18n } = useTranslation();
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");

  // ตัด /th, /en ออก เพื่อเช็ค active menu ให้ถูก
  const pathWithoutLang = pathname.replace(/^\/(th|en|zh)/, "") || "/";
  const rawLang = segments[1];
  const lang: Lang = rawLang === "th" || rawLang === "en" ? rawLang : "th";

  const isActivePath = (target: string) => pathWithoutLang === target;

  const handleChangeLang = (newLang: Lang) => {
    const currentPath = pathname.replace(/^\/(th|en|zh)/, "");
    window.location.href = `/${newLang}${currentPath || ""}`;
  };

  const isCompanyPage = ["/about", "/history", "/vision", "/team"].includes(
    pathWithoutLang
  );

  const isProductPage = ["/product/rubber", "/product/air-spring", "/product/pneumatic-chuck"].includes(
    pathWithoutLang
  );

  useEffect(() => {
    const pathLang = segments[1];
    if (
      pathLang &&
      (pathLang === "th" || pathLang === "en") &&
      i18n.language !== pathLang
    ) {
      i18n.changeLanguage(pathLang);
    }
  }, [pathname, i18n, segments]);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isRealIpad = /iPad/.test(ua);
    const isIpadOs13Plus =
      navigator.platform === "MacIntel" &&
      (navigator as Navigator).maxTouchPoints > 1;
    
    const timer = setTimeout(() => {
      setIsIpad(isRealIpad || isIpadOs13Plus);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () =>
    setIsMobileMenuOpen((prev) => !prev);

  const langItems: MenuProps["items"] = [
    { key: "th", label: "ไทย" },
    { key: "en", label: "English" },
  ];

  const onLangClick: MenuProps["onClick"] = ({ key }) => {
    handleChangeLang(key as Lang);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/50 backdrop-blur-2xl border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - show white logo when not scrolled, regular logo when scrolled */}
          <div className="shrink-0">
            <Link
              href="/"
              aria-current={isActivePath("/") ? "page" : undefined}
              className="flex items-center"
            >
              <Image
                src={isScrolled ? logo : logo_white}
                alt="Logo"
                width={176}
                height={32}
                className="h-4 sm:h-8 lg:h-8 w-44 transition-all duration-500"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div
            className={`${
              isIpad ? "hidden" : "hidden xl:flex"
            } items-center space-x-1`}
          >
            <Link
              href="/"
              aria-current={isActivePath("/") ? "page" : undefined}
              className={`relative px-4 py-2 transition-all duration-300 font-medium group ${
                isActivePath("/")
                  ? "text-[#08a4b8]"
                  : isScrolled ? "text-gray-900 hover:text-[#08a4b8]" : "text-white hover:text-[#08a4b8]"
              }`}
            >
              <span className="relative z-10">{t("home")}</span>
            </Link>

            <CompanyMenu isCompanyPage={isCompanyPage} lang={lang} isScrolled={isScrolled} />
            <ProductInformation
              isProductPage={isProductPage}
              lang={lang}
              isScrolled={isScrolled}
            />

            <Link
              href={`/${lang}/recruitment`}
              aria-current={
                isActivePath("/recruitment") ? "page" : undefined
              }
              className={`relative px-4 py-2 transition-all duration-300 font-medium group ${
                isActivePath("/recruitment")
                  ? "text-[#08a4b8]"
                  : isScrolled ? "text-gray-900 hover:text-[#08a4b8]" : "text-white hover:text-[#08a4b8]"
              }`}
            >
              <span className="relative z-10">
                {t("recruitment")}
              </span>
            </Link>

            <Link
              href={`/${lang}/contact`}
              aria-current={
                isActivePath("/contact") ? "page" : undefined
              }
              className="ml-4 px-6 py-3 bg-[#08a4b8] hover:bg-black text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{t("contact")}</span>
            </Link>

            {/* Desktop language dropdown */}
            <div className="flex items-center gap-3 ml-6 bg-white/40 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md border border-white/60">
              <BiWorld
                className="text-2xl text-[#08a4b8]"
                aria-hidden="true"
              />

              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                arrow
                menu={{
                  items: langItems,
                  onClick: onLangClick,
                  selectedKeys: [lang],
                }}
              >
                <button
                  type="button"
                  className="relative flex items-center gap-2 px-4 py-2 min-h-[30px] rounded-full text-sm font-semibold transition-all duration-300
                            bg-linear-to-r from-[#08a4b8] to-[#06b6d4] text-white
                            shadow-[0_0_8px_rgba(8,164,184,0.5)] hover:opacity-95"
                  aria-label="Change language"
                  aria-haspopup="true"
                >
                  <span className="text-white">
                    {labelMap[lang as Lang] ?? "ภาษา"}
                  </span>
                  <svg
                    className="w-4 h-4 opacity-90"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                  </svg>
                  <span className="absolute inset-0 rounded-lg bg-white/10 animate-pulse pointer-events-none" />
                </button>
              </Dropdown>
            </div>
          </div>

          {/* Mobile toggle button */}
          <div className={`${isIpad ? "" : "xl:hidden"} relative z-50`}>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`relative px-3 py-3 min-w-11 min-h-11 focus:outline-none rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-gray-900 hover:text-blue-600 hover:bg-blue-50"
                  : "text-gray-800 hover:text-[#08a4b8] hover:bg-white/20"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="main-navigation-mobile"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${
                    isMobileMenuOpen
                      ? "rotate-45 translate-y-[9px]"
                      : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${
                    isMobileMenuOpen
                      ? "-rotate-45 -translate-y-[9px]"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="main-navigation-mobile"
        className={`${isIpad ? "" : "xl:hidden"} fixed top-20 left-0 right-0 z-30 transition-all duration-500 ease-out overflow-hidden backdrop-blur-2xl ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-xl border-t border-white/20">
          <Link
            href="/"
            aria-current={isActivePath("/") ? "page" : undefined}
            className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium transform hover:translate-x-1 ${
              isActivePath("/")
                ? "text-[#08a4b8] bg-blue-50"
                : "text-gray-900 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
            }`}
            onClick={toggleMobileMenu}
          >
            {t("home")}
          </Link>

          {/* Mobile Company Dropdown */}
          <div>
            <button
              type="button"
              onClick={() =>
                setIsCompanyMenuOpen((prev) => !prev)
              }
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isCompanyPage
                  ? "text-[#08a4b8] bg-blue-50"
                  : "text-gray-900 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
              }`}
              aria-label="Toggle company menu"
              aria-expanded={isCompanyMenuOpen}
              aria-haspopup="true"
              aria-controls="company-menu-mobile"
            >
              <span>{t("company")}</span>
              <DownOutlined
                className={`text-xs transition-transform duration-300 ${
                  isCompanyMenuOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id="company-menu-mobile"
              className={`overflow-hidden transition-all duration-300 ${
                isCompanyMenuOpen
                  ? "max-h-60 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-4 space-y-1">
                <Link
                  href={`/${lang}/about`}
                  aria-current={
                    isActivePath("/about") ? "page" : undefined
                  }
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActivePath("/about")
                      ? "text-[#08a4b8] bg-blue-50"
                      : "text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {t("about")}
                </Link>
                <Link
                  href={`/${lang}/history`}
                  aria-current={
                    isActivePath("/history") ? "page" : undefined
                  }
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActivePath("/history")
                      ? "text-[#08a4b8] bg-blue-50"
                      : "text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {t("history")}
                </Link>
                <Link
                  href={`/${lang}/vision`}
                  aria-current={
                    isActivePath("/vision") ? "page" : undefined
                  }
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActivePath("/vision")
                      ? "text-[#08a4b8] bg-blue-50"
                      : "text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {t("vision")}
                </Link>
                <Link
                  href={`/${lang}/team`}
                  aria-current={
                    isActivePath("/team") ? "page" : undefined
                  }
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActivePath("/team")
                      ? "text-[#08a4b8] bg-blue-50"
                      : "text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {t("team")}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Product Dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setIsProductMenuOpen?.((prev: boolean) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium text-gray-900 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
              aria-label="Toggle product menu"
              aria-expanded={isProductMenuOpen}
              aria-haspopup="true"
              aria-controls="product-menu-mobile"
            >
              <span>{t("product_information")}</span>
              <DownOutlined
                className={`text-xs transition-transform duration-300 ${isProductMenuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id="product-menu-mobile"
              className={`overflow-hidden transition-all duration-300 ${isProductMenuOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
            >
              <div className="ml-4 space-y-1">
                <Link
                  href={`/${lang}/product/rubber`}
                  className="block px-4 py-2 text-sm rounded-lg transition-all duration-300 text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  onClick={toggleMobileMenu}
                >
                  ชิ้นส่วนยางรองแท่นเครื่อง
                </Link>
                <Link
                  href={`/${lang}/product/air-spring`}
                  className="block px-4 py-2 text-sm rounded-lg transition-all duration-300 text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  onClick={toggleMobileMenu}
                >
                  แอร์สปริง
                </Link>
                <Link
                  href={`/${lang}/product/pneumatic-chuck`}
                  className="block px-4 py-2 text-sm rounded-lg transition-all duration-300 text-gray-900 hover:bg-blue-50 hover:text-[#08a4b8]"
                  onClick={toggleMobileMenu}
                >
                  Pneumatic Chuck
                </Link>
              </div>
            </div>
          </div>


          {/* Recruitment */}
          <Link
            href={`/${lang}/recruitment`}
            aria-current={isActivePath("/recruitment") ? "page" : undefined}
            className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium transform hover:translate-x-1 ${
              isActivePath("/recruitment")
                ? "text-[#08a4b8] bg-blue-50"
                : "text-gray-900 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
            }`}
            onClick={toggleMobileMenu}
          >
            {t("recruitment")}
          </Link>

          <Link
            href={`/${lang}/contact`}
            aria-current={
              isActivePath("/contact") ? "page" : undefined
            }
            className="block px-4 py-3 bg-linear-to-r from-[#08a4b8] to-[#08a4b8] text-white text-center rounded-xl transition-all duration-300 font-medium hover:shadow-lg transform hover:scale-105 mt-2"
            onClick={toggleMobileMenu}
          >
            {t("contact")}
          </Link>

          {/* Mobile language toggle */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-3 ml-6 bg-white/50 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md border border-white/80">
              <BiWorld
                className="text-2xl text-[#08a4b8]"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`relative px-4 py-2 min-h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                    lang === "th"
                      ? "bg-linear-to-r from-[#08a4b8] to-[#06b6d4] text-white shadow-[0_0_8px_rgba(8,164,184,0.5)] scale-105"
                      : "text-gray-900 hover:text-[#08a4b8] hover:bg-white/40"
                  }`}
                  aria-label="Switch language to Thai"
                  aria-pressed={lang === "th"}
                  onClick={() => handleChangeLang("th")}
                >
                  ไทย
                  {lang === "th" && (
                    <span className="absolute inset-0 rounded-lg bg-white/20 animate-pulse" />
                  )}
                </button>
                <button
                  type="button"
                  className={`relative px-4 py-2 min-h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                    lang === "en"
                      ? "bg-linear-to-r from-[#08a4b8] to-[#06b6d4] text-white shadow-[0_0_8px_rgba(8,164,184,0.5)] scale-105"
                      : "text-gray-900 hover:text-[#08a4b8] hover:bg-white/40"
                  }`}
                  aria-label="Switch language to English"
                  aria-pressed={lang === "en"}
                  onClick={() => handleChangeLang("en")}
                >
                  EN
                  {lang === "en" && (
                    <span className="absolute inset-0 rounded-lg bg-white/20 animate-pulse" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
