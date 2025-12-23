import type { NewsItemApi, NewsItem } from "../types/company-news";
import { buildImageURL } from "../utils/get-image";
import CompanyNewsClient from "./company-news-client";

const PAGE_LIMIT = 6;
const NEW_DAYS = 14;

function parseDate(input: string): Date | null {
  const d = new Date(input.includes("T") ? input : input.replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

function formatThaiDate(input: string): string {
  const d = parseDate(input);
  if (!d) return input ?? "";
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
}

function isNew(createdAt: string): boolean {
  const d = parseDate(createdAt);
  if (!d) return false;
  const diffDays = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_DAYS;
}

export default async function CompanyNews() {
  let initialItems: NewsItem[] = [];
  let initialError: string | null = null;

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
    const url = `${apiBaseUrl}/api/company-news/get-company-news?limit=${PAGE_LIMIT}&offset=0`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: unknown = await res.json();
    const arr = Array.isArray(data) ? (data as NewsItemApi[]) : (data as { data?: NewsItemApi[] })?.data ?? [];

    const mapped: NewsItem[] = arr.map((n: NewsItemApi) => ({
      id: n.company_news_id,
      title: n.title,
      desc: n.content,
      category: n.category || "ทั่วไป",
      dateText: `เผยแพร่เมื่อวันที่ ${formatThaiDate(n.created_at)}`,
      created_at: n.created_at,
      photo: buildImageURL(n.company_news_photo, apiBaseUrl),
      isNew: isNew(n.created_at),
    }));

    initialItems = mapped;
  } catch (err) {
    console.error('Error fetching company news on server:', err);
    initialError = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข่าว';
  }

  return (
    <CompanyNewsClient initialItems={initialItems} initialError={initialError} />
  );
}
