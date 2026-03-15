/**
 * AboutDetail 섹션 컴포넌트
 * About 탭 클릭 시 표시되는 자기소개 페이지
 * - 프로필 사진 블러 없이 배경으로 표시
 * - 소개 텍스트 오버레이
 */
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const AboutDetailSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)

  const nav = (
    <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('home')}>Home</div>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('projects')}>Projects</div>
      <div className="text-[#61BA91] cursor-pointer">About</div>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('contact')}>Contact</div>
    </div>
  )

  const introText = (
    <div className="text-[#EFF1C5] text-center tracking-widest space-y-2">
      <p>안녕하세요. 저는 <span className="text-[#61BA91] font-bold">LLM</span> 같은 사람 <span className="font-bold">서희정</span>입니다.</p>
      <p>저는 새로운 것을 보면 망설이기보다 먼저 해보는 성향입니다.</p>
      <p>익숙하지 않은 상황에서도 배우고 시도하는 과정 자체를 즐기며, 그 안에서 조금씩 성장해 왔습니다.</p>
      <p>혼자 잘하기보다 함께 끝까지 해내는 과정을 중요하게 생각하며,</p>
      <p>사람들과의 소통과 협력 속에서 더 좋은 결과가 만들어진다고 믿습니다.</p>
      <p>앞으로도 새로운 경험을 <span className="text-[#61BA91] font-bold">두려워하지 않고, 배우고, 도전하며</span> 저만의 길을 만들어나가고 싶습니다.</p>
      <p>감사합니다.</p>
    </div>
  )

  return (
    <SectionCard nav={nav} clearProfile>

      {/* ══ 모바일 레이아웃 (< lg) ══ */}
      <div className="lg:hidden flex flex-col items-center justify-center h-140 md:h-160 px-6 md:px-10 pt-14 pb-14 gap-4 relative z-10">
        <h2 className="text-white font-bold text-3xl md:text-4xl" style={orbitron}>About</h2>
        <div className="text-[11px] md:text-sm w-full break-keep">{introText}</div>
      </div>

      {/* ══ 데스크탑 레이아웃 (lg+) ══ */}
      <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
          <h2 className="text-white font-bold text-5xl" style={orbitron}>About</h2>
          <div className="text-sm xl:text-base w-full max-w-3xl px-8 break-keep">{introText}</div>
        </div>
      </div>

    </SectionCard>
  )
}

export default AboutDetailSection
