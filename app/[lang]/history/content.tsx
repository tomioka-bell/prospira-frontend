"use client";
import { motion } from "framer-motion";
import "../css/history.css";


export default function HistoryContent() {
    const timelineData = [
        {
            year: "1987",
            title: "Bridgestone APM Established",
            desc: "Bridgestone APM established as a joint venture (Clevite-Bridgestone company) owned by Clevite Elastomers of Milan, Ohio and Bridgestone Corporation of Tokyo Japan.",
        },
        {
            year: "1988",
            title: "Bridgestone APM Begins Manufacturing",
            desc: "Manufacturing operations begin at the Clevite Elastomers plant in Angola, Indiana with three injection presses and 3,000 sq ft of workspace.",
        },
        {
            year: "1991",
            title: "Expansion to Findlay, Ohio",
            desc: "The Findlay, Ohio facility is established and manufacturing operations are moved to Findlay.",
        },
        {
            year: "1993",
            title: "Wholly-owned Subsidiary",
            desc: "Bridgestone Corporation of Japan purchased all shares of the joint venture, establishing BAPM as a wholly-owned subsidiary.",
        },
        {
            year: "1996",
            title: "BAPM Expands Operations",
            desc: "Expanded operations to Upper Sandusky, Ohio, producing similar products as well as performing metal coating operations.",
        },
        {
            year: "2010",
            title: "Consolidation of Operations",
            desc: "Consolidated all Anti-Vibration Division operations and established a new headquarters office building in Findlay, Ohio.",
        },
        {
            year: "2022",
            title: "Acquired by Zhong Ding Incorporated",
            desc: "BAPM Anti-Vibration Division is acquired by Zhong Ding Incorporated and renamed to Prospira America Corporation.",
        },
    ];

    return (
        <div>
            <section className="relative py-24 px-4 sm:px-12 md:px-32 lg:px-32 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
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
                                "linear-linear(#08a4b8 1px, transparent 1px), linear-linear(90deg, #08a4b8 1px, transparent 1px)",
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

                <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="relative bg-linear-to-br from-cyan-50 via-white to-blue-50 rounded-2xl sm:rounded-3xl py-12 sm:py-16 lg:py-20 overflow-hidden">
                        {/* Background decorations */}
                        <div className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

                        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                            <header className="mb-12 sm:mb-16 lg:mb-20 text-center">
                                <div className="inline-block">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                                        Our History
                                    </h2>
                                    <div className="h-1 sm:h-1.5 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full" />
                                </div>
                                <p className="text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
                                    Journey through our milestones and achievements
                                </p>
                            </header>

                            <div className="relative">
                                {/* Timeline line with linear - hidden on mobile, visible on sm+ */}
                                <div className="hidden sm:block absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500 via-blue-500 to-cyan-500" />

                                {timelineData.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.15 }}
                                        viewport={{ once: true }}
                                        className="relative mb-8 sm:mb-12 lg:mb-16 sm:ml-16 lg:ml-[4.3rem]"
                                    >
                                        {/* Animated dot - hidden on mobile */}
                                        <motion.span
                                            className="hidden sm:flex absolute -left-11 lg:-left-13 items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full ring-4 ring-white shadow-lg"
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse" />
                                        </motion.span>

                                        {/* Card */}
                                        <motion.div
                                            className="group bg-white/80 backdrop-blur-sm shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-cyan-100/50 hover:border-cyan-300 transition-all duration-300 relative overflow-hidden"
                                            whileHover={{
                                                y: -5,
                                                boxShadow: "0 25px 50px -12px rgba(8, 164, 184, 0.25)"
                                            }}
                                        >
                                            {/* linear overlay on hover */}
                                            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="relative">
                                                {/* Year badge */}
                                                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md mb-3 sm:mb-4">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    {item.year}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4 group-hover:from-cyan-700 group-hover:to-blue-700 transition-all duration-300 wrap-break-word">
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg wrap-break-word">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* Decorative corner */}
                                            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-linear-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}