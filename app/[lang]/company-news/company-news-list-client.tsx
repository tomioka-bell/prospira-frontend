"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { buildImageURL } from "../utils/build-image-url";
import Image from "next/image";

interface NewsItem {
  company_news_id: number;
  company_news_title: string;
  company_news_photo: string;
  company_news_short_description: string;
  company_news_date: string;
  lang: string;
}

export default function CompanyNewsListClient() {
  const searchParams = useSearchParams();
  const titleFromQuery = searchParams.get("title");
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${apiBaseUrl}/api/company-news/get-company-news?limit=100&offset=0`);
        
        if (res.ok) {
          const payload = await res.json();
          const newsList = Array.isArray(payload) ? payload : payload?.data || [];
          setAllNews(newsList);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // If title query param exists, redirect logic can be handled by JS
  if (titleFromQuery && !isLoading) {
    const selectedNews = allNews.find(n => n.company_news_title === titleFromQuery);
    if (selectedNews) {
      // Can implement detail view here if needed
    }
  }

  return (
    <>
      <Navbar />
      <main className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">ข่าวและกิจกรรม</h1>
          <div className="h-1 w-32 rounded-full bg-linear-to-r from-[#08a4b8] to-[#06a1b0] mx-auto mb-12"></div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">กำลังโหลด...</p>
            </div>
          ) : allNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">ไม่พบข่าวสาร</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allNews.map((news) => {
                const coverImage = buildImageURL(news.company_news_photo);
                return (
                  <Link 
                    key={news.company_news_id}
                    href={`?title=${encodeURIComponent(news.company_news_title)}`}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                      <div className="relative w-full h-48 bg-gray-200">
                        {coverImage && (
                          <Image
                            src={coverImage}
                            alt={news.company_news_title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {news.company_news_title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {news.company_news_short_description}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarOutlined />
                            {new Date(news.company_news_date).toLocaleDateString('th-TH')}
                          </span>
                          <RightOutlined className="text-[#08a4b8]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
