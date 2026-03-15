/**
 * SectionCard 공용 카드 래퍼 컴포넌트
 * AboutSection / ProjectsSection 등 공통 카드 레이아웃 제공
 *
 * - dot-grid + glass 배경
 * - rounded-[50px] / backdrop-blur
 * - 하단 네비게이션 바 슬롯
 */
import type { ReactNode } from 'react'

const cardBg = {
  backgroundImage: `
    radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108,108,108,0.2) 0%, rgba(108,108,108,0.2) 100%)
  `,
  backgroundSize: '10px 10px, auto',
}

interface SectionCardProps {
  children: ReactNode
  /** 카드 하단에 고정되는 네비게이션 바 */
  nav: ReactNode
  id?: string
}

/**
 * 공통 카드 레이아웃 래퍼
 * children → 카드 내부 콘텐츠
 * nav      → 카드 하단 네비게이션 바
 */
const SectionCard = ({ children, nav, id }: SectionCardProps) => {
  return (
    <section
      id={id}
      className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-4 md:px-10 md:py-8 lg:px-14 lg:py-12"
    >
      <div className="max-w-350 w-full relative">

        {/* ── 메인 카드 ── */}
        <div
          className="relative backdrop-blur-[50px] rounded-[50px] overflow-hidden border border-black"
          style={cardBg}
        >
          {children}
        </div>

        {/* ── 네비게이션 바 ── */}
        <div className="absolute -bottom-5 md:-bottom-7 lg:-bottom-9 left-1/2 -translate-x-1/2 backdrop-blur-[25px] bg-[rgba(61,61,61,0.5)] rounded-full px-4 py-2 md:px-7 md:py-3 lg:px-12 lg:py-6 z-30">
          {nav}
        </div>

      </div>
    </section>
  )
}

export default SectionCard
