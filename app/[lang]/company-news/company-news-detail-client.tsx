"use client";

import { useEffect, useState } from "react";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { NewsItemApi, RelatedNews } from "../types/company-news";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { buildImageURL } from "../utils/build-image-url";

function isAbortError(e: unknown): e is DOMException {
    return e instanceof DOMException && e.name === "AbortError";
}

function parseDate(input: string): Date | null {
    const d = new Date(input.includes("T") ? input : input.replace(" ", "T"));
    return isNaN(d.getTime()) ? null : d;
}

function formatThaiDate(input: string): string {
    const d = parseDate(input);
    if (!d) return input ?? "";
    return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
}

export default function CompanyNewsDetailClient() {
    const [data, setData] = useState<NewsItemApi | null>(null);
    const [relatedNews, setRelatedNews] = useState<RelatedNews[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const titleFromQuery = searchParams.get("title");
    const lang = pathname.split("/")[1];
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        if (!titleFromQuery) {
            setLoading(false);
            return;
        }

        const ac = new AbortController();
        (async () => {
            setLoading(true);
            setError("");
            try {
                const apiUrl = `${apiBaseUrl}/api/company-news/get-company-news-by-title?title=${encodeURIComponent(titleFromQuery)}`;
                const res = await fetch(apiUrl, { signal: ac.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const payload = await res.json();
                const raw: NewsItemApi =
                    payload?.data && typeof payload.data === "object" ? payload.data : payload;

                setData(raw ?? null);
                
                // Fetch related news
                const relatedRes = await fetch(`${apiBaseUrl}/api/company-news/get-company-news?limit=4&offset=0`, { signal: ac.signal });
                if (relatedRes.ok) {
                    const relatedPayload = await relatedRes.json();
                    const relatedList = Array.isArray(relatedPayload) ? relatedPayload : relatedPayload?.data || [];
                    setRelatedNews(relatedList.filter((n: RelatedNews) => n.company_news_id !== raw?.company_news_id).slice(0, 4));
                }
            } catch (e: unknown) {
                if (!isAbortError(e)) {
                    console.error(e);
                    setError("ไม่สามารถโหลดกิจกรรมได้ กรุณาลองใหม่อีกครั้ง");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, [titleFromQuery, apiBaseUrl]);

    const coverSrc = buildImageURL(data?.company_news_photo) || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop";

    return (
        <section className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 mt-14">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-linear-to-br from-[#08a4b8]/20 to-[#06b6d4]/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-linear-to-tl from-[#08a4b8]/20 to-[#06b6d4]/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {loading && (
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
                )}

                {!loading && error && (
                    <div className="p-8 bg-linear-to-br from-red-50 to-red-100/50 border border-red-200 rounded-3xl text-red-700 shadow-xl">
                        <p className="text-lg font-medium">{error}</p>
                    </div>
                )}

                {!loading && !error && !data && (
                    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl text-gray-600 shadow-xl">
                        <p className="text-lg">ไม่พบบทความกิจกรรมที่ต้องการ</p>
                    </div>
                )}

                {!loading && !error && data && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <article className="lg:col-span-2">
                            <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
                                {/* HERO */}
                                <div className="relative h-60 sm:h-[300px] md:h-[380px] lg:h-[480px] overflow-hidden group">
                                    <Image
                                        src={coverSrc}
                                        alt={data.title}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        priority
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
                                        <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-bold bg-white/35 backdrop-blur-sm text-cyan-700 shadow-lg">
                                            {data.category ?? "ทั่วไป"}
                                        </span>
                                    </div>
                                </div>

                                {/* BODY */}
                                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                                    {/* Meta */}
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <CalendarOutlined className="text-cyan-600 text-base sm:text-lg" />
                                            <span className="text-xs sm:text-sm font-medium">
                                                {formatThaiDate(data.created_at)}
                                            </span>
                                        </div>

                                        {data.username_creator && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-[10px] sm:text-sm font-bold">
                                                    {data.username_creator.charAt(0)}
                                                </div>
                                                <span className="text-xs sm:text-sm text-gray-600">
                                                    โดย <span className="font-medium text-gray-800">{data.username_creator}</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8">
                                        {data.title}
                                    </h1>

                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeSanitize]}
                                        components={{
                                            h1: (props) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                                            h2: (props) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
                                            ul: (props) => <ul className="list-disc ms-6 my-3" {...props} />,
                                            ol: (props) => <ol className="list-decimal ms-6 my-3" {...props} />,
                                            a: ({ children, ...props }) => (
                                                <a {...props} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                                                    {children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {data.content || ""}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar - Related News */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-linear-to-b from-cyan-500 to-blue-500 rounded-full"></span>
                                        กิจกรรมที่เกี่ยวข้อง
                                    </h2>

                                    <div className="space-y-4">
                                        {relatedNews.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">ไม่มีกิจกรรมที่เกี่ยวข้อง</p>
                                        ) : (
                                            relatedNews.map((news) => {
                                                const newsImage = buildImageURL(news.company_news_photo);
                                                return (
                                                    <Link
                                                        key={news.company_news_id}
                                                        href={`/${lang}/company-news?title=${encodeURIComponent(news.title)}`}
                                                        className="group flex gap-3 p-3 rounded-xl hover:bg-linear-to-br hover:from-cyan-50 hover:to-blue-50 transition-colors duration-300"
                                                    >
                                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                                            <Image
                                                                src={newsImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&h=100&fit=crop"}
                                                                alt={news.title}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                                sizes="64px"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                                                                {news.title}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                                <CalendarOutlined />
                                                                {formatThaiDate(news.created_at)}
                                                            </p>
                                                        </div>
                                                        <RightOutlined className="text-cyan-600 self-center text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                );
                                            })
                                        )}
                                    </div>

                                    <Link
                                        href={`/${lang}/all-activities`}
                                        className="group mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-[#08a4b8] to-[#06b6d4] text-white font-bold shadow-lg hover:shadow-xl hover:from-black hover:to-black transition-all duration-300"
                                    >
                                        <span>ดูกิจกรรมทั้งหมด</span>
                                        <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </section>
    );
}