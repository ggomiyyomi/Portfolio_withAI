/**
 * CertificationBible 프로젝트 상세 섹션
 * Projects 캐러셀에서 CertificationBible 카드 클릭 시 표시
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const projectInfo = {
  purpose: '흩어진 자격증 정보를 한눈에 확인하고 스터디 모임에 참여할 수 있는 통합 플랫폼 구축',
  goals: [
    'JSP/Servlet MVC 구조 기반 풀스택 웹 서비스 설계',
    '공공데이터 API 연동으로 자격증 데이터 통합 관리',
    '직관적인 UI와 비동기 처리로 사용자 경험 개선',
  ],
  achievements: [
    'Ajax 비동기 처리 적용으로 페이지 리로드 제거 및 사용자 인터랙션 속도 개선',
    '공공데이터 API 연동으로 다수의 자격증 데이터 자동 수집 및 통합 관리',
    'Git 기반 5인 협업 수행 및 충돌 최소화',
  ],
}

const detailButtons = ['기술 스택', '담당 업무', '트러블슈팅', '발표 자료'] as const
type DetailButton = typeof detailButtons[number]

const d = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const techStack = [
  {
    label: 'Back End',
    items: [
      { name: 'Java 11', logo: `${d}/java/java-original.svg` },
      { name: 'Servlet', logo: `${d}/java/java-original.svg` },
      { name: 'JSP', logo: `${d}/java/java-original.svg` },
    ],
  },
  {
    label: 'Front End',
    items: [
      { name: 'HTML5', logo: `${d}/html5/html5-original.svg` },
      { name: 'CSS3', logo: `${d}/css3/css3-original.svg` },
      { name: 'JavaScript', logo: `${d}/javascript/javascript-original.svg` },
      { name: 'jQuery', logo: `${d}/jquery/jquery-original.svg` },
      { name: 'Bootstrap', logo: `${d}/bootstrap/bootstrap-original.svg` },
    ],
  },
  {
    label: 'Server / DB',
    items: [
      { name: 'Tomcat 10.1', logo: `${d}/tomcat/tomcat-original.svg` },
      { name: 'Oracle 21c', logo: `${d}/oracle/oracle-original.svg` },
    ],
  },
  {
    label: '협업 / 디자인',
    items: [
      { name: 'Git', logo: `${d}/git/git-original.svg` },
      { name: 'GitHub', logo: `${d}/github/github-original.svg`, invert: true },
      { name: 'Figma', logo: `${d}/figma/figma-original.svg` },
      { name: 'Notion', logo: 'https://cdn.simpleicons.org/notion/ffffff' },
    ],
  },
]

const myTasks = [
  '관리자 페이지 기능 설계 및 개발',
  '회원 · 게시글 · 공지사항 관리 기능 CRUD 및 Ajax 기반 비동기 처리로 사용자 인터랙션 개선',
  '관리자 통계 화면 구성 및 API/DB 연동을 통한 데이터 시각화 처리',
]

const troubleshooting = {
  title: '쿠키 초기화 시 로그인 세션 삭제 문제',
  problem: {
    summary: '특정 기능을 위해 쿠키를 초기화하는 과정에서 로그인 세션까지 함께 삭제되는 문제 발생',
    causes: [
      '모든 쿠키를 일괄 삭제하는 로직으로 JSESSIONID(세션 쿠키)까지 삭제됨',
      '기능별 쿠키 구분 없이 처리 → 쿠키 스코프 설계 문제 + 필터링 부재',
    ],
    results: ['로그인 상태가 유지되지 않음', '사용자 자동 로그아웃으로 경험 저하'],
  },
  solution: {
    summary: '팀 내에서 해당 문제의 원인을 함께 분석하고, 특정 쿠키(roomBoard)만 선택적으로 삭제하도록 개선 방향을 제안하여 적용했습니다.',
    before: `Cookie[] cookies = request.getCookies();\nif (cookies != null) {\n  for (Cookie c : cookies) {\n    if (cookieName.equals(c.getName())) {\n      viewed = c.getValue();\n    }\n    c.setMaxAge(0);      // 모든 쿠키 삭제\n    c.setPath("/");\n    response.addCookie(c);\n  }\n}`,
    after: `Cookie[] cookies = request.getCookies();\nif (cookies != null) {\n  for (Cookie c : cookies) {\n    if (cookieName.equals(c.getName())) {\n      viewed = c.getValue();\n    } else if (c.getName().contains("roomBoard")) {\n      c.setMaxAge(0);  // roomBoard 쿠키만 삭제\n      c.setPath("/");\n      response.addCookie(c);\n    }\n  }\n}`,
  },
  improvements: [
    '선택적 쿠키 삭제로 세션 쿠키 보호',
    '쿠키 역할 기반 분리로 관리 구조 개선',
    '로그인 세션 정상 유지 및 불필요한 로그아웃 해결',
  ],
}

const PDF_PATH = '/assets/pdf/BibleProject.pdf'

const DetailModal = ({ label, onClose }: { label: DetailButton; onClose: () => void }) => {
  const isTechStack = label === '기술 스택'
  const isMyTask = label === '담당 업무'
  const isPdf = label === '발표 자료'
  const isTrouble = label === '트러블슈팅'

  const isWide = isTechStack || isPdf || isTrouble

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={[
            'bg-surface border border-text/20 rounded-2xl p-6 md:p-10 flex flex-col gap-5 w-full max-h-[90vh] overflow-y-auto',
            isWide ? 'max-w-3xl' : 'max-w-md md:max-w-lg',
          ].join(' ')}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-primary font-bold text-base md:text-lg" style={orbitron}>{label}</p>
            <button
              onClick={onClose}
              className="text-text/40 hover:text-text transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isTechStack && (
            <div className="flex flex-col gap-5">
              {techStack.map(({ label: category, items }) => (
                <div key={category}>
                  <p className="text-secondary/40 text-xs font-bold mb-2" style={orbitron}>{category}</p>
                  <div className="flex flex-wrap gap-3">
                    {items.map(({ name, logo, invert }) => (
                      <div key={name} className="flex flex-col items-center gap-1.5 bg-text/5 border border-text/10 rounded-xl px-4 py-3 w-20">
                        <img
                          src={logo}
                          alt={name}
                          className="w-9 h-9 object-contain"
                          style={invert ? { filter: 'invert(1)' } : undefined}
                        />
                        <span className="text-secondary/70 text-[10px] text-center leading-tight">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isMyTask && (
            <ul className="flex flex-col gap-3">
              {myTasks.map((task, i) => (
                <li key={i} className="flex gap-2 text-text/80 text-sm md:text-base">
                  <span className="text-primary shrink-0">✓</span>{task}
                </li>
              ))}
            </ul>
          )}

          {isPdf && (
            <>
              <iframe
                src={PDF_PATH}
                className="w-full rounded-xl border border-text/10"
                style={{ height: '60vh' }}
                title="발표 자료"
              />
              <a
                href={PDF_PATH}
                download="자격증의바이블_발표자료.pdf"
                className="self-start flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-colors cursor-pointer"
                style={orbitron}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                다운로드
              </a>
            </>
          )}

          {isTrouble && (
            <div className="flex flex-col gap-4">
              {/* 문제 상황 */}
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-5 py-4">
                <p className="text-red-400 font-extrabold text-sm mb-2" style={orbitron}>문제 상황</p>
                <p className="text-text/80 text-sm md:text-base mb-3">{troubleshooting.problem.summary}</p>
                <ul className="space-y-1.5">
                  {troubleshooting.problem.causes.map((c, i) => (
                    <li key={i} className="flex gap-2 text-red-300/70 text-xs md:text-sm">
                      <span className="shrink-0">·</span>{c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 발생 결과 */}
              <div className="bg-text/5 border border-text/10 rounded-xl px-5 py-4">
                <p className="text-text font-extrabold text-sm mb-2" style={orbitron}>발생 결과</p>
                <ul className="space-y-1.5">
                  {troubleshooting.problem.results.map((r, i) => (
                    <li key={i} className="flex gap-2 text-secondary/70 text-xs md:text-sm">
                      <span className="shrink-0">·</span>{r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 해결 방법 */}
              <div className="bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
                <p className="text-primary font-extrabold text-sm mb-2" style={orbitron}>해결 방법</p>
                <p className="text-text/80 text-sm md:text-base mb-3">{troubleshooting.solution.summary}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <p className="text-red-400 text-xs font-bold mb-1.5" style={orbitron}>Before</p>
                    <pre className="bg-black/50 border border-red-400/30 rounded-lg px-3 py-2.5 text-red-300/80 text-[9px] md:text-[10px] lg:text-xs overflow-x-auto leading-relaxed">
                      <code>{troubleshooting.solution.before}</code>
                    </pre>
                  </div>
                  <div className="min-w-0">
                    <p className="text-primary text-xs font-bold mb-1.5" style={orbitron}>After</p>
                    <pre className="bg-black/50 border border-primary/30 rounded-lg px-3 py-2.5 text-primary/90 text-[9px] md:text-[10px] lg:text-xs overflow-x-auto leading-relaxed">
                      <code>{troubleshooting.solution.after}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* 핵심 개선 */}
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl px-5 py-4">
                <p className="text-secondary font-extrabold text-sm mb-2" style={orbitron}>핵심 개선</p>
                <ul className="space-y-1.5">
                  {troubleshooting.improvements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-secondary/70 text-xs md:text-sm">
                      <span className="text-primary shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {!isTechStack && !isMyTask && !isPdf && !isTrouble && (
            <p className="text-text/60 text-xs md:text-sm text-center">곧 업데이트 예정입니다.</p>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const CertificationBibleSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const [activeModal, setActiveModal] = useState<DetailButton | null>(null)

  const nav = (
    <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
      <div className="text-text hover:text-primary transition-colors cursor-pointer" onClick={() => setCurrentPage('home')}>Home</div>
      <div className="text-primary cursor-pointer" onClick={() => setCurrentPage('projects')}>Projects</div>
      <div className="text-text hover:text-primary transition-colors cursor-pointer" onClick={() => setCurrentPage('about')}>About</div>
      <div className="text-text hover:text-primary transition-colors cursor-pointer" onClick={() => setCurrentPage('contact')}>Contact</div>
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
                className="flex items-center text-secondary/60 hover:text-secondary transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 1024 1024" className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="60">
                  <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
                </svg>
                <span className="ml-1 font-bold text-sm" style={orbitron}>Showcase</span>
              </button>
            </div>

            {/* 이미지 (View GITHUB 오버레이 포함) + 날짜 */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative w-36 md:w-52 bg-[#FFEDF0] rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/assets/images/CertificationBible.png"
                  alt="CertificationBible"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1.8)', transformOrigin: 'center' }}
                />
                {/* View GITHUB 오버레이 버튼 */}
                <a href="https://github.com/ggomiyyomi/kosa-project2-team2" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-3 py-1.5 text-[9px] md:text-[11px] font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="font-bold text-secondary/60 text-[9px] md:text-xs" style={orbitron}>2025.10.13 ~ 2025.10.18</p>
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-text font-bold text-lg md:text-2xl" style={orbitron}>자격증의 바이블 (자바)</h2>
              <p className="text-text text-[10px] md:text-xs font-bold">자격증 준비생들을 위한 정보 스터디 커뮤니티 통합 플랫폼</p>

              {/* 목적 */}
              <div className="bg-primary/10 border border-primary/30 rounded-xl px-3 py-2 mt-1">
                <p className="text-primary font-extrabold text-xs md:text-sm mb-1" style={orbitron}>▸ 목적</p>
                <p className="text-secondary/80 text-[9px] md:text-xs">{projectInfo.purpose}</p>
              </div>

              {/* 목표 */}
              <div className="bg-text/5 border border-text/10 rounded-xl px-3 py-2">
                <p className="text-text font-extrabold text-xs md:text-sm mb-1.5" style={orbitron}>▸ 목표</p>
                <ul className="space-y-1">
                  {projectInfo.goals.map((item, i) => (
                    <li key={i} className="flex gap-1.5 text-secondary/70 text-[9px] md:text-xs">
                      <span className="text-secondary/40 shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 성과 */}
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl px-3 py-2">
                <p className="text-secondary font-extrabold text-xs md:text-sm mb-1.5" style={orbitron}>▸ 성과</p>
                <ul className="space-y-1">
                  {projectInfo.achievements.map((item, i) => (
                    <li key={i} className="flex gap-1.5 text-secondary/70 text-[9px] md:text-xs">
                      <span className="text-primary shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 상세 버튼 */}
              <div className="flex flex-wrap gap-2 mt-1 pb-2">
                {detailButtons.map(btn => (
                  <button key={btn} onClick={() => setActiveModal(btn)}
                    className="px-3 py-1 text-[9px] md:text-xs font-extrabold rounded-xl border-2 border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
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
              className="flex items-center gap-1.5 text-secondary/60 hover:text-secondary transition-colors cursor-pointer text-xs font-bold"
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
              <div className="relative w-44 xl:w-56 bg-[#FFEDF0] rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/assets/images/CertificationBible.png"
                  alt="CertificationBible"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1.8)', transformOrigin: 'center' }}
                />
                <a href="https://github.com/ggomiyyomi/kosa-project2-team2" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-4 py-2 text-xs font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="text-secondary/60 text-xs font-bold" style={orbitron}>2025.10.13 ~ 2025.10.18</p>
            </div>

            {/* 우측: 제목 + 설명 + 상세 버튼 */}
            <div className="flex flex-col gap-4 flex-1 max-w-lg xl:max-w-xl">
              <h2 className="text-text font-bold text-2xl xl:text-4xl" style={orbitron}>자격증의 바이블 (자바)</h2>
              <p className="text-text text-sm xl:text-base font-bold">자격증 준비생들을 위한 정보 스터디 커뮤니티 통합 플랫폼</p>

              {/* 목적 */}
              <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-2.5">
                <p className="text-primary font-extrabold text-sm xl:text-base mb-1" style={orbitron}>▸ 목적</p>
                <p className="text-secondary/80 text-sm xl:text-base">{projectInfo.purpose}</p>
              </div>

              {/* 목표 */}
              <div className="bg-text/5 border border-text/10 rounded-xl px-4 py-2.5">
                <p className="text-text font-extrabold text-sm xl:text-base mb-2" style={orbitron}>▸ 목표</p>
                <ul className="space-y-1.5">
                  {projectInfo.goals.map((item, i) => (
                    <li key={i} className="flex gap-2 text-secondary/70 text-sm xl:text-base">
                      <span className="text-secondary/40 shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 성과 */}
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-2.5">
                <p className="text-secondary font-extrabold text-sm xl:text-base mb-2" style={orbitron}>▸ 성과</p>
                <ul className="space-y-1.5">
                  {projectInfo.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-secondary/70 text-sm xl:text-base">
                      <span className="text-primary shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 상세 버튼 */}
              <div className="flex gap-2 flex-wrap mt-1">
                {detailButtons.map(btn => (
                  <button key={btn} onClick={() => setActiveModal(btn)}
                    className="px-3 py-1 text-sm font-extrabold rounded-xl border-2 border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
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
      {activeModal && <DetailModal label={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  )
}

export default CertificationBibleSection
