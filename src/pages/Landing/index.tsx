import { motion } from "framer-motion";
import { useAppStore } from "@/store";

/**
 * Landing 페이지 컴포넌트
 * 클릭 시 Home 페이지로 전환
 */
const LandingPage = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const mode = useAppStore((s) => s.mode)

  return (
    <main
      className="relative w-full h-screen overflow-hidden bg-bg hover:cursor-pointer"
      onClick={() => setCurrentPage('home')}
    >

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-text">

        {/* Video */}
        <video
          className="w-[90vw] sm:w-[65vw] max-w-full object-contain"
          src="/assets/video/landing.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.25em]"
        >
          PORTFOLIO
        </motion.h1>

        <p className={`mt-2 text-sm sm:text-lg ${mode === 'light' ? 'text-black/70' : 'text-white/80'}`}>
          A space where ideas come to life
        </p>

      </div>

    </main>
  );
};

export default LandingPage;
