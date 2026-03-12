/**
 * About 히어로 섹션
 * Figma 디자인 기반으로 구현
 *
 * 브레이크포인트:
 *   default (< 640px)   : 390×844 iPhone 기준 — 플로우 기반 레이아웃
 *   sm: (640px~1023px)  : 대형 모바일 / 태블릿 — 요소 크기 확대
 *   lg: (1024px~)       : 1920×1080 데스크탑 — 절대 위치 기반 레이아웃
 */

const llmItems = [
  { letter: 'L', title: 'Learn fast',        desc: '새로운 기술과 아이디어를 빠르게 학습이 가능한.' },
  { letter: 'L', title: 'Live in change',    desc: '새로운 환경과 변화에 빠르게 적응하는.' },
  { letter: 'M', title: 'Materialize ideas', desc: '배운 지식을 AI와 기술로 현실에 만드는.' },
]

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const cardBg = {
  backgroundImage: `
    radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108,108,108,0.2) 0%, rgba(108,108,108,0.2) 100%)
  `,
  backgroundSize: '10px 10px, auto',
}

const profileBlurStyle = {
  filter: 'blur(40px)',
  backgroundImage: `url('/assets/images/Profile.JPG')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const AboutSection = () => {
  return (
    <section className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-4 md:px-10 md:py-8 lg:px-14 lg:py-12">
      <div className="max-w-350 w-full relative">

        {/* ── 메인 카드 ── */}
        <div
          className="relative backdrop-blur-[50px] rounded-[50px] overflow-hidden border border-black"
          style={cardBg}
        >

          {/* 프로필 블러 배경 (공통) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div
              className="w-60 h-72 lg:w-100 lg:h-125 rounded-[20px] opacity-40"
              style={profileBlurStyle}
            />
          </div>

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

            {/* ② 중앙: 텍스트 + 노트북 (좌/우 나란히) */}
            <div className="flex items-center justify-between gap-4 md:gap-6">

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

              {/* 3D 노트북 */}
              <img
                alt="Laptop"
                className="w-32 md:w-60 h-auto shrink-0"
                src="/assets/images/3Dnotebook.png"
              />

            </div>

            {/* ③ 하단: 좌측 연락처 | 우측 위치 — 동일 구조로 통일 */}
            <div className="flex justify-between items-end gap-2">

              {/* 하단 좌측 */}
              <div className="flex flex-col gap-0.5 text-white text-[9px] md:text-[11px] min-w-0" style={orbitron}>
                <p><span className="text-[#61ba91]">Github ~ </span><span className="font-bold">ggomiyyomi</span></p>
                <p><span className="text-[#61ba91]">Email ~ </span><span className="font-bold">heejung9865@naver.com</span></p>
              </div>

              {/* 하단 우측 */}
              <div className="flex flex-col gap-0.5 text-white text-[9px] md:text-[11px] text-right shrink-0" style={orbitron}>
                <p><span className="font-bold">Expected [08, 26]</span><span className="text-[#61ba91]"> ~ Education</span></p>
                <p><span className="font-bold">Incheon, Korea</span><span className="text-[#61ba91]"> ~ Location</span></p>
              </div>

            </div>

          </div>

          {/* ══════════════════════════════════════════════
              데스크탑 레이아웃  (lg: 1024px~ / 1920×1080)
              절대 위치 기반 — 기존 Figma 디자인 유지
          ══════════════════════════════════════════════ */}
          <div className="hidden lg:block" style={{ height: '700px' }}>

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
            <div className="absolute inset-0 flex items-center justify-center">

              {/* Hi, I am */}
              <div className="absolute left-[14%] top-[23%] z-10">
                <p className="text-white text-5xl" style={orbitron}>Hi, I am</p>
              </div>

              {/* LLM */}
              <div className="absolute left-[22%] top-[33%] z-10">
                <p className="font-bold text-white text-7xl" style={orbitron}>LLM</p>
              </div>

              {/* L/L/M 설명 */}
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

              {/* 우측: 3D 노트북 */}
              <div className="absolute right-[8%] bottom-[15%] z-10">
                <img
                  alt="Laptop"
                  className="w-90 h-auto"
                  src="/assets/images/3Dnotebook.png"
                />
              </div>

            </div>
          </div>

        </div>

        {/* ── 네비게이션 바 ── */}
        <div className="absolute -bottom-5 md:-bottom-7 lg:-bottom-9 left-1/2 -translate-x-1/2 backdrop-blur-[25px] bg-[rgba(61,61,61,0.5)] rounded-full px-4 py-2 md:px-7 md:py-3 lg:px-12 lg:py-6  z-30">
          <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
            <div className="text-[#61ba91] cursor-pointer">Home</div>
            <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer">Projects</div>
            <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer">About</div>
            <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer">Contact</div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutSection
