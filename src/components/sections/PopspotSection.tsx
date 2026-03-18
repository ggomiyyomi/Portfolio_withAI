/**
 * Popspot 프로젝트 상세 섹션
 * Projects 캐러셀에서 Popspot 카드 클릭 시 표시
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const projectInfo = {
  purpose: '팝업스토어 정보 검색, 커뮤니티 및 실시간 채팅 기능을 한 곳에서 제공하는 웹 플랫폼 구축',
  goals: [
    '팝업스토어 정보 검색 및 커뮤니티 서비스 전반 기획',
    'WebSocket 기반 실시간 채팅 기능 설계 및 구현',
    'Redis를 활용한 데이터 처리 및 성능 개선 구조 설계',
  ],
  achievements: [
    'WebSocket 기반 실시간 채팅 구현으로 사용자 간 즉각적 소통 환경 제공',
    'Spring AI 기반 AI 챗봇 연동으로 팝업스토어 정보 자동 응답 기능 구현',
    '결제 및 동시 예약 처리 기능 구현으로 서비스 핵심 플로우 완성',
    '협업 도구 기반 일정·이슈 관리 경험을 통한 팀 개발 역량 강화',
  ],
}

const detailButtons = ['기술 스택', '담당 업무', '트러블슈팅', '발표 자료'] as const
type DetailButton = typeof detailButtons[number]

const d = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const techStack = [
  {
    label: 'Front End',
    items: [
      { name: 'React', logo: `${d}/react/react-original.svg` },
      { name: 'Tailwind', logo: `${d}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    label: 'Back End',
    items: [
      { name: 'Spring Boot', logo: `${d}/spring/spring-original.svg` },
      { name: 'Spring AI', logo: `${d}/spring/spring-original.svg` },
      { name: 'MyBatis', logo: `${d}/java/java-original.svg` },
      { name: 'WebSocket', logo: `${d}/html5/html5-original.svg` },
    ],
  },
  {
    label: 'Storage / DB',
    items: [
      { name: 'MySQL', logo: `${d}/mysql/mysql-original.svg` },
      { name: 'PostgreSQL', logo: `${d}/postgresql/postgresql-original.svg` },
      { name: 'Redis', logo: `${d}/redis/redis-original.svg` },
      { name: 'Amazon S3', logo: `${d}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
    ],
  },
  {
    label: 'Infra',
    items: [
      { name: 'Docker', logo: `${d}/docker/docker-original.svg` },
      { name: 'NGINX', logo: `${d}/nginx/nginx-original.svg` },
      { name: 'Amazon EC2', logo: `${d}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
      { name: 'GitHub Actions', logo: `${d}/githubactions/githubactions-original.svg` },
    ],
  },
  {
    label: '협업 / 디자인',
    items: [
      { name: 'GitHub', logo: `${d}/github/github-original.svg`, invert: true },
      { name: 'Jira', logo: `${d}/jira/jira-original.svg` },
      { name: 'Notion', logo: 'https://cdn.simpleicons.org/notion/ffffff' },
      { name: 'Figma', logo: `${d}/figma/figma-original.svg` },
    ],
  },
]

const myTasks = [
  {
    label: '채팅 구조',
    title: '실시간 채팅 시스템',
    desc: 'WebSocket 기반 실시간 채팅 시스템 설계 및 구현',
    points: ['전체 팝업 목록 및 채팅방 리스트 제공', '내가 참여한 채팅방 관리', '채팅방 생성 및 상세 메시지 인터페이스 구성'],
    image: '/assets/images/Popspot1.png',
  },
  {
    label: 'AI 기능',
    title: 'AI 챗봇 · 추천 기능',
    desc: 'Spring AI 기반 챗봇 연동 및 맞춤형 팝업스토어 추천 구현',
    points: [],
    image: '/assets/images/Popspot3.png',
    subsections: [
      {
        title: 'AI 챗봇 대화 기능',
        points: ['사용자 메시지 기반 AI 응답 처리', '팝업 추천 및 정보 제공 챗봇 기능 구현', '자연스러운 대화 흐름 유지'],
      },
      {
        title: 'AI 추천 기능',
        points: ['AI 기반 팝업스토어 추천 기능 구현', '사용자 요청에 따른 맞춤형 추천 제공', '카드 형태 UI로 정보 가독성 향상'],
      },
    ],
  },
  {
    label: '이미지 업로드',
    title: '이미지 업로드 기능',
    desc: '채팅 내 이미지 업로드 및 서버 연동 구현',
    points: ['채팅 내 이미지 업로드 및 전송 기능 구현', '파일 업로드 UI 및 미리보기 제공', '대용량 이미지 처리 및 서버 연동'],
    image: '/assets/images/Popspot5.png',
  },
  {
    label: '예약 메시지',
    title: '예약 메시지 기능',
    desc: '특정 시간에 메시지 자동 전송되는 예약 기능 구현',
    points: ['특정 시간에 메시지 전송되는 예약 기능 구현', '사용자 인터랙션 기반 예약 설정 UI 제공', '예약 상태 관리 및 메시지 자동 전송 처리'],
    image: '/assets/images/Popspot2.png',
  },
  {
    label: 'UX 개선',
    title: '채팅 UX 개선',
    desc: '읽음 표시, 타이핑 인디케이터 등 UX 개선',
    points: ['읽음/안읽음 상태 표시 (Read/Unread Receipt)', '입력 중 표시 (Typing Indicator)', '채팅방 숨김 · Swipe Back · Bottom Sheet UI 적용'],
    image: '/assets/images/Popspot6.png',
  },
]

const troubleshootings = [
  {
    title: 'Nginx 이미지 업로드 제한',
    problem: {
      summary: '로컬 환경에서는 정상 동작했지만 서버(배포) 환경에서만 채팅 이미지 업로드가 실패하는 문제 발생',
      causes: [
        '애플리케이션 로직에는 문제 없음',
        'Nginx의 요청 바디 크기 제한(client_max_body_size)으로 업로드 요청이 차단됨',
        '기본 설정 값이 이미지 업로드 용량보다 작게 설정되어 있었음',
        '즉, 애플리케이션 문제가 아닌 인프라 설정 문제',
      ],
      results: ['채팅 이미지 업로드 기능 미동작', '배포 환경에서만 발생하는 재현 어려운 이슈'],
    },
    solution: {
      summary: 'Nginx 설정에서 업로드 허용 용량을 증가시키도록 수정했습니다.',
      before: `# Nginx 기본 설정\n# client_max_body_size 1M; (기본값)\n\nserver {\n  location / {\n    proxy_pass http://app;\n    # 업로드 크기 제한 미설정\n  }\n}`,
      after: `# Nginx 수정 설정\nclient_max_body_size 20M;\n\nserver {\n  location / {\n    proxy_pass http://app;\n    client_max_body_size 20M;\n  }\n}`,
    },
    improvements: [
      '서버 레벨 업로드 제한 해제로 채팅 이미지 업로드 기능 정상화',
      '애플리케이션 vs 인프라 문제 구분 능력 향상',
      '배포 환경 기반 디버깅 수행 경험 확보',
    ],
  },
  {
    title: '예약 시스템 성능 개선 (Redis)',
    image: '/assets/images/TPS.png',
    problem: {
      summary: '팝업 스토어 예약 오픈 시 대량의 동시 요청이 발생하면서 예약 처리 지연 및 서버 병목 현상이 발생했습니다.',
      causes: [
        'DB 기반 재고 처리 구조에서 동시 요청 집중',
        '트랜잭션 충돌 및 락 경쟁으로 처리 속도 저하',
        '예약 요청이 몰리는 순간 시스템 처리 한계 발생',
        '즉, 동시성 제어 구조 부재',
      ],
      results: ['예약 처리 지연 및 서버 병목 현상', '동시 요청 급증 시 시스템 불안정'],
    },
    solution: {
      summary: '팀 내에서 병목 원인을 분석하고, Redis 기반 재고 선점 구조 도입 과정에 참여했습니다.',
      points: [
        '재고를 DB가 아닌 Redis에서 선점 처리',
        '선착순 요청을 빠르게 처리하도록 구조 개선',
        'DB 접근 최소화로 병목 구간 제거',
      ],
    },
    improvements: [
      '예약 처리 TPS 약 15배 향상',
      '대량 동시 요청 상황에서도 안정적인 예약 처리 가능',
      '서버 병목 현상 해소',
    ],
  },
  {
    title: '재고 불일치 문제 해결 (Scheduler)',
    image: '/assets/images/Scheduler.png',
    problem: {
      summary: '결제 실패 또는 취소 시, 임시 확보된 재고가 정상적으로 해제되지 않아 재고 불일치 문제가 발생했습니다.',
      causes: [
        '결제 전 재고를 임시 확보하는 구조',
        '결제 실패/취소 시 재고 복구 로직이 누락됨',
        '일부 요청에서 재고가 반환되지 않는 상태 발생',
        '즉, 비정상 흐름(예외 케이스) 처리 부족',
      ],
      results: ['재고 불일치로 인한 예약 가능 수량 오류', '결제 실패 케이스에서 데이터 불일관성 발생'],
    },
    solution: {
      summary: '팀 내에서 문제를 분석하고, 스케줄러 기반 재고 회수 구조 도입 과정에 참여했습니다.',
      points: [
        '일정 시간 미결제 상태의 예약 자동 취소',
        'Redis/DB 기준 재고를 주기적으로 정합성 체크',
        '재고를 자동으로 회수하도록 개선',
      ],
    },
    improvements: [
      '재고 정합성 확보 및 예약 시스템 안정성 향상',
      '결제 실패 케이스에서도 데이터 일관성 유지',
      '스케줄러 기반 자동화로 운영 부담 감소',
    ],
  },
]

const PDF_PATH = '/assets/pdf/PopspotProject.pdf'
const VIDEO_EMBED = 'https://www.youtube.com/embed/DIHc5RcVmME'

/** 상세 모달 */
const DetailModal = ({ label, onClose }: { label: DetailButton; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTask, setActiveTask] = useState<number | null>(null)
  const [mediaTab, setMediaTab] = useState<'pdf' | 'video'>('pdf')

  const isTechStack = label === '기술 스택'
  const isMyTask = label === '담당 업무'
  const isPdf = label === '발표 자료'
  const isTrouble = label === '트러블슈팅'

  const isWide = isTechStack || isPdf || isTrouble
  const ts = troubleshootings[activeTab]

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
            'bg-[#111] border border-white/20 rounded-2xl p-6 md:p-10 flex flex-col gap-5 w-full max-h-[92vh] overflow-y-auto',
            isMyTask ? 'max-w-4xl' : isWide ? 'max-w-3xl' : 'max-w-md md:max-w-lg',
          ].join(' ')}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-[#61BA91] font-bold text-base md:text-lg" style={orbitron}>{label}</p>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
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
                  <p className="text-[#EFF1C5]/40 text-xs font-bold mb-2" style={orbitron}>{category}</p>
                  <div className="flex flex-wrap gap-3">
                    {items.map(({ name, logo, invert }) => (
                      <div key={name} className="flex flex-col items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-20">
                        <img
                          src={logo}
                          alt={name}
                          className="w-9 h-9 object-contain"
                          style={invert ? { filter: 'invert(1)' } : undefined}
                        />
                        <span className="text-[#EFF1C5]/70 text-[10px] text-center leading-tight">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isMyTask && (
            <div className="flex flex-col gap-4">

              {/* 전체 개요 (초기 화면) */}
              {activeTask === null && (
                <div className="flex flex-col gap-2">
                  <p className="text-[#EFF1C5]/40 text-xs font-bold mb-1" style={orbitron}>담당 업무 전체</p>
                  <ul className="space-y-2">
                    {[
                      'WebSocket 기반 실시간 채팅 기능 개발',
                      '채팅 UI/UX 개선 및 프론트엔드 연동 처리',
                      'AI 챗봇 기능 연동 및 사용자 메시지 기반 응답 처리 로직 구현',
                      '프로젝트 일정 관리 및 팀 협업 조율',
                      '서비스 시연 영상 제작 및 발표 자료 구성',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-white/80 text-sm md:text-base">
                        <span className="text-[#61BA91] shrink-0">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  
                </div>
              )}

              {/* 탭 버튼 */}
              <div className="flex flex-wrap gap-2">
                {activeTask !== null && (
                  <button
                    onClick={() => setActiveTask(null)}
                    className="px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-lg border border-white/30 text-white/60 hover:border-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    style={orbitron}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    전체
                  </button>
                )}
                {myTasks.map((task, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTask(activeTask === i ? null : i)}
                    className={[
                      'px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-lg border transition-colors cursor-pointer',
                      activeTask === i
                        ? 'border-[#61BA91] bg-[#61BA91]/20 text-[#61BA91]'
                        : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70',
                    ].join(' ')}
                    style={orbitron}
                  >
                    {task.label}
                  </button>
                ))}
              </div>

              {/* 선택된 업무 상세 */}
              {activeTask !== null && (() => {
                const t = myTasks[activeTask]
                return (
                  <div className="flex flex-col gap-4">
                    {/* 이미지 */}
                    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-black/20">
                      <img src={t.image} alt={t.title} className="w-full object-contain max-h-[50vh]" />
                    </div>
                    {/* subsections: 2단 텍스트 */}
                    {'subsections' in t && t.subsections ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(t.subsections as { title: string; points: string[] }[]).map((s, si) => (
                          <div key={si} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-2">
                            <p className="text-white font-bold text-xs md:text-sm" style={orbitron}>{s.title}</p>
                            <ul className="space-y-1.5">
                              {s.points.map((p, pi) => (
                                <li key={pi} className="flex gap-2 text-[#EFF1C5]/80 text-xs md:text-sm">
                                  <span className="text-[#61BA91] shrink-0">✓</span>{p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="text-white font-bold text-sm md:text-base" style={orbitron}>{t.title}</p>
                        <p className="text-[#EFF1C5]/60 text-xs md:text-sm">{t.desc}</p>
                        <ul className="space-y-1.5 mt-1">
                          {t.points.map((p, i) => (
                            <li key={i} className="flex gap-2 text-[#EFF1C5]/80 text-xs md:text-sm">
                              <span className="text-[#61BA91] shrink-0">✓</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          )}

          {isPdf && (
            <div className="flex flex-col gap-4">
              {/* 탭 버튼 */}
              <div className="flex gap-2">
                {(['pdf', 'video'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setMediaTab(tab)}
                    className={[
                      'px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-lg border transition-colors cursor-pointer',
                      mediaTab === tab
                        ? 'border-[#61BA91] bg-[#61BA91]/20 text-[#61BA91]'
                        : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70',
                    ].join(' ')}
                    style={orbitron}
                  >
                    {tab === 'pdf' ? 'PDF' : '시연 영상'}
                  </button>
                ))}
              </div>

              {/* PDF */}
              {mediaTab === 'pdf' && (
                <>
                  <iframe
                    src={PDF_PATH}
                    className="w-full rounded-xl border border-white/10"
                    style={{ height: '60vh' }}
                    title="발표 자료"
                  />
                  <a
                    href={PDF_PATH}
                    download="Popspot_발표자료.pdf"
                    className="self-start flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full border border-[#61BA91] text-[#61BA91] hover:bg-[#61BA91] hover:text-black transition-colors cursor-pointer"
                    style={orbitron}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    다운로드
                  </a>
                </>
              )}

              {/* 시연 영상 */}
              {mediaTab === 'video' && (
                <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-black" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src={VIDEO_EMBED}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Popspot 시연 영상"
                  />
                </div>
              )}
            </div>
          )}

          {isTrouble && (
            <div className="flex flex-col gap-4">
              {/* 탭 버튼 */}
              <div className="flex flex-wrap gap-2">
                {troubleshootings.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={[
                      'px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-lg border transition-colors cursor-pointer',
                      activeTab === i
                        ? 'border-[#61BA91] bg-[#61BA91]/20 text-[#61BA91]'
                        : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70',
                    ].join(' ')}
                    style={orbitron}
                  >
                    {i + 1}. {t.title}
                  </button>
                ))}
              </div>

              {/* 문제 상황 */}
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-5 py-4">
                <p className="text-red-400 font-extrabold text-sm mb-2" style={orbitron}>문제 상황</p>
                <p className="text-white/80 text-sm md:text-base mb-3">{ts.problem.summary}</p>
                <ul className="space-y-1.5">
                  {ts.problem.causes.map((c, i) => (
                    <li key={i} className="flex gap-2 text-red-300/70 text-xs md:text-sm">
                      <span className="shrink-0">·</span>{c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 발생 결과 */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <p className="text-white font-extrabold text-sm mb-2" style={orbitron}>발생 결과</p>
                <ul className="space-y-1.5">
                  {ts.problem.results.map((r, i) => (
                    <li key={i} className="flex gap-2 text-[#EFF1C5]/70 text-xs md:text-sm">
                      <span className="shrink-0">·</span>{r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 해결 방법 */}
              <div className="bg-[#61BA91]/10 border border-[#61BA91]/30 rounded-xl px-5 py-4">
                <p className="text-[#61BA91] font-extrabold text-sm mb-2" style={orbitron}>해결 방법</p>
                <p className="text-white/80 text-sm md:text-base mb-3">{ts.solution.summary}</p>
                {'before' in ts.solution && ts.solution.before ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <p className="text-red-400 text-xs font-bold mb-1.5" style={orbitron}>Before</p>
                      <pre className="bg-black/50 border border-red-400/30 rounded-lg px-3 py-2.5 text-red-300/80 text-[9px] md:text-[10px] lg:text-xs overflow-x-auto leading-relaxed">
                        <code>{ts.solution.before}</code>
                      </pre>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#61BA91] text-xs font-bold mb-1.5" style={orbitron}>After</p>
                      <pre className="bg-black/50 border border-[#61BA91]/30 rounded-lg px-3 py-2.5 text-[#61BA91]/90 text-[9px] md:text-[10px] lg:text-xs overflow-x-auto leading-relaxed">
                        <code>{('after' in ts.solution) ? ts.solution.after : ''}</code>
                      </pre>
                    </div>
                  </div>
                ) : (
                  'points' in ts.solution && ts.solution.points && (
                    <ul className="space-y-1.5">
                      {ts.solution.points.map((p, i) => (
                        <li key={i} className="flex gap-2 text-[#61BA91]/80 text-xs md:text-sm">
                          <span className="shrink-0">→</span>{p}
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>

              {/* 핵심 개선 */}
              <div className="bg-[#EFF1C5]/5 border border-[#EFF1C5]/20 rounded-xl px-5 py-4">
                <p className="text-[#EFF1C5] font-extrabold text-sm mb-2" style={orbitron}>핵심 개선</p>
                <ul className="space-y-1.5">
                  {ts.improvements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[#EFF1C5]/70 text-xs md:text-sm">
                      <span className="text-[#61BA91] shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 결과 이미지 */}
              {'image' in ts && ts.image && (
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={ts.image}
                    alt={ts.title}
                    className="w-full object-contain"
                  />
                </div>
              )}
            </div>
          )}

          {!isTechStack && !isMyTask && !isPdf && !isTrouble && (
            <p className="text-white/60 text-xs md:text-sm text-center">곧 업데이트 예정입니다.</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const PopspotSection = () => {
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

            {/* 이미지 + 날짜 */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative w-36 md:w-52 bg-[#D12AFE]/20 rounded-2xl overflow-hidden aspect-3/4">
                <img
                  src="/assets/images/Popspot.png"
                  alt="Popspot"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1)', transformOrigin: 'center' }}
                />
                <a href="https://github.com/2025-MSA-FINAL" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-3 py-1.5 text-[9px] md:text-[11px] font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="font-bold text-[#EFF1C5]/60 text-[9px] md:text-xs" style={orbitron}>2025.10.20 ~ 2025.12.31</p>
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-white font-bold text-lg md:text-2xl" style={orbitron}>POPSPOT(팝스팟)</h2>
              <p className="text-white text-[10px] md:text-xs font-bold">팝업스토어 정보검색, 커뮤니티 및 실시간 채팅 기능을 제공하는 웹 플랫폼</p>

              {/* 목적 */}
              <div className="bg-[#61BA91]/10 border border-[#61BA91]/30 rounded-xl px-3 py-2 mt-1">
                <p className="text-[#61BA91] font-extrabold text-xs md:text-sm mb-1" style={orbitron}>▸ 목적</p>
                <p className="text-[#EFF1C5]/80 text-[9px] md:text-xs">{projectInfo.purpose}</p>
              </div>

              {/* 목표 */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <p className="text-white font-extrabold text-xs md:text-sm mb-1.5" style={orbitron}>▸ 목표</p>
                <ul className="space-y-1">
                  {projectInfo.goals.map((item, i) => (
                    <li key={i} className="flex gap-1.5 text-[#EFF1C5]/70 text-[9px] md:text-xs">
                      <span className="text-[#EFF1C5]/40 shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 성과 */}
              <div className="bg-[#EFF1C5]/5 border border-[#EFF1C5]/20 rounded-xl px-3 py-2">
                <p className="text-[#EFF1C5] font-extrabold text-xs md:text-sm mb-1.5" style={orbitron}>▸ 성과</p>
                <ul className="space-y-1">
                  {projectInfo.achievements.map((item, i) => (
                    <li key={i} className="flex gap-1.5 text-[#EFF1C5]/70 text-[9px] md:text-xs">
                      <span className="text-[#61BA91] shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 상세 버튼 */}
              <div className="flex flex-wrap gap-2 mt-1 pb-2">
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

            {/* 좌측: 이미지 + 날짜 */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative w-44 xl:w-56 bg-[#D12AFE]/20 rounded-2xl overflow-hidden aspect-3/4">
                <img
                  src="/assets/images/Popspot.png"
                  alt="Popspot"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1)', transformOrigin: 'center' }}
                />
                <a href="https://github.com/2025-MSA-FINAL" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-4 py-2 text-xs font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="text-[#EFF1C5]/60 text-xs font-bold" style={orbitron}>2025.10.20 ~ 2025.12.31</p>
            </div>

            {/* 우측: 제목 + 목적/목표/성과 + 상세 버튼 */}
            <div className="flex flex-col gap-4 flex-1 max-w-lg xl:max-w-xl">
              <h2 className="text-white font-bold text-2xl xl:text-4xl" style={orbitron}>POPSPOT(팝스팟)</h2>
              <p className="text-white text-sm xl:text-base font-bold">팝업스토어 정보검색, 커뮤니티 및 실시간 채팅 기능을 제공하는 웹 플랫폼</p>

              {/* 목적 */}
              <div className="bg-[#61BA91]/10 border border-[#61BA91]/30 rounded-xl px-4 py-2.5">
                <p className="text-[#61BA91] font-extrabold text-sm xl:text-base mb-1" style={orbitron}>▸ 목적</p>
                <p className="text-[#EFF1C5]/80 text-sm xl:text-base">{projectInfo.purpose}</p>
              </div>

              {/* 목표 */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <p className="text-white font-extrabold text-sm xl:text-base mb-2" style={orbitron}>▸ 목표</p>
                <ul className="space-y-1.5">
                  {projectInfo.goals.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[#EFF1C5]/70 text-sm xl:text-base">
                      <span className="text-[#EFF1C5]/40 shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 성과 */}
              <div className="bg-[#EFF1C5]/5 border border-[#EFF1C5]/20 rounded-xl px-4 py-2.5">
                <p className="text-[#EFF1C5] font-extrabold text-sm xl:text-base mb-2" style={orbitron}>▸ 성과</p>
                <ul className="space-y-1.5">
                  {projectInfo.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[#EFF1C5]/70 text-sm xl:text-base">
                      <span className="text-[#61BA91] shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

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
      {activeModal && <DetailModal label={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  )
}

export default PopspotSection
