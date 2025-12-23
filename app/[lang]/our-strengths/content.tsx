"use client";
import icon_technology from "../images/icon-strengths/technology.png";
import icon_production from "../images/icon-strengths/production.png";
import icon_qa from "../images/icon-strengths/qa.png";
import icon_customer from "../images/icon-strengths/service.png";
import { useTranslation } from "react-i18next";
import Image from 'next/image'
import { FileTextOutlined, BgColorsOutlined, CheckCircleOutlined, TeamOutlined, ShoppingOutlined, BankOutlined, SafetyOutlined } from "@ant-design/icons";

export default function Content() {
    const { t } = useTranslation();
    const strengths = [
        {
            title: t("strength1_title"),
            desc: t("strength1_desc"),
            icon: (
                <Image src={icon_technology} alt="Technology" className="w-8 h-8" />
            ),
            linear: "from-[#08a4b8] to-[#06b6d4]",
        },
        {
            title: t("strength2_title"),
            desc: t("strength2_desc"),
            icon: (
                <Image src={icon_production} alt="Production" className="w-8 h-8" />
            ),
            linear: "from-[#08a4b8] to-[#0891b2]",
        },
        {
            title: t("strength3_title"),
            desc: t("strength3_desc"),
            icon: (
                <Image src={icon_qa} alt="QA" className="w-8 h-8" />
            ),
            linear: "from-[#06b6d4] to-[#08a4b8]",
        },
        {
            title: t("strength4_title"),
            desc: t("strength4_desc"),
            icon: (
                <Image src={icon_customer} alt="Customer" className="w-8 h-8" />
            ),
            linear: "from-[#08a4b8] to-[#0891b2]",
        },
    ];

    return (
        <section className="relative bg-linear-to-br from-slate-50 via-[#08a4b8]/5 to-[#06b6d4]/10 py-20 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#08a4b8]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-linear-to-r from-[#08a4b8]/5 to-[#06b6d4]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header Badge with animation */}
                <div className="flex justify-center mb-6 animate-fade-in">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-[#08a4b8] to-[#06b6d4] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative text-gray-800 px-8 py-3 rounded-full text-sm font-bold bg-white/80 backdrop-blur-sm border-2 border-[#08a4b8]/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                         Our Strengths
                        </div>
                    </div>
                </div>

                {/* Main Title with linear */}
                <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 animate-fade-in-up">
                    <span className="bg-linear-to-r from-[#08a4b8] via-[#06b6d4] to-[#0891b2] bg-clip-text text-transparent">
                        จุดแข็งของเรา
                    </span>
                    <br />
                    <span className="text-3xl md:text-4xl text-gray-600 font-semibold mt-2 inline-block">
                        Our Strengths
                    </span>
                </h1>

                {/* Strength Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {strengths.map((s, i) => (
                        <div
                            key={i}
                            className="group relative animate-fade-in-up"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {/* Glow effect */}
                            <div className={`absolute -inset-0.5 bg-linear-to-r ${s.linear} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                            
                            {/* Card */}
                            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/60 hover:-translate-y-3 overflow-hidden h-full">
                                {/* Animated background linear */}
                                <div className={`absolute inset-0 bg-linear-to-br ${s.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                
                                {/* Number badge */}
                                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 text-gray-400 font-bold text-base flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-md">
                                    {i + 1}
                                </div>

                                <div className="relative z-10">
                                    {/* Icon container with enhanced animation */}
                                    <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${s.linear} text-white grid place-items-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                                        <div className="group-hover:scale-110 transition-transform duration-300">
                                            {s.icon}
                                        </div>
                                    </div>
                                    
                                    {/* Title with linear on hover */}
                                    <h3 className={`font-bold text-gray-800 text-xl mb-4 group-hover:bg-linear-to-r ${s.linear} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                                        {s.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                                </div>
                                
                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 w-0 h-1.5 bg-linear-to-r ${s.linear} group-hover:w-full transition-all duration-700`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Section with glassmorphism */}
                <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-10 md:p-14 shadow-2xl border border-white/80 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-[#08a4b8]/20 to-transparent rounded-tl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-[#06b6d4]/20 to-transparent rounded-br-3xl"></div>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        {/* Introduction */}
                        <div className="bg-linear-to-r from-[#08a4b8]/10 to-[#06b6d4]/10 p-8 rounded-2xl border-2 border-[#08a4b8]/30">
                            <p className="text-lg leading-relaxed">
                                <strong className="text-[#08a4b8] text-xl">Prospera</strong> มีประวัติศาสตร์อันยาวนานตั้งแต่สมัยที่เป็นส่วนหนึ่งของ
                                <strong className="text-[#0891b2]"> Bridgestone</strong> ซึ่งเป็นรากฐานของเทคโนโลยีที่เชื่อถือได้และได้รับการพิสูจน์แล้ว
                            </p>
                        </div>

                        {/* Key Message */}
                        <div className="bg-[#08a4b8]/5 p-8 rounded-2xl border-l-4 border-[#08a4b8]">
                            <p className="text-lg font-semibold text-[#08a4b8]">
                                <CheckCircleOutlined className="mr-2 text-xl text-[#08a4b8]" /> <span className="ml-2">แต่เท่านั้นยังไม่พอ!</span>
                            </p>
                            <p className="text-lg mt-3 text-gray-700">
                                บริษัทใหม่แห่งนี้ถูกสร้างขึ้นโดยพนักงานทุกคน
                                เพื่อให้สามารถสร้างสรรค์สิ่งใหม่ ๆ และสร้างมูลค่าใหม่ ๆ ได้มากขึ้น
                            </p>
                        </div>

                        {/* Main Concept */}
                        <div className="bg-linear-to-r from-[#08a4b8] to-[#06b6d4] text-white p-8 rounded-2xl shadow-xl">
                            <p className="text-center text-xl font-bold leading-relaxed">
                                <BankOutlined className="mr-2 text-2xl" /> ประสบการณ์อันยาวนานและสภาพแวดล้อมใหม่ ๆ นี่แหละคือสิ่งที่หล่อหลอมให้ <span className="text-yellow-300">Prospera แข็งแกร่ง</span>
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="pt-4 border-t-2 border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-10 bg-linear-to-b from-[#08a4b8] to-[#06b6d4] rounded-full"></div>
                                <h2 className="text-3xl font-bold bg-linear-to-r from-[#08a4b8] to-[#0891b2] bg-clip-text text-transparent">
                                    ประวัติและเทคโนโลยี
                                </h2>
                            </div>
                            <div className="space-y-4 pl-8 bg-[#08a4b8]/5 p-6 rounded-xl">
                                <div className="flex gap-4">
                                    <FileTextOutlined className="text-3xl text-cyan-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800 mb-2">ยา 86 ปี ของประวัติศาสตร์</p>
                                        <p className="text-gray-700">
                                            ธุรกิจยางกันสั่นสะเทือน (Vibration Control Rubber) ของ Prospera
                                            มีประวัติศาสตร์การออกแบบและพัฒนาเทคโนโลยีที่เชื่อถือได้มากกว่า 86 ปี
                                            ทำให้มีเทคโนโลยีอยู่ในระดับโลกชั้นนำ (World-Class)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <SafetyOutlined className="text-3xl text-cyan-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800 mb-2">รักษาภูมิปัญญา (Know-how)</p>
                                        <p className="text-gray-700">
                                            แม้จะเปลี่ยนมาเป็นบริษัทใหม่ แต่เรายังคงรักษาภูมิปัญญา นั้นไว้
                                            เพื่อสานต่อปรัชญาองค์กรที่ว่า <em className="text-cyan-700 font-semibold">&quot;การสร้างคุณูปการต่อสังคมด้วยคุณภาพที่ดีที่สุด&quot;</em>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="pt-4 border-t-2 border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-10 bg-linear-to-b from-[#08a4b8] to-[#0891b2] rounded-full"></div>
                                <h2 className="text-3xl font-bold bg-linear-to-r from-[#08a4b8] to-[#0891b2] bg-clip-text text-transparent">
                                    4 องค์ประกอบแห่งความแข็งแกร่ง
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 pl-8">
                                {[
                                    { icon: BgColorsOutlined, title: "พัฒนา", desc: "ศักยภาพในการพัฒนา (Development Capability)" },
                                    { icon: ShoppingOutlined, title: "ตอบโจทย์", desc: "ผลิตภัณฑ์ที่ตอบโจทย์ความต้องการเฉพาะบุคคล (Individual Needs)" },
                                    { icon: BankOutlined, title: "ซัพพลายเชน", desc: "ระบบซัพพลายเชน (Supply Chain) ที่มีประสิทธิภาพสูง" },
                                    { icon: SafetyOutlined, title: "ความปลอดภัย", desc: "ความมุ่งมั่นในเรื่องความปลอดภัยและคุณภาพ" },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 bg-linear-to-br from-[#08a4b8]/10 to-[#06b6d4]/10 rounded-xl border-2 border-[#08a4b8]/30 hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex items-start gap-3">
                                            <item.icon className="text-3xl text-[#08a4b8] shrink-0" />
                                            <div>
                                                <p className="font-bold text-[#08a4b8] text-lg mb-1">{item.title}</p>
                                                <p className="text-gray-700 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-6 bg-[#08a4b8]/5 rounded-xl border-l-4 border-[#08a4b8]">
                                <p className="text-lg font-semibold text-[#08a4b8] mb-3"><BankOutlined className="mr-2" />การจัดการแบบองค์รวม (Integrated Supply Chain)</p>
                                <p className="text-gray-700 mb-3">
                                    การจัดซื้อ การผลิต และการขนส่งแบบองค์รวม ช่วยให้เรา:
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="flex items-start gap-2 text-gray-700">
                                        <span className="text-[#08a4b8] font-bold mt-1">✓</span>
                                        <span><strong>มั่นคง</strong> - จัดหาสินค้าอย่างต่อเนื่องและน่าเชื่อถือ</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-gray-700">
                                        <span className="text-blue-500 font-bold mt-1">✓</span>
                                        <span><strong>คล่องตัว</strong> - ประสานงานกับฐานการผลิตทั้งในและต่างประเทศ</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-gray-700">
                                        <span className="text-blue-500 font-bold mt-1">✓</span>
                                        <span><strong>มีประสิทธิภาพ</strong> - ควบคุมกิจกรรมจากวัตถุดิบถึงการขนส่ง (Logistics)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="pt-4 border-t-2 border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-10 bg-linear-to-b from-[#08a4b8] to-[#0891b2] rounded-full"></div>
                                <h2 className="text-3xl font-bold bg-linear-to-r from-[#08a4b8] to-[#0891b2] bg-clip-text text-transparent">
                                    การบริหารคุณภาพ (Quality Management)
                                </h2>
                            </div>
                            
                            <div className="bg-linear-to-br from-[#08a4b8]/10 to-[#06b6d4]/10 p-8 rounded-2xl border-2 border-[#08a4b8]/30">
                                <div className="flex items-start gap-4 mb-6">
                                    <FileTextOutlined className="text-4xl text-[#08a4b8] shrink-0" />
                                    <div>
                                        <p className="text-lg font-bold text-[#08a4b8] mb-2">คำประกาศด้านคุณภาพ (Quality Declaration)</p>
                                        <p className="text-gray-700">
                                            เพื่อให้บรรลุปรัชญาขององค์กรที่ว่า &quot;การสร้างคุณูปการต่อสังคมด้วยคุณภาพที่ดีที่สุด&quot;
                                            Prospera ได้กำหนดคำประกาศนี้ขึ้น
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white/80 p-6 rounded-xl border-l-4 border-[#08a4b8]">
                                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
                                        <CheckCircleOutlined className="mr-2 text-xl text-[#08a4b8]" /><strong>เป้าหมายของเรา ไม่ใช่แค่กระบวนการผลิต</strong>
                                    </p>
                                    <p className="text-gray-700 mb-3">
                                        แต่คือการมุ่งมั่นแสวงหาและมอบสิ่งที่ดีที่สุดสำหรับลูกค้า ในทุกกิจกรรมของบริษัท:
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                                        {[
                                            { icon: ShoppingOutlined, label: "ผลิตภัณฑ์" },
                                            { icon: TeamOutlined, label: "บริการ" },
                                            { icon: BgColorsOutlined, label: "เทคโนโลยี" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-4 bg-[#08a4b8]/20 rounded-lg text-center">
                                                <item.icon className="text-3xl mb-2 text-[#08a4b8] flex justify-center" />
                                                <p className="font-semibold text-[#08a4b8]">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                    animation-fill-mode: both;
                }
            `}</style>
        </section>
    );
}