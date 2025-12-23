"use client";
import { useMemo, useState } from "react";
import "../css/company-news.css";
import type { NewsItem } from "../types/company-news";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { LeftOutlined, RightOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import Image from 'next/image'
import { usePathname } from "next/navigation";

const PAGE_LIMIT = 6;

interface CompanyNewsClientProps {
  initialItems: NewsItem[];
  initialError: string | null;
}

export default function CompanyNewsClient({ initialItems, initialError }: CompanyNewsClientProps) {
  const [items] = useState<NewsItem[]>(initialItems);
  const [loading] = useState(false);
  const [error] = useState<string | null>(initialError);
  const location = usePathname();
  const lang = location.split("/")[1];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [slidesLength, setSlidesLength] = useState(0);
  const { t } = useTranslation();

  const skeletons = useMemo<number[]>(() => Array.from({ length: PAGE_LIMIT }, (_, i) => i), []);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      mode: "free-snap",
      slides: { perView: 1, spacing: 20 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 24 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 32 } },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
        setSlidesLength(slider.track.details.slides.length);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: number | undefined;
        let mouseOver = false;

        const clearNextTimeout = () => {
          if (timeout) window.clearTimeout(timeout);
        };
        const nextTimeout = () => {
          clearNextTimeout();
          if (mouseOver) return;
          timeout = window.setTimeout(() => slider.next(), 3000);
        };

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });

          const obs = new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting) nextTimeout();
              else clearNextTimeout();
            },
            { threshold: 0.2 }
          );
          obs.observe(slider.container);

          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  if (loading || error || items.length === 0) return null;

  return (
    <section className="relative py-24 px-8 sm:px-12 md:px-32 lg:px-32 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-cyan-200/45 rounded-3xl rotate-45 animate-float" />
        <div className="absolute top-40 right-[15%] w-24 h-24 border-2 border-blue-200/45 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-[20%] w-20 h-20 border-2 border-cyan-300/45 rounded-2xl rotate-12 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-48 right-[25%] w-28 h-28 border-2 border-blue-300/45 rounded-full animate-float" style={{ animationDelay: "3s" }} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#08a4b8 1px, transparent 1px), linear-gradient(90deg, #08a4b8 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-200/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-200/30 to-transparent" />
        <div className="absolute top-10 right-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">{t("section_title")}</h2>
        </header>
      </div>

      {loading && (
        <div className="grid md:grid-cols-3 gap-8">
          {skeletons.map((i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl animate-pulse">
              <div className="h-6 w-24 bg-slate-200 rounded-full mb-4" />
              <div className="h-4 w-48 bg-slate-200 rounded mb-3" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center p-8 bg-red-50 text-red-600 rounded-2xl border border-red-100">
          {error}{" "}
          <button aria-label="Retry" className="ml-2 underline">
            ลองใหม่
          </button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-100 text-slate-500">ยังไม่มีข่าวในขณะนี้</div>
      )}

      <div ref={sliderRef} className="keen-slider">
        {items.map((item, index) => (
          <div key={item.id ?? index} className="keen-slider__slide py-6">
            <Link
              href={`/${lang}/company-news?title=${encodeURIComponent(item.title)}`}
              className="group relative flex flex-col h-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-sm hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl" />

              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, #08a4b8, #06c8df, #08a4b8)",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {item.isNew && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse z-20">
                  ใหม่
                </div>
              )}

              {item.photo && (
                <div className="relative z-10 mb-4">
                  <div className="w-full rounded-2xl overflow-hidden aspect-video">
                    <Image
                      src={item.photo}
                      alt={item.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  <CalendarOutlined />
                  <span className="font-medium">{item.dateText}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300 leading-tight">
                  {item.title}
                </h3>

                <div className="flex-1" />

                <div className="flex items-center gap-2 text-cyan-600 font-semibold text-sm group-hover:gap-4 transition-all duration-300 pt-4">
                  <span>อ่านเพิ่มเติม</span>
                  <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 ease-out" />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {loaded && slidesLength > 0 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-30 w-12 h-12 bg-white hover:bg-cyan-500 text-gray-800 hover:text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 0}
          >
            <LeftOutlined className="text-lg" />
          </button>

          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-30 w-12 h-12 bg-white hover:bg-cyan-500 text-gray-800 hover:text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === slidesLength - 1}
          >
            <RightOutlined className="text-lg" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {loaded && slidesLength > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: slidesLength }).map((_, idx) => (
            <button
              aria-label={`Dot ${idx + 1}`}
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`transition-all duration-300 rounded-full ${currentSlide === idx
                  ? "w-8 h-2 bg-linear-to-r from-cyan-500 to-blue-500"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>
      )}


      <div className="text-center mt-16 flex items-center justify-center gap-3">
        <a
          href={`/${lang}/all-activities`}
          className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#08a4b8] text-white font-bold text-lg shadow-2xl hover:shadow-[#08a4b8]/50 hover:scale-105 transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">ดูกิจกรรมทั้งหมด</span>
          <RightOutlined className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
