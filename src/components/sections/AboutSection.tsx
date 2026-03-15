/**
 * About 히어로 섹션
 * Figma 디자인 기반으로 구현
 *
 * 브레이크포인트:
 *   default (< 640px)   : 390×844 iPhone 기준 — 플로우 기반 레이아웃
 *   sm: (640px~1023px)  : 대형 모바일 / 태블릿 — 요소 크기 확대
 *   lg: (1024px~)       : 1920×1080 데스크탑 — 절대 위치 기반 레이아웃
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const llmItems = [
  { letter: 'L', title: 'Learn fast',        desc: '새로운 기술과 아이디어를 빠르게 학습이 가능한.' },
  { letter: 'L', title: 'Live in change',    desc: '새로운 환경과 변화에 빠르게 적응하는.' },
  { letter: 'M', title: 'Materialize ideas', desc: '배운 지식을 AI와 기술로 현실에 만드는.' },
]

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const AboutSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <SectionCard
      nav={
        <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
          <div className="text-[#61ba91] cursor-pointer">Home</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('projects')}>Projects</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('about')}>About</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('contact')}>Contact</div>
        </div>
      }
    >

      {/* ══ 모바일 레이아웃 (< lg) ══ */}
      <div className="lg:hidden flex flex-col items-center justify-center h-140 md:h-160 p-5 md:p-8 pt-16 pb-16 relative z-10">
        <div className="flex items-center justify-between gap-4 md:gap-6 w-full">

          {/* 텍스트 */}
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-white text-xl md:text-3xl" style={orbitron}>Hi, I am</p>
            <p className="font-bold text-white text-5xl md:text-7xl leading-none" style={orbitron}>LLM</p>
            <div className="text-white space-y-1 md:space-y-3 mt-1">
              {llmItems.map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] md:text-base font-bold">{item.letter} — {item.title}</p>
                  <p className="hidden md:block text-xs md:text-sm text-white/60 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3D 노트북 + 프로필 버튼 */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-32 md:w-60 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showProfile ? (
                  <motion.img
                    key="profile"
                    src="/assets/images/Profile.JPG"
                    alt="Profile"
                    className="w-full h-auto rounded-2xl object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.img
                    key="laptop"
                    alt="Laptop"
                    className="w-full h-auto"
                    src="/assets/images/3Dnotebook.png"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setShowProfile(p => !p)}
              className="px-3 py-1 text-[9px] md:text-xs font-bold rounded-full border border-[#61BA91] text-[#61BA91] hover:bg-[#61BA91] hover:text-black transition-colors cursor-pointer"
              style={orbitron}
            >
              {showProfile ? 'View Laptop' : 'View Profile'}
            </button>
          </div>

        </div>
      </div>

      {/* ══ 데스크탑 레이아웃 (lg+) ══ */}
      <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">

        {/* 중앙 콘텐츠 */}
        <div className="absolute inset-0 flex items-center justify-center">

          <div className="absolute left-[14%] top-[23%] z-10">
            <p className="text-white text-5xl" style={orbitron}>Hi, I am</p>
          </div>

          <div className="absolute left-[22%] top-[33%] z-10">
            <p className="font-bold text-white text-7xl" style={orbitron}>LLM</p>
          </div>

          <div className="absolute left-1/2 top-3/5 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="text-white space-y-4 text-left">
              {llmItems.map((item, i) => (
                <div key={i}>
                  <p className="mb-2 text-xl font-bold">{item.letter} — {item.title}</p>
                  <p className="mb-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-[8%] bottom-[15%] z-10 flex flex-col items-center gap-3">
            <div className="w-90 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showProfile ? (
                  <motion.img
                    key="profile-desk"
                    src="/assets/images/Profile.JPG"
                    alt="Profile"
                    className="w-75 h-auto rounded-2xl object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.img
                    key="laptop-desk"
                    alt="Laptop"
                    className="w-full h-auto"
                    src="/assets/images/3Dnotebook.png"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setShowProfile(p => !p)}
              className="px-4 py-1.5 text-xs font-bold rounded-full border border-[#61BA91] text-[#61BA91] hover:bg-[#61BA91] hover:text-black transition-colors cursor-pointer"
              style={orbitron}
            >
              {showProfile ? 'View Laptop' : 'View Profile'}
            </button>
          </div>

        </div>
      </div>

    </SectionCard>
  )
}

export default AboutSection
