import logo from "../images/logo_footer.png";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden flex items-center justify-center">
        {/* วิดีโอพื้นหลัง */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Contact US.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/fallback.jpg"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />

        {/* ข้อความบนแบนเนอร์ */}
        <div className="relative z-10 text-center px-4">
          <div className="flex justify-center mt-[20vh]">
            <Image src={logo} alt="Logo" className="h-10 sm:h-12 lg:h-14 w-auto drop-shadow-lg" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-cyan-400 to-cyan-600 shadow-lg"></div>
      </section>
    </header>
  )
}