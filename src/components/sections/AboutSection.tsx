/**
 * About 히어로 섹션
 * Figma 디자인 기반으로 구현
 */

const llmItems = [
  { letter: 'L', title: 'Learn fast',        desc: '새로운 기술과 아이디어를 빠르게 학습이 가능한.' },
  { letter: 'L', title: 'Live in change',    desc: '새로운 환경과 변화에 빠르게 적응하는.' },
  { letter: 'M', title: 'Materialize ideas', desc: '배운 지식을 AI와 기술로 현실에 만드는.' },
]

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const AboutSection = () => {
  return (
    <section className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-20">
      <div className="max-w-350 w-full relative">

        {/* ── 메인 카드 ── */}
        <div
          className="relative backdrop-blur-[50px] rounded-[50px] overflow-hidden border border-black"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108,108,108,0.2) 0%, rgba(108,108,108,0.2) 100%)
            `,
            backgroundSize: '10px 10px, auto',
            height: '700px',
          }}
        >

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

          {/* ── 중앙 콘텐츠 ── */}
          <div className="absolute inset-0 flex items-center justify-center">

            {/* 프로필 블러 배경 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-100 h-125 rounded-[20px] opacity-40"
                style={{
                  filter: 'blur(40px)',
                  backgroundImage: `url('/assets/images/Profile.JPG')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Hi, I am */}
            <div className="absolute left-[14%] top-[23%] z-10">
              <p className="text-white text-5xl" style={orbitron}>Hi, I am</p>
            </div>

            {/* LLM */}
            <div className="absolute left-[22%] top-[33%] z-10">
              <p className="font-bold text-white text-7xl" style={orbitron}>LLM</p>
            </div>

            {/* 중앙: L/L/M 설명 */}
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
            <div className="absolute right-[10%] bottom-[15%] z-10">
              <img
                alt="Laptop"
                className="w-90 h-auto"
                src="/assets/images/3Dnotebook.png"
              />
            </div>

          </div>
        </div>

        {/* ── 네비게이션 바 ── */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 backdrop-blur-[25px] bg-[rgba(61,61,61,0.5)] rounded-full px-12 py-6 border border-black z-30">
          <div className="flex font-bold items-center gap-8 text-xl text-center whitespace-nowrap" style={orbitron}>
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
