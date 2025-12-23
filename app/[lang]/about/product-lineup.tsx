"use client";
import overview from "../images/about/product-lineup.png";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProductLineup() {
  return (
    <section className="relative overflow-hidden">
      {/* BG: dark + grid + glow */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute inset-0 opacity-[0.15] mask-[radial-linear(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-linear(to_right,transparent_95%,rgba(255,255,255,.06)_95%),linear-linear(to_bottom,transparent_95%,rgba(255,255,255,.06)_95%)] bg-size-[24px_24px]" />
      </div>
      <div className="absolute -top-48 -left-40 `w-xl h-144 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-56 -right-40 w-160 h-160 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: copy + tags + CTA */}
          <motion.div variants={fadeUp} className="text-center lg:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="bg-linear-to-r from-white via-white to-cyan-200 bg-clip-text text-transparent drop-shadow">
                Product Lineup
              </span>
            </h2>

            <p className="text-slate-300/90 text-lg leading-relaxed">
              High-performance anti-vibration rubber solutions engineered for modern automotive
              platforms — combining durability, precision damping, and consistent quality control.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Engine Mounts",
                "Suspension Bushes",
                "Stabilizer Bushes",
                "Cabin NVH",
                "OEM-Grade",
                "Durability 1000h+",
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-200 border border-white/10 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-3">
              <a
                href="/assets/catalog/product-lineup.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-cyan-500 to-teal-400 text-slate-900 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.03] transition duration-300"
              >
                Download Catalog
              </a>
            </div>
          </motion.div>

          {/* Right: image card (glass + border glow) */}
          <motion.div
            variants={fadeUp}
            className="relative"
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-cyan-500/30 to-teal-400/30 blur-xl" />
            <div className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-x-0 -top-24 h-48 bg-linear-to-b from-cyan-500/15 to-transparent pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Image 
                  src={overview}
                  alt="Product lineup"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                  loading="lazy"
                />
              </motion.div>
              <div className="p-4 sm:p-6 border-t border-white/10">
                <p className="text-sm text-slate-300">
                  Designed for NVH excellence • Tested to global OEM standards • Traceable QA
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
