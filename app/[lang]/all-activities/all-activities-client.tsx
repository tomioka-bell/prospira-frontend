"use client";

import { useMemo, useState, useTransition } from "react";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import type { NewsItem } from "../types/company-news";
import Link from "next/link";
import { useParams } from "next/navigation";

const PAGE_LIMIT = 6;

interface AllActivitiesClientProps {
  initialItems: NewsItem[];
  initialTotal: number;
  initialTotalPages: number;
}

export default function AllActivitiesClient({
  initialItems,
  initialTotal,
  initialTotalPages,
}: AllActivitiesClientProps) {
  const params = useParams();
  const lang = params.lang as string;

  const [items, setItems] = useState<NewsItem[]>(initialItems);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [total, setTotal] = useState<number>(initialTotal);
  const [, startTransition] = useTransition();

  const currentPage = Math.floor(offset / PAGE_LIMIT) + 1;

  const PAGE_NUMBERS = useMemo<number[]>(
    () => Array.from({ length: Math.max(totalPages, 0) }, (_, i) => i + 1),
    [totalPages]
  );

  const skeletons = useMemo<number[]>(
    () => Array.from({ length: PAGE_LIMIT }, (_, i) => i),
    []
  );

  const handlePageChange = (newOffset: number) => {
    startTransition(async () => {
      setLoading(true);
      setError("");
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const url = `${base}/api/company-news/get-company-news?limit=${PAGE_LIMIT}&offset=${newOffset}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const payload: unknown = await res.json();

        let arr: NewsItem[] = [];
        let tp = 0;
        let tt = 0;

        if (Array.isArray(payload)) {
          arr = payload as NewsItem[];
          tp = arr.length < PAGE_LIMIT ? Math.floor(newOffset / PAGE_LIMIT) + 1 : Math.floor(newOffset / PAGE_LIMIT) + 2;
          tt = 0;
        } else {
          const p = payload as Partial<{ data?: NewsItem[]; total_pages?: number; total?: number }>;
          arr = (p.data ?? []) as NewsItem[];
          tp = Number(p.total_pages ?? 0);
          tt = Number(p.total ?? 0);
        }

        setItems(arr);
        setTotalPages(tp);
        setTotal(tt);
        setOffset(newOffset);
      } catch (e: unknown) {
        console.error(e);
        setError("เกิดข้อผิดพลาดในการโหลดข่าว");
      } finally { 
        setLoading(false);
      }
    });
  };

  return (
    <div>
      {items.length === 0 && !loading && (
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-100 text-slate-500">
          ยังไม่มีข่าวในขณะนี้
        </div>
      )}

      {error && (
        <div className="text-center p-8 bg-red-50 text-red-600 rounded-2xl border border-red-100">
          {error}{" "}
          <button
            onClick={() => handlePageChange(offset)}
            className="ml-2 underline"
            aria-label="Retry"
          >
            ลองใหม่
          </button>
        </div>
      )}

      {loading && (
        <div className="grid md:grid-cols-3 gap-8">
          {skeletons.map((i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl animate-pulse"
            >
              <div className="h-6 w-24 bg-slate-200 rounded-full mb-4" />
              <div className="h-4 w-48 bg-slate-200 rounded mb-3" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 px-0 sm:px-6 md:px-12 lg:px-24">
          {items.map((item, index) => (
            <Link
              href={`/${lang}/company-news?title=${encodeURIComponent(item.title)}`}
              key={item.id ?? index}
              className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl" />
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-linear(90deg, #08a4b8, #06c8df, #08a4b8)",
                  padding: "2px",
                  WebkitMask: "linear-linear(#fff 0 0) content-box, linear-linear(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {item.isNew && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                  ใหม่
                </div>
              )}

              {item.photo && (
                <div className="relative z-10 mt-4 w-full overflow-hidden rounded-3xl mb-4">
                  <Image
                    src={item.photo}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                    priority={false}
                  />
                </div>
              )}

              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-linear-to-r from-cyan-100 to-blue-100 text-cyan-700 text-xs font-semibold rounded-full mb-4">
                  {item.category}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                  <CalendarOutlined />
                  <span className="font-medium">{item.dateText}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300 leading-tight">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-cyan-600 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                  <span>อ่านเพิ่มเติม</span>
                  <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 ease-out" />
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="text-center mt-16 flex items-center justify-center gap-3">
        <button
          aria-label="Previous page"
          onClick={() =>
            handlePageChange(Math.max(0, offset - PAGE_LIMIT))
          }
          disabled={loading || currentPage === 1}
          className="px-6 py-2 rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40 hover:bg-cyan-50 transition"
        >
          ก่อนหน้า
        </button>

        <div className="flex items-center gap-2">
          {PAGE_NUMBERS.map((p) => {
            const pageOffset = (p - 1) * PAGE_LIMIT;
            const isActive = currentPage === p;
            return (
              <button
                key={p}
                onClick={() => handlePageChange(pageOffset)}
                disabled={loading}
                className={[
                  "w-10 h-10 rounded-full border transition font-semibold",
                  isActive
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "border-cyan-300 text-cyan-700 hover:bg-cyan-50",
                ].join(" ")}
                aria-label={`Page ${p}`}
                aria-current={isActive ? "page" : undefined}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          aria-label="Next page"
          onClick={() => handlePageChange(offset + PAGE_LIMIT)}
          disabled={loading || (totalPages > 0 && currentPage === totalPages)}
          className="px-6 py-2 rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40 hover:bg-cyan-50 transition"
        >
          ถัดไป
        </button>
      </div>

      {total > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          {/* ทั้งหมด {total} รายการ  */}
        </div>
      )}
    </div>
  );
}
