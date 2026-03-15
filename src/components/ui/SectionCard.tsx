/**
 * SectionCard 공용 카드 래퍼 컴포넌트
 * AboutSection / ProjectsSection 등 공통 카드 레이아웃 제공
 *
 * - dot-grid + glass 배경
 * - rounded-[50px] / backdrop-blur
 * - 공통 코너 정보 (Birth, Gender, Github, Email, Location)
 * - 하단 네비게이션 바 슬롯
 */
import type { ReactNode } from 'react'
import ProfileBlur from '@/components/ui/ProfileBlur'

const cardBg = {
  backgroundImage: `
    radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108,108,108,0.2) 0%, rgba(108,108,108,0.2) 100%)
  `,
  backgroundSize: '10px 10px, auto',
}

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

interface SectionCardProps {
  children: ReactNode
  /** 카드 하단에 고정되는 네비게이션 바 */
  nav: ReactNode
  id?: string
  /** true이면 프로필 이미지를 블러 없이 선명하게 표시 */
  clearProfile?: boolean
  /** 프로필 이미지 불투명도 (기본값: clearProfile ? 0.3 : 0.4) */
  profileOpacity?: number
}

/**
 * 공통 카드 레이아웃 래퍼
 * children → 카드 내부 콘텐츠 (코너 정보 제외한 중앙 영역)
 * nav      → 카드 하단 네비게이션 바
 */
const SectionCard = ({ children, nav, id, clearProfile = false, profileOpacity }: SectionCardProps) => {
  const resolvedOpacity = profileOpacity ?? (clearProfile ? 0.3 : 0.4)
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

          {/* ══ 모바일 코너 정보 (lg 미만) ══ */}
          {/* 상단: Birth / Gender — children 위에 렌더되도록 z-10 */}
          <div className="lg:hidden absolute top-5 left-5 flex flex-col gap-0.5 text-white text-[10px] md:text-xs z-10" style={orbitron}>
            <p><span className="text-[#61ba91]">Birth </span> ~ <span className="font-bold">00.11.21</span></p>
            <p><span className="text-[#61ba91]">Gender ~ </span> <span className="font-bold">female</span></p>
          </div>

          {/* 하단 좌: Github / Email */}
          <div className="lg:hidden absolute bottom-5 left-5 flex flex-col gap-0.5 text-white text-[9px] md:text-[11px] z-10" style={orbitron}>
            <p><span className="text-[#61ba91]">Github ~ </span><span className="font-bold">ggomiyyomi</span></p>
            <p><span className="text-[#61ba91]">Email ~ </span><span className="font-bold">heejung9865@naver.com</span></p>
          </div>

          {/* 하단 우: Education / Location */}
          <div className="lg:hidden absolute bottom-5 right-5 flex flex-col gap-0.5 text-white text-[9px] md:text-[11px] text-right z-10" style={orbitron}>
            <p><span className="font-bold">Expected [08, 26]</span><span className="text-[#61ba91]"> ~ Education</span></p>
            <p><span className="font-bold">Incheon, Korea</span><span className="text-[#61ba91]"> ~ Location</span></p>
          </div>

          {/* ══ 데스크탑 코너 정보 (lg 이상) ══ */}
          {/* 상단 좌: Birth / Gender */}
          <div className="hidden lg:flex absolute top-8 left-8 flex-col gap-1 text-white text-xs z-20" style={orbitron}>
            <p className="mb-0"><span className="text-[#61ba91]">Birth </span> ~ <span className="font-bold">00.11.21</span></p>
            <p className="mb-0"><span className="text-[#61ba91]">Gender ~ </span> <span className="font-bold">female</span></p>
          </div>

          {/* 하단 우: Graduation / Location */}
          <div className="hidden lg:flex absolute bottom-8 right-8 flex-col gap-1 text-white text-xs text-right z-20" style={orbitron}>
            <p className="mb-0">
              <span className="font-bold">Expected Graduation: [08, 26]</span>
              <span className="text-[#61ba91]"> ~ Education</span>
            </p>
            <p className="mb-0">
              <span className="font-bold">Incheon, Korea</span>
              <span className="text-[#61ba91]"> ~ Location</span>
            </p>
          </div>

          {/* 하단 좌: Github / Email */}
          <div className="hidden lg:flex absolute bottom-8 left-8 flex-col gap-1 text-white text-xs z-20" style={orbitron}>
            <p className="mb-0"><span className="text-[#61ba91]">Github ~ </span>ggomiyyomi</p>
            <p className="mb-0"><span className="text-[#61ba91]">Email ~ </span>heejung9865@naver.com</p>
          </div>

          <ProfileBlur blurAmount={clearProfile ? 0 : 40} opacity={resolvedOpacity} />
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
