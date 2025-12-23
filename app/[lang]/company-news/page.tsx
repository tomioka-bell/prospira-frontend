import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompanyNewsDetailClient from "./company-news-detail-client";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "ข่าวสารและกิจกรรม | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "ข่าวสารและกิจกรรมล่าสุดจากบริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด อัปเดตข่าวประชาสัมพันธ์และกิจกรรมของบริษัท",
};

export default function CompanyNewsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<CompanyNewsDetailSkeleton />}>
        <CompanyNewsDetailClient />
      </Suspense>
      <Footer />
    </>
  );
}

function CompanyNewsDetailSkeleton() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 mt-14">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-2/3 bg-white/60 rounded-2xl" />
          <div className="h-6 w-1/3 bg-white/60 rounded-full" />
          <div className="h-96 w-full bg-white/60 rounded-3xl" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/60 rounded" />
            <div className="h-4 w-5/6 bg-white/60 rounded" />
            <div className="h-4 w-4/6 bg-white/60 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
