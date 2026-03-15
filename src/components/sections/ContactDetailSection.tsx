/**
 * ContactDetail 섹션 컴포넌트
 * Contact 탭 클릭 시 표시되는 이메일 문의 폼
 *
 * 이메일 전송: EmailJS 사용
 * 설정 필요: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 *
 * 브레이크포인트:
 *   default (< lg) : 모바일 — 세로 스택
 *   lg+            : 데스크탑 — 좌(타이틀+프로필) / 우(폼) 2컬럼
 */
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useAppStore } from '@/store'
import SectionCard from '@/components/ui/SectionCard'

const orbitron = { fontFamily: 'Orbitron, sans-serif' }

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

/** Name/Email 필드 스타일 — 알약형 */
const pillInputClass =
  'w-full bg-[rgba(180,180,180,0.35)] h-7 md:h-9 rounded-full px-3 text-[10px] md:text-xs text-white placeholder:text-white/70 focus:outline-none'

/** Message 필드 스타일 — 둥근 사각형 */
const messageClass =
  'w-full bg-[rgba(100,100,100,0.45)] h-20 md:h-32 lg:h-48 rounded-[10px] md:rounded-[14px] px-3 md:px-4 py-2 md:py-3 text-[10px] md:text-xs text-white placeholder:text-white/70 focus:outline-none resize-none'

const ContactDetailSection = () => {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /** 폼 제출 — EmailJS로 이메일 전송 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }, PUBLIC_KEY)
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const nav = (
    <div className="flex font-bold items-center gap-3 md:gap-5 lg:gap-8 text-[10px] md:text-sm lg:text-xl text-center whitespace-nowrap" style={orbitron}>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('home')}>Home</div>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('projects')}>Projects</div>
      <div className="text-white hover:text-[#61ba91] transition-colors cursor-pointer" onClick={() => setCurrentPage('about')}>About</div>
      <div className="text-[#61BA91] cursor-pointer">Contact</div>
    </div>
  )

  /** 좌측: 타이틀 + 프로필 정보 */
  const leftContent = (
    <div className="flex flex-col gap-4 md:gap-6">
      <h2 className="text-white font-bold text-xl md:text-3xl lg:text-5xl" style={orbitron}>
        Contact ME
      </h2>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-9 h-9 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#61BA91]">
          <img src="/assets/images/Profile.JPG" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-0.5" style={orbitron}>
          <p className="text-[#61BA91] font-bold text-[10px] md:text-xs lg:text-base">Hee-Jeong Seo</p>
          <p className="text-white/60 text-[9px] md:text-[10px] lg:text-sm">heejung9965@naver.com</p>
        </div>
      </div>
    </div>
  )

  /** 우측: 이메일 폼 */
  const rightContent = (
    <form onSubmit={handleSubmit} className="bg-white/5 rounded-[20px] p-5 flex flex-col gap-3 w-full">
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
        className={pillInputClass}
        style={orbitron}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
        className={pillInputClass}
        style={orbitron}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        value={formData.message}
        onChange={handleChange}
        className={messageClass}
        style={orbitron}
      />
      <div className="flex flex-col items-center gap-1 mt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-28 h-7 md:w-36 md:h-8 bg-[#61BA91] text-white font-bold text-[10px] md:text-xs rounded-full hover:bg-[#4fa07a] transition-colors disabled:opacity-50 cursor-pointer"
          style={orbitron}
        >
          {status === 'sending' ? '전송 중...' : '이메일 전송'}
        </button>
        {status === 'success' && <p className="text-[#61BA91] text-xs">이메일이 전송되었습니다!</p>}
        {status === 'error'   && <p className="text-red-400 text-xs">전송에 실패했습니다. 다시 시도해주세요.</p>}
      </div>
    </form>
  )

  return (
    <SectionCard nav={nav} profileOpacity={0.7}>

      {/* ══ 모바일 레이아웃 (< lg) ══ */}
      <div className="lg:hidden flex flex-col items-center justify-center h-140 md:h-160 px-6 md:px-10 pt-14 pb-14 gap-5 md:gap-8 relative z-10">
        {leftContent}
        <div className="w-full md:w-96">{rightContent}</div>
      </div>

      {/* ══ 데스크탑 레이아웃 (lg+) ══ */}
      <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">
        <div className="absolute inset-0 flex items-center justify-center z-10 px-20 gap-20">
          {/* 좌측 */}
          <div>{leftContent}</div>
          {/* 우측 */}
          <div className="w-80 xl:w-90">{rightContent}</div>
        </div>
      </div>

    </SectionCard>
  )
}

export default ContactDetailSection
