/**
 * FakeHunters 프로젝트 상세 섹션
 * Projects 캐러셀에서 FakeHunters 카드 클릭 시 표시
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const projectInfo = {
  purpose: '생성형 AI 기술 발전으로 인한 딥페이크 위협에 대응하여 영상·이미지·음성·텍스트를 통합 분석하는 탐지 플랫폼 구축',
  goals: [
    '멀티모달 딥페이크 탐지 파이프라인 설계 및 End-to-End 분석 시스템 구축',
    '이미지(Xception), 영상(Ensemble), 음성(CNN), 텍스트(Transformer) 기반 다양한 AI 모델 통합 분석 구조 구현',
    'AI 서버(FastAPI) – Backend(Spring Boot) – Frontend(React) 간 비동기 처리 기반 통합 아키텍처 설계',
  ],
  achievements: [
    '이미지·영상·음성·텍스트를 통합 분석하는 멀티모달 딥페이크 탐지 서비스 구현',
    '비동기 분석(Polling + Redis) 기반 대용량 파일 처리 및 실시간 분석 상태 관리 시스템 구축',
    'Presigned URL 기반 S3 업로드 구조 적용으로 보안성과 확장성을 고려한 파일 처리 아키텍처 구현',
    'Grad-CAM 및 AI 분석 리포트 시각화를 통해 설명 가능한 AI 서비스 구현',
    'AI 서버–백엔드–프론트엔드 간 연동을 통한 End-to-End 분석 파이프라인 완성',
    '팀 내 최단 기간 내 핵심 기능 구현 및 PoC 프로젝트 성공적으로 완료',
  ],
}

const detailButtons = ['기술 스택', '담당 업무', '트러블슈팅', '발표 자료'] as const
type DetailButton = typeof detailButtons[number]

const d = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const techStack = [
  {
    label: 'Front End',
    items: [
      { name: 'React 19', logo: `${d}/react/react-original.svg` },
      { name: 'Vite', logo: `${d}/vite/vite-original.svg` },
      { name: 'JavaScript', logo: `${d}/javascript/javascript-original.svg` },
      { name: 'Tailwind', logo: `${d}/tailwindcss/tailwindcss-original.svg` },
      { name: 'Zustand', logo: `${d}/react/react-original.svg` },
    ],
  },
  {
    label: 'Back End',
    items: [
      { name: 'Java 21', logo: `${d}/java/java-original.svg` },
      { name: 'Spring Boot', logo: `${d}/spring/spring-original.svg` },
      { name: 'Spring AI', logo: `${d}/spring/spring-original.svg` },
      { name: 'MyBatis', logo: `${d}/java/java-original.svg` },
    ],
  },
  {
    label: 'AI Service',
    items: [
      { name: 'Python 3.11', logo: `${d}/python/python-original.svg` },
      { name: 'FastAPI', logo: `${d}/fastapi/fastapi-original.svg` },
      { name: 'PyTorch', logo: `${d}/pytorch/pytorch-original.svg` },
      { name: 'OpenCV', logo: `${d}/opencv/opencv-original.svg` },
    ],
  },
  {
    label: 'Storage / DB',
    items: [
      { name: 'PostgreSQL', logo: `${d}/postgresql/postgresql-original.svg` },
      { name: 'Redis', logo: `${d}/redis/redis-original.svg` },
      { name: 'Amazon S3', logo: `${d}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
    ],
  },
  {
    label: 'Infra',
    items: [
      { name: 'AWS', logo: `${d}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
      { name: 'Nginx', logo: `${d}/nginx/nginx-original.svg` },
    ],
  },
  {
    label: '협업 / 개발',
    items: [
      { name: 'Git', logo: `${d}/git/git-original.svg` },
      { name: 'GitHub', logo: `${d}/github/github-original.svg`, invert: true },
      { name: 'Postman', logo: `${d}/postman/postman-original.svg` },
      { name: 'Notion', logo: 'https://cdn.simpleicons.org/notion/ffffff' },
      { name: 'Figma', logo: `${d}/figma/figma-original.svg` },
    ],
  },
]

const myTasks = [
  '이미지 딥페이크 탐지 모델 연동 및 분석 결과 서비스화',
  'Grad-CAM 기반 판별 근거 시각화 기능 구현으로 AI 결과 해석 가능성 향상',
  '이미지·오디오 분석 결과 UI/UX 설계 및 프론트엔드 연동 처리',
  '비동기 분석 처리(Polling) 구조 설계로 분석 상태 관리 및 사용자 대기 경험 개선',
]

const TASK_IMAGES = [
  '/assets/images/FakeHunters1.png',
  '/assets/images/FakeHunters2.png',
  '/assets/images/FakeHunters3.png',
]

const PDF_PATH = '/assets/pdf/FakehuntersProject.pdf'

const troubleshootings = [
  {
    title: 'S3 Key 불일치',
    problem: {
      summary: 'Presigned URL 기반 S3 업로드 방식을 적용했습니다. 딥페이크 분석 서비스 특성상 개인 이미지·영상 데이터가 포함되어 보안을 고려해 파일을 서버를 거치지 않고 직접 S3에 업로드하도록 설계했습니다. 그러나 S3 업로드는 정상 완료되었지만, 이후 FastAPI와 Spring Backend에서 해당 파일을 조회하지 못하는 문제가 발생했습니다.',
      causes: [
        'FastAPI는 전달받은 key를 그대로 사용하고, Backend는 별도 규칙으로 key를 생성·DB 저장하여 Key가 서비스마다 다르게 생성됨',
        'Presigned URL 생성 시 key와 DB 저장 key가 일치하지 않음',
        '각 분석 API(/api/v1/*/analyze)에서 업로드 처리 과정이 분리되어 S3 Key 생성 책임이 분산되는 구조적 문제 발생',
      ],
      results: [
        'S3 업로드 성공 후 AI 서버 및 백엔드에서 파일 조회 실패',
        '서비스 간 Key 불일치로 인한 분석 파이프라인 전체 장애',
      ],
    },
    solution: {
      summary: 'S3 객체 Key 네이밍 규칙을 단일화하고, 서비스 간 파일 경로 계약(Contract)을 정의했습니다.',
      before: `# S3Client - key를 외부에서 그대로 받는 구조\n# Key 생성 책임이 외부에 있어 서비스마다 다르게 생성되는 구조\ndef upload_bytes(self, key: str, data: bytes, content_type: str):\n    self.s3.put_object(\n        Bucket=self.bucket,\n        Key=key,\n        Body=data,\n        ContentType=content_type,\n    )`,
      after: `// Backend - Key 생성 규칙 통일\n// 모든 서비스에서 동일한 Key 생성 규칙 사용\nString key = "/media/" + analysisId + "/" + timestamp + "_" + filename;\n\n# FastAPI - 동일 규칙 적용\nkey = f"/media/{analysis_id}/{timestamp}_{filename}"`,
    },
    improvements: [
      '업로드된 파일을 모든 서비스에서 정상 조회 가능',
      'S3 파일 저장 및 접근 구조의 일관성 확보',
      'Presigned URL 적용으로 안전한 파일 업로드 구조 구축',
      '멀티 서버 환경에서도 안정적인 데이터 처리 가능',
    ],
  },
  {
    title: '모델 학습 데이터 샘플링',
    problem: {
      summary: '딥페이크 이미지 탐지 모델 학습 과정에서 검증 성능(AUC)이 기대보다 낮게 나타나는 문제가 발생했습니다.',
      causes: [
        '학습 데이터 수를 제한하기 위해 MAX_PER_CLASS 값을 낮게 설정하여 사용 (MAX_PER_CLASS = 2000)',
        '클래스별 데이터가 충분히 반영되지 못함',
        '데이터 다양성이 부족하여 모델 일반화 성능 저하',
      ],
      results: [
        '검증 AUC 0.9487로 목표 성능 미달',
        '데이터 샘플링 제한으로 인한 학습 성능 저하',
      ],
    },
    solution: {
      summary: '클래스별 사용 데이터 수를 점진적으로 증가시켜 동일 Epoch 조건에서 성능을 비교했습니다.',
      points: [
        '샘플 수 점진적 확장: 2000 → 5000 → 10000',
        '충분한 데이터 분포를 반영하도록 샘플링 전략 개선',
        '동일 Epoch 조건에서 AUC 성능 비교 실험 진행',
      ],
    },
    improvements: [
      'MAX_PER_CLASS 2000 → AUC 0.9487',
      'MAX_PER_CLASS 5000 → AUC 0.9860',
      'MAX_PER_CLASS 10000 → AUC 0.9946 (최종 채택)',
      '데이터 다양성 확보로 모델 일반화 성능 개선',
      '향후 앙상블 모델 적용 및 데이터 확장을 통한 추가 성능 개선 계획',
    ],
    image: '/assets/images/FakeHunters4.png',
  },
]

