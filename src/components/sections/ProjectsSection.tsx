/**
 * Projects 섹션 컴포넌트
 * AboutSection과 동일한 카드 구조/크기/반응형 적용
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

const projects = [
  { id: 0, name: 'CertificationBible', image: '/assets/images/CertificationBible.png' },
  { id: 1, name: 'FakeHunters', image: '/assets/images/FakeHunters.png' },
  { id: 2, name: 'Popspot(팝스팟)', image: '/assets/images/Popspot.png' },
]

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

type HoveredPos = 'left' | 'center' | 'right' | null

/**
 * 캐러셀 카드 3장 렌더 (모바일/데스크탑 공용)
 */
const CarouselCards = ({
  left, center, right,
  hoveredPos, setHoveredPos,
  handleLeftClick, handleRightClick,
  activeIndex, setActiveIndex,
  gapClass,
  centerWidth = '42%',
  sideWidth = '22%',
}: {
  left: typeof projects[0]
  center: typeof projects[0]
  right: typeof projects[0]
  hoveredPos: HoveredPos
  setHoveredPos: (v: HoveredPos) => void
  handleLeftClick: () => void
  handleRightClick: () => void
  activeIndex: number
  setActiveIndex: (i: number) => void
  gapClass: string
  centerWidth?: string
  sideWidth?: string
}) => (
  <div className={`flex flex-col items-center w-full gap-4 md:gap-6`}>
    <div className={`flex items-center justify-center w-full ${gapClass}`}>

      {/* 왼쪽 카드 */}
      <motion.div
        className="relative cursor-pointer rounded-2xl overflow-hidden flex-shrink-0"
        style={{ width: sideWidth, aspectRatio: '3 / 4' }}
        animate={{ opacity: 0.65, scale: 0.95 }}
        whileHover={{ opacity: 0.85, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={handleLeftClick}
        onHoverStart={() => setHoveredPos('left')}
        onHoverEnd={() => setHoveredPos(null)}
      >
        <img src={left.image} alt={left.name} className="w-full h-full object-cover rounded-2xl" />
        <AnimatePresence>
          {hoveredPos === 'left' && (
            <motion.div
              key="left-overlay"
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-xs md:text-sm text-center px-2 leading-snug" style={orbitron}>
                {left.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 가운데 카드 (활성) */}
      <motion.div
        className="relative cursor-pointer rounded-2xl overflow-hidden flex-shrink-0"
        style={{
          width: centerWidth,
          aspectRatio: '3 / 4',
          boxShadow: '0 0 50px rgba(255,255,255,0.25), 0 0 100px rgba(255,255,255,0.08)',
        }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setHoveredPos('center')}
        onHoverEnd={() => setHoveredPos(null)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={center.id}
            src={center.image}
            alt={center.name}
            className="w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
        <AnimatePresence>
          {hoveredPos === 'center' && (
            <motion.div
              key="center-overlay"
              className="absolute inset-0 bg-black/45 flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-sm md:text-lg lg:text-xl text-center px-4 leading-snug" style={orbitron}>
                {center.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 오른쪽 카드 */}
      <motion.div
        className="relative cursor-pointer rounded-2xl overflow-hidden flex-shrink-0"
        style={{ width: sideWidth, aspectRatio: '3 / 4' }}
        animate={{ opacity: 0.65, scale: 0.95 }}
        whileHover={{ opacity: 0.85, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={handleRightClick}
        onHoverStart={() => setHoveredPos('right')}
        onHoverEnd={() => setHoveredPos(null)}
      >
        <img src={right.image} alt={right.name} className="w-full h-full object-cover rounded-2xl" />
        <AnimatePresence>
          {hoveredPos === 'right' && (
            <motion.div
              key="right-overlay"
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-xs md:text-sm text-center px-2 leading-snug" style={orbitron}>
                {right.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>

    {/* 인디케이터 도트 */}
    <div className="flex gap-2">
      {projects.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#61BA91] w-5' : 'bg-white/40 w-2'}`}
          aria-label={`Go to project ${i + 1}`}
        />
      ))}
    </div>
  </div>
)

/**
 * Projects Showcase 캐러셀 섹션
 */
const ProjectsSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredPos, setHoveredPos] = useState<HoveredPos>(null)

  const len = projects.length
  const left = projects[(activeIndex - 1 + len) % len]
  const center = projects[activeIndex]
  const right = projects[(activeIndex + 1) % len]

  /** 왼쪽 카드 클릭 */
  const handleLeftClick = () => { setActiveIndex((p) => (p - 1 + len) % len); setHoveredPos(null) }
  /** 오른쪽 카드 클릭 */
  const handleRightClick = () => { setActiveIndex((p) => (p + 1) % len); setHoveredPos(null) }

  const carouselProps = { left, center, right, hoveredPos, setHoveredPos, handleLeftClick, handleRightClick, activeIndex, setActiveIndex }

  return (
    <SectionCard
      id="projects"
      nav={
        <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('home')}>Home</div>
          <div className="text-[#61BA91] cursor-pointer">Projects</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer">About</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer">Contact</div>
        </div>
      }
    >

          {/* ══════════════════════════════════════════════
              모바일 레이아웃  (< lg / 1024px 미만)
              ─ 390×844 iPhone     : default
              ─ 640px~1023px 태블릿 : sm: 확대 적용
              플로우 기반 — 절대위치 없음, 겹침 없음
          ══════════════════════════════════════════════ */}
          <div className="lg:hidden flex flex-col justify-between h-140 md:h-160 p-5 md:p-8 relative z-10">

            {/* ① 상단: Birth / Gender */}
            <div className="flex flex-col gap-0.5 text-white text-[10px] md:text-xs" style={orbitron}>
              <p><span className="text-[#61ba91]">Birth </span> ~ <span className="font-bold">00.11.21</span></p>
              <p><span className="text-[#61ba91]">Gender ~ </span> <span className="font-bold">female</span></p>
            </div>

            {/* ② 중앙: 타이틀 + 캐러셀 */}
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <p className="text-white font-bold text-xl md:text-3xl" style={orbitron}>Projects Showcase</p>
              <CarouselCards {...carouselProps} gapClass="gap-2 md:gap-3" />
            </div>

            {/* ③ 하단: 좌측 연락처 | 우측 위치 */}
            <div className="flex justify-between items-end gap-2">
              <div className="flex flex-col gap-0.5 text-white text-[9px] md:text-[11px] min-w-0" style={orbitron}>
                <p><span className="text-[#61ba91]">Github ~ </span><span className="font-bold">ggomiyyomi</span></p>
                <p><span className="text-[#61ba91]">Email ~ </span><span className="font-bold">heejung9865@naver.com</span></p>
              </div>
              <div className="flex flex-col gap-0.5 text-white text-[9px] md:text-[11px] text-right shrink-0" style={orbitron}>
                <p><span className="font-bold">Expected [08, 26]</span><span className="text-[#61ba91]"> ~ Education</span></p>
                <p><span className="font-bold">Incheon, Korea</span><span className="text-[#61ba91]"> ~ Location</span></p>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════
              데스크탑 레이아웃  (lg: 1024px~ / 1920×1080)
              절대 위치 기반 — AboutSection과 동일 구조
          ══════════════════════════════════════════════ */}
          <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">

            {/* 상단 좌측: Birth / Gender */}
            <div className="absolute top-8 left-8 flex flex-col gap-1 text-white text-xs z-20" style={orbitron}>
              <p className="mb-0"><span className="text-[#61ba91]">Birth </span> ~ <span className="font-bold">00.11.21</span></p>
              <p className="mb-0"><span className="text-[#61ba91]">Gender ~ </span> <span className="font-bold">female</span></p>
            </div>

            {/* 하단 우측: Graduation / Location */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-1 text-white text-xs text-right z-20" style={orbitron}>
              <p className="mb-0">
                <span className="font-bold">Expected Graduation: [08, 26]</span>
                <span className="text-[#61ba91]"> ~ Education</span>
              </p>
              <p className="mb-0">
                <span className="font-bold">Incheon, Korea</span>
                <span className="text-[#61ba91]"> ~ Location</span>
              </p>
            </div>

            {/* 하단 좌측: Github / Email */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-1 text-white text-xs z-20" style={orbitron}>
              <p className="mb-0"><span className="text-[#61ba91]">Github ~ </span>ggomiyyomi</p>
              <p className="mb-0"><span className="text-[#61ba91]">Email ~ </span>heejung9865@naver.com</p>
            </div>

            {/* 중앙 콘텐츠 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-16 z-10">
              <p className="text-white font-bold text-5xl" style={orbitron}>Projects Showcase</p>
              <CarouselCards {...carouselProps} gapClass="gap-6" centerWidth="28%" sideWidth="16%" />
            </div>

          </div>

    </SectionCard>
  )
}

export default ProjectsSection
