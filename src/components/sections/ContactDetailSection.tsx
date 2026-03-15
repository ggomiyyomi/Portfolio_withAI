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

/** 반투명 입력 필드 공통 스타일 */
const inputClass =
  'w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs md:text-sm placeholder:text-white/40 focus:outline-none focus:border-[#61BA91] transition-colors'

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
      <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl" style={orbitron}>
        Contact ME
      </h2>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border border-white/20">
          <img src="/assets/images/Profile.JPG" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-0.5" style={orbitron}>
          <p className="text-[#61BA91] font-bold text-xs md:text-sm">Hee-Jeong Seo</p>
          <p className="text-white/60 text-[10px] md:text-xs">heejung9865@naver.com</p>
        </div>
      </div>
    </div>
  )

  /** 우측: 이메일 폼 */
  const rightContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-3 w-full">
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-end mt-1 px-5 py-2 bg-[#61BA91] text-black font-bold text-xs md:text-sm rounded-lg hover:bg-[#4fa07a] transition-colors disabled:opacity-50 cursor-pointer"
        style={orbitron}
      >
        {status === 'sending' ? '전송 중...' : '이메일 전송'}
      </button>
      {status === 'success' && <p className="text-[#61BA91] text-xs text-right">이메일이 전송되었습니다!</p>}
      {status === 'error'   && <p className="text-red-400 text-xs text-right">전송에 실패했습니다. 다시 시도해주세요.</p>}
    </form>
  )

  return (
    <SectionCard nav={nav} clearProfile>

      {/* ══ 모바일 레이아웃 (< lg) ══ */}
      <div className="lg:hidden flex flex-col items-center justify-center h-140 md:h-160 px-6 md:px-10 pt-14 pb-14 gap-6 relative z-10">
        {leftContent}
        {rightContent}
      </div>

      {/* ══ 데스크탑 레이아웃 (lg+) ══ */}
      <div className="hidden lg:block lg:h-132.5 xl:h-155 2xl:h-175">
        <div className="absolute inset-0 flex items-center justify-center z-10 px-20 gap-16 xl:gap-24">
          {/* 좌측 */}
          <div className="flex-1">{leftContent}</div>
          {/* 우측 */}
          <div className="flex-1 max-w-sm xl:max-w-md">{rightContent}</div>
        </div>
      </div>

    </SectionCard>
  )
}

export default ContactDetailSection