/** 상세 모달 */
const DetailModal = ({ label, onClose }: { label: DetailButton; onClose: () => void }) => {
  const isTechStack = label === '기술 스택'
  const isMyTask = label === '담당 업무'
  const isTrouble = label === '트러블슈팅'
  const isPdf = label === '발표 자료'
  const [slideIdx, setSlideIdx] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

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
            'bg-[#111] border border-white/20 rounded-2xl p-6 md:p-10 flex flex-col gap-5 w-full max-h-[90vh] overflow-y-auto',
            isWide || isMyTask ? 'max-w-3xl' : 'max-w-md md:max-w-lg',
          ].join(' ')}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-[#61BA91] font-bold text-base md:text-lg" style={orbitron}>{label}</p>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
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
                        <img src={logo} alt={name} className="w-9 h-9 object-contain"
                          style={invert ? { filter: 'invert(1)' } : undefined} />
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
              {/* 슬라이드쇼 */}
              <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <img
                  src={TASK_IMAGES[slideIdx]}
                  alt={`담당 업무 ${slideIdx + 1}`}
                  className="w-full h-[40vh] object-cover"
                />
                {/* 이전 버튼 */}
                <button
                  onClick={() => setSlideIdx((i) => (i - 1 + TASK_IMAGES.length) % TASK_IMAGES.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* 다음 버튼 */}
                <button
                  onClick={() => setSlideIdx((i) => (i + 1) % TASK_IMAGES.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* 점 인디케이터 */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {TASK_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === slideIdx ? 'bg-[#61BA91]' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {myTasks.map((task, i) => (
                  <li key={i} className="flex gap-2 text-white/80 text-sm md:text-base">
                    <span className="text-[#61BA91] shrink-0">✓</span>{task}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isPdf && (
            <>
              <iframe src={PDF_PATH} className="w-full rounded-xl border border-white/10"
                style={{ height: '60vh' }} title="발표 자료" />
              <a href={PDF_PATH} download="FakeHunters_발표자료.pdf"
                className="self-start flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full border border-[#61BA91] text-[#61BA91] hover:bg-[#61BA91] hover:text-black transition-colors cursor-pointer"
                style={orbitron}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                다운로드
              </a>
            </>
          )}

          {isTrouble && (
            <div className="flex flex-col gap-4">
              {/* 탭 버튼 */}
              {troubleshootings.length > 1 && (
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
              )}

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
                        <code>{'after' in ts.solution ? ts.solution.after : ''}</code>
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
                  <img src={ts.image} alt={ts.title} className="w-full object-contain" />
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
          <div className="flex flex-col items-center px-6 md:px-10 gap-5 overflow-y-auto flex-1 pt-2 pb-4">

            {/* 뒤로가기 버튼 */}
            <div className="w-full shrink-0">
              <button onClick={() => setCurrentPage('projects')}
                className="flex items-center text-[#EFF1C5]/60 hover:text-[#EFF1C5] transition-colors cursor-pointer">
                <svg viewBox="0 0 1024 1024" className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="60">
                  <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
                </svg>
                <span className="ml-1 font-bold text-sm" style={orbitron}>Showcase</span>
              </button>
            </div>

            {/* 이미지 + 날짜 */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative w-36 md:w-52 bg-[#D2F1FB] rounded-2xl overflow-hidden aspect-3/4">
                <img src="/assets/images/FakeHunters.png" alt="FakeHunters"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1.7)', transformOrigin: 'center' }} />
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
              <p className="text-white text-[10px] md:text-xs font-bold">AI 기반 멀티모달 딥페이크 탐지 웹 플랫폼</p>

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
          <div className="absolute top-24 left-8 z-20">
            <button onClick={() => setCurrentPage('projects')}
              className="flex items-center gap-1.5 text-[#EFF1C5]/60 hover:text-[#EFF1C5] transition-colors cursor-pointer text-xs font-bold"
              style={orbitron}>
              <svg viewBox="0 0 1024 1024" className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="60">
                <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
              </svg>
              <span className="font-bold text-base" style={orbitron}>Showcase</span>
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 px-16 gap-12 xl:gap-20">

            {/* 좌측: 이미지 + 날짜 */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative w-44 xl:w-56 bg-[#D2F1FB] rounded-2xl overflow-hidden aspect-3/4">
                <img src="/assets/images/FakeHunters.png" alt="FakeHunters"
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(-30deg) scale(1.7)', transformOrigin: 'center' }} />
                <a href="https://github.com/2026-PoC-AI" target="_blank" rel="noreferrer"
                  className="group absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/65 transition-colors cursor-pointer"
                  style={orbitron}>
                  <span className="px-4 py-2 text-xs font-extrabold rounded-full border-2 border-white text-white bg-black/70 group-hover:bg-white group-hover:text-black transition-colors duration-200">View GITHUB</span>
                </a>
              </div>
              <p className="text-[#EFF1C5]/60 text-xs font-bold" style={orbitron}>2026.01.06 ~ 2026.01.29</p>
            </div>

            {/* 우측: 제목 + 목적/목표/성과 + 상세 버튼 */}
            <div className="flex flex-col gap-2.5 flex-1 max-w-lg xl:max-w-xl overflow-y-auto max-h-[calc(100vh-10rem)]">
              <h2 className="text-white font-bold text-2xl xl:text-3xl shrink-0" style={orbitron}>FAKE HUNTERS</h2>
              <p className="text-white text-xs xl:text-sm font-bold shrink-0">AI 기반 멀티모달 딥페이크 탐지 웹 플랫폼</p>

              {/* 목적 */}
              <div className="bg-[#61BA91]/10 border border-[#61BA91]/30 rounded-xl px-4 py-2 shrink-0">
                <p className="text-[#61BA91] font-extrabold text-xs xl:text-sm mb-1" style={orbitron}>▸ 목적</p>
                <p className="text-[#EFF1C5]/80 text-xs xl:text-sm">{projectInfo.purpose}</p>
              </div>

              {/* 목표 */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 shrink-0">
                <p className="text-white font-extrabold text-xs xl:text-sm mb-1.5" style={orbitron}>▸ 목표</p>
                <ul className="space-y-1">
                  {projectInfo.goals.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[#EFF1C5]/70 text-xs xl:text-sm">
                      <span className="text-[#EFF1C5]/40 shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 성과 */}
              <div className="bg-[#EFF1C5]/5 border border-[#EFF1C5]/20 rounded-xl px-4 py-2 shrink-0">
                <p className="text-[#EFF1C5] font-extrabold text-xs xl:text-sm mb-1.5" style={orbitron}>▸ 성과</p>
                <ul className="space-y-1">
                  {projectInfo.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[#EFF1C5]/70 text-xs xl:text-sm">
                      <span className="text-[#61BA91] shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 상세 버튼 */}
              <div className="flex gap-2 flex-wrap mt-0.5 shrink-0">
                {detailButtons.map(btn => (
                  <button key={btn} onClick={() => setActiveModal(btn)}
                    className="px-3 py-1 text-xs font-extrabold rounded-xl border-2 border-[#EFF1C5]/50 text-[#EFF1C5] hover:border-[#EFF1C5] hover:bg-[#EFF1C5]/10 transition-colors cursor-pointer"
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

export default FakeHuntersSection
