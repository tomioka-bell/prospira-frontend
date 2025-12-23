import type { Metadata } from 'next';
import AllActivitiesClient from "./all-activities-client";
import type { NewsItemApi, NewsItem } from "../types/company-news";
import { buildImageURL } from "../utils/get-image";

export const metadata: Metadata = {
  title: "กิจกรรมทั้งหมด | บริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
  description: "สำรวจกิจกรรมและข่าวสารล่าสุดจากบริษัท พร๊อสไพร่า (ประเทศไทย) จำกัด",
};

const PAGE_LIMIT = 6;
const NEW_DAYS = 14;

function parseDate(input: string): Date | null {
  const d = new Date(input.includes("T") ? input : input.replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

function formatThaiDate(input: string): string {
  const d = parseDate(input);
  if (!d) return input ?? "";
  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isNew(createdAt: string): boolean {
  const d = parseDate(createdAt);
  if (!d) return false;
  const diffDays = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_DAYS;
}

export default async function AllActivitiesPage() {
  let items: NewsItem[] = [];
  let total = 0;
  let totalPages = 0;

  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const url = `${base}/api/company-news/get-company-news?limit=${PAGE_LIMIT}&offset=0`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const payload: unknown = await res.json();

    let arr: NewsItemApi[] = [];

    if (Array.isArray(payload)) {
      arr = (payload as NewsItemApi[]) ?? [];
      totalPages =
        arr.length < PAGE_LIMIT ? 1 : 2;
      total = 0;
    } else {
      const p = payload as Partial<{
        data?: NewsItemApi[];
        total_pages?: number;
        total?: number;
      }>;
      arr = (p.data ?? []) as NewsItemApi[];
      totalPages = Number(p.total_pages ?? 0);
      total = Number(p.total ?? 0);
    }

    items = arr.map((n: NewsItemApi) => ({
      id: n.company_news_id,
      title: n.title,
      desc: n.content,
      category: n.category || "ทั่วไป",
      dateText: `เผยแพร่เมื่อวันที่ ${formatThaiDate(n.created_at)}`,
      created_at: n.created_at,
      photo: buildImageURL(n.company_news_photo, base),
      isNew: isNew(n.created_at),
    }));
  } catch (e: unknown) {
    console.error(e);
  }

  return (
    <section className="relative py-24 px-8 sm:px-12 md:px-32 lg:px-32 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-cyan-200/45 rounded-3xl rotate-45 animate-float" />
        <div
          className="absolute top-40 right-[15%] w-24 h-24 border-2 border-blue-200/45 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-20 h-20 border-2 border-cyan-300/45 rounded-2xl rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-48 right-[25%] w-28 h-28 border-2 border-blue-300/45 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-linear(#08a4b8 1px, transparent 1px), linear-linear(90deg, #08a4b8 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-200/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-200/30 to-transparent" />
        <div className="absolute top-10 right-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">
            ข่าวประกาศ
          </h2>
        </header>
      </div>

      <AllActivitiesClient
        initialItems={items}
        initialTotal={total}
        initialTotalPages={totalPages}
      />
    </section>
  );
}

