/**
 * FakeHunters 프로젝트 상세 섹션
 * Projects 캐러셀에서 FakeHunters 카드 클릭 시 표시
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const description = [
  '딥페이크 탐지 파이프라인 설계 및 End-to-End 분석 구조 구축',
  '데이터셋 기반 모델 학습 및 시각화 적용',
  'AI 서버–백엔드–프론트엔드 연동 구조 설계',
  '대용량·시간 소요 분석을 위한 비동기 Polling 시스템 구현',
  '분석 결과 시각화 UI 설계 및 사용자 중심 화면 구성',
  '멀티모달 결과 AI 통합 리포트 화면 개발',
]

const detailButtons = ['기술 스택', '담당 업무', '트러블슈팅', '발표 자료'] as const
type DetailButton = typeof detailButtons[number]

/** 곧 업데이트 예정 모달 */
const ComingSoonModal = ({ label, onClose }: { label: DetailButton; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#111] border border-white/20 rounded-2xl p-8 md:p-10 flex flex-col items-center gap-4 max-w-xs md:max-w-sm w-full mx-4"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[#61BA91] font-bold text-sm md:text-base" style={orbitron}>{label}</p>
        <p className="text-white/60 text-xs md:text-sm text-center">곧 업데이트 예정입니다.</p>
        <button
          onClick={onClose}
          className="mt-2 px-5 py-2 text-xs font-bold rounded-full bg-[#61BA91] text-black hover:bg-[#4fa07a] transition-colors cursor-pointer"
          style={orbitron}
        >
          닫기
        </button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)

const FakeHuntersSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const [activeModal, setActiveModal] = useState<DetailButton | null>(null)

  const nav = (
    <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('home')}>Home</div>
      <div className="text-[#61BA91] cursor-pointer" onClick={() => setCurrentPage('projects')}>Projects</div>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('about')}>About</div>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('contact')}>Contact</div>
    </div>
  )

  return (
    <>
      <SectionCard nav={nav}>

        {/* ══ 모바일 레이아웃 (< lg) ══ */}
        <div className="lg:hidden flex flex-col h-140 md:h-160 pt-14 pb-20 relative z-10">

          {/* 스크롤 영역 */}
          <div className="flex flex-col items-center px-6 md:px-10 gap-5 overflow-y-auto flex-1 pt-2 pb-4">

            {/* 뒤로가기 버튼 */}
            <div className="w-full shrink-0">
              <button
                onClick={() => setCurrentPage('projects')}
                className="flex items-center text-[#EFF1C5]/60 hover:text-[#EFF1C5] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 1024 1024" className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="60">
                  <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
                </svg>
                <span className="ml-1 font-bold text-sm" style={orbitron}>Showcase</span>
              </button>
            </div>

            {/* 이미지 (View GITHUB 오버레이 포함) + 날짜 */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative w-36 md:w-52 bg-[#D2F1FB] rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/assets/images/FakeHunters.png"
                  alt="FakeHunters"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1.7)', transformOrigin: 'center' }}
                />
                <a href="https://github.com/2026-PoC-AI" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-3 py-1.5 text-[9px] md:text-[11px] font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="font-bold text-[#EFF1C5]/60 text-[9px] md:text-xs" style={orbitron}>2026.01.06 ~ 2026.01.29</p>
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-white font-bold text-lg md:text-2xl" style={orbitron}>FAKE HUNTERS</h2>
              <p className="text-white text-[10px] md:text-xs font-bold">
                AI 기반 멀티모달 딥페이크 탐지 웹 플랫폼<br />
                — 영상·이미지·음성·텍스트 딥페이크를 통합 분석을 통해 신뢰 가능한 판별 결과와 시각화 리포트를 제공하는 웹 서비스 구축
              </p>
              <ul className="text-[#EFF1C5]/70 text-[10px] md:text-xs space-y-1.5 mt-1">
                {description.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-[#EFF1C5] shrink-0">—</span>{item}</li>
                ))}
              </ul>
              {/* 상세 버튼 */}
              <div className="flex flex-wrap gap-2 mt-2 pb-2">
                {detailButtons.map(btn => (
                  <button key={btn} onClick={() => setActiveModal(btn)}
                    className="px-3 py-1 text-[9px] md:text-xs font-extrabold rounded-xl border-2 border-[#EFF1C5]/50 text-[#EFF1C5] hover:border-[#EFF1C5] hover:bg-[#EFF1C5]/10 transition-colors cursor-pointer"
                    style={orbitron}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ══ 데스크탑 레이아웃 (lg+) ══ */}
        <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">
          {/* 뒤로가기 버튼 */}
          <div className="absolute top-24 left-8 z-20">
            <button
              onClick={() => setCurrentPage('projects')}
              className="flex items-center gap-1.5 text-[#EFF1C5]/60 hover:text-[#EFF1C5] transition-colors cursor-pointer text-xs font-bold"
              style={orbitron}
            >
              <svg viewBox="0 0 1024 1024" className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="60">
                <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
              </svg>
              <span className="font-bold text-base" style={orbitron}>Showcase</span>
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 px-16 gap-12 xl:gap-20">

            {/* 좌측: 이미지 (View GITHUB 오버레이 포함) + 날짜 */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative w-44 xl:w-56 bg-[#D2F1FB] rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/assets/images/FakeHunters.png"
                  alt="FakeHunters"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1.7)', transformOrigin: 'center' }}
                />
                <a href="https://github.com/2026-PoC-AI" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-4 py-2 text-xs font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="text-[#EFF1C5]/60 text-xs font-bold" style={orbitron}>2026.01.06 ~ 2026.01.29</p>
            </div>

            {/* 우측: 제목 + 설명 + 상세 버튼 */}
            <div className="flex flex-col gap-4 flex-1 max-w-lg xl:max-w-xl">
              <h2 className="text-white font-bold text-2xl xl:text-4xl" style={orbitron}>FAKE HUNTERS</h2>
              <p className="text-white text-sm xl:text-base font-bold">
                AI 기반 멀티모달 딥페이크 탐지 웹 플랫폼<br />
                — 영상·이미지·음성·텍스트 딥페이크를 통합 분석을 통해 신뢰 가능한 판별 결과와 시각화 리포트를 제공하는 웹 서비스 구축
              </p>
              <ul className="text-[#EFF1C5]/70 text-sm xl:text-base space-y-2">
                {description.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-[#EFF1C5] shrink-0">—</span>{item}</li>
                ))}
              </ul>
              {/* 상세 버튼 */}
              <div className="flex gap-2 flex-wrap mt-1">
                {detailButtons.map(btn => (
                  <button key={btn} onClick={() => setActiveModal(btn)}
                    className="px-3 py-1 text-sm font-extrabold rounded-xl border-2 border-[#EFF1C5]/50 text-[#EFF1C5] hover:border-[#EFF1C5] hover:bg-[#EFF1C5]/10 transition-colors cursor-pointer"
                    style={orbitron}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </SectionCard>

      {/* 모달 */}
      {activeModal && <ComingSoonModal label={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  )
}

export default FakeHuntersSection
