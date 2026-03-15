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
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const projects = [
  { id: 0, name: 'CertificationBible', image: '/assets/images/CertificationBible.png', color: '#FFEDF0', imgScale: 1.8 },
  { id: 1, name: 'FakeHunters',        image: '/assets/images/FakeHunters.png',        color: '#D2F1FB', imgScale: 1.7 },
  { id: 2, name: 'Popspot(팝스팟)',    image: '/assets/images/Popspot.png',            color: '#D12AFE', imgScale: 1   },
]

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

/** layoutId 애니메이션 타이밍 */
const layoutTransition = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }

type HoveredPos = 'left' | 'center' | 'right' | null

interface CarouselProps {
  activeIndex: number
  setActiveIndex: (i: number) => void
  hoveredPos: HoveredPos
  setHoveredPos: (v: HoveredPos) => void
  gapClass: string
  centerWidth?: string
  sideWidth?: string
}

/**
 * 캐러셀 카드 3장 렌더 (모바일/데스크탑 공용)
 * - layoutId 기반 위치·크기 애니메이션
 * - 프로젝트별 배경색 + 이미지 기울기
 * - overflow-hidden 래퍼로 뒤쪽 이동 차단
 */
const CarouselCards = ({
  activeIndex,
  setActiveIndex,
  hoveredPos,
  setHoveredPos,
  gapClass,
  centerWidth = '42%',
  sideWidth = '22%',
}: CarouselProps) => {
  const len = projects.length
  const leftIdx  = (activeIndex - 1 + len) % len
  const rightIdx = (activeIndex + 1) % len

  const cardConfigs = [
    {
      project: projects[leftIdx],
      pos: 'left' as const,
      width: sideWidth,
      opacity: 0.7,
      scale: 0.95,
      hoverOpacity: 0.9,
      hoverScale: 0.97,
      boxShadow: 'none',
      onClick: () => { setActiveIndex(leftIdx); setHoveredPos(null) },
    },
    {
      project: projects[activeIndex],
      pos: 'center' as const,
      width: centerWidth,
      opacity: 1,
      scale: 1,
      hoverOpacity: 1,
      hoverScale: 1.02,
      boxShadow: '0 0 50px rgba(255,255,255,0.25), 0 0 100px rgba(255,255,255,0.08)',
      onClick: undefined,
    },
    {
      project: projects[rightIdx],
      pos: 'right' as const,
      width: sideWidth,
      opacity: 0.7,
      scale: 0.95,
      hoverOpacity: 0.9,
      hoverScale: 0.97,
      boxShadow: 'none',
      onClick: () => { setActiveIndex(rightIdx); setHoveredPos(null) },
    },
  ]

  return (
    <LayoutGroup id={`carousel-${gapClass}`}>
      {/* overflow-hidden 으로 애니메이션 중 카드가 영역 밖에 보이는 것 차단 */}
      <div className="overflow-hidden w-full">
        <div className={`flex items-center justify-center w-full ${gapClass}`}>
          {cardConfigs.map(({ project, pos, width, opacity, scale, hoverOpacity, hoverScale, boxShadow, onClick }) => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              layout
              transition={layoutTransition}
              className="relative cursor-pointer rounded-2xl overflow-hidden shrink-0"
              style={{ width, aspectRatio: '3 / 4', boxShadow, backgroundColor: project.color }}
              animate={{ opacity, scale }}
              whileHover={{ opacity: hoverOpacity, scale: hoverScale }}
              onClick={onClick}
              onHoverStart={() => setHoveredPos(pos)}
              onHoverEnd={() => setHoveredPos(null)}
            >
              {/* 기울어진 이미지 — rotate(30deg) + scale로 카드를 꽉 채움 */}
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ transform: `rotate(-30deg) scale(${project.imgScale})`, transformOrigin: 'center' }}
              />

              {/* hover 오버레이 */}
              <AnimatePresence>
                {hoveredPos === pos && (
                  <motion.div
                    key={`overlay-${pos}`}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className="text-white font-bold text-xs md:text-sm lg:text-base text-center px-3 leading-snug"
                      style={orbitron}
                    >
                      {project.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </LayoutGroup>
  )
}

/**
 * Projects Showcase 캐러셀 섹션
 */
const ProjectsSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredPos, setHoveredPos] = useState<HoveredPos>(null)

  const carouselProps = { activeIndex, setActiveIndex, hoveredPos, setHoveredPos }

  return (
    <SectionCard
      id="projects"
      nav={
        <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('home')}>Home</div>
          <div className="text-[#61BA91] cursor-pointer">Projects</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('about')}>About</div>
          <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer">Contact</div>
        </div>
      }
    >

      {/* ══ 모바일 레이아웃 (< lg) ══ */}
      <div className="lg:hidden flex flex-col items-center justify-center h-140 md:h-160 px-5 md:px-8 pt-16 pb-16 gap-4 md:gap-6 relative z-10">
        <p className="text-white font-bold text-xl md:text-3xl" style={orbitron}>Projects Showcase</p>
        <CarouselCards {...carouselProps} gapClass="gap-2 md:gap-3" />
      </div>

      {/* ══ 데스크탑 레이아웃 (lg+) ══ */}
      <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-16 z-10">
          <p className="text-white font-bold text-5xl" style={orbitron}>Projects Showcase</p>
          <CarouselCards {...carouselProps} gapClass="gap-6" centerWidth="28%" sideWidth="16%" />
        </div>
      </div>

    </SectionCard>
  )
}

export default ProjectsSection
