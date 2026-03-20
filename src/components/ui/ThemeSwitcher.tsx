/**
 * ThemeSwitcher 컴포넌트
 * - 다크/라이트 모드 토글: 우상단 고정
 * - 3가지 색상 테마 버튼: 좌하단 고정
 */
import { useEffect } from 'react'
import { useAppStore } from '@/store'

/** 지원 테마 목록 */
const THEMES = [
  { id: 'green', primary: '#61BA91', secondary: '#EFF1C5' },
  { id: 'blue',  primary: '#5B8DB8', secondary: '#D4E8F5' },
  { id: 'warm',  primary: '#C87C50', secondary: '#F5E4D0' },
] as const

const ThemeSwitcher = () => {
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)

  /** 마운트 시 localStorage에서 테마 및 모드 복원 */
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as typeof theme | null
    if (savedTheme && (savedTheme === 'green' || savedTheme === 'blue' || savedTheme === 'warm')) {
      setTheme(savedTheme)
    }
    const savedMode = localStorage.getItem('portfolio-mode') as 'dark' | 'light' | null
    if (savedMode && (savedMode === 'dark' || savedMode === 'light')) {
      setMode(savedMode)
      document.documentElement.setAttribute('data-mode', savedMode === 'light' ? 'light' : '')
    }
  }, [])

  /** 테마 변경 시 document 속성 업데이트 및 localStorage 저장 */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'green' ? '' : theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  /** 모드 변경 시 document 속성 업데이트 및 localStorage 저장 */
  const handleModeToggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    document.documentElement.setAttribute('data-mode', next === 'light' ? 'light' : '')
    localStorage.setItem('portfolio-mode', next)
  }

  return (
    <>
      {/* 다크/라이트 모드 토글 — 우상단 */}
      <button
        onClick={handleModeToggle}
        className="fixed top-6 right-6 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-text/10 hover:bg-text/20 transition-colors cursor-pointer"
        title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {mode === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            <line x1="12" y1="2" x2="12" y2="4" strokeLinecap="round" />
            <line x1="12" y1="20" x2="12" y2="22" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
            <line x1="2" y1="12" x2="4" y2="12" strokeLinecap="round" />
            <line x1="20" y1="12" x2="22" y2="12" strokeLinecap="round" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* 색상 테마 버튼 — 좌하단 */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <p className="text-secondary font-black text-[11px] leading-normal -rotate-6" style={{ fontFamily: 'Orbitron, sans-serif', WebkitTextStroke: '0.4px currentColor' }}>
          Choose The Color<br />You Want!
        </p>
        <div className="flex gap-1.5">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`w-6 h-6 rounded-full overflow-hidden transition-transform hover:scale-110 cursor-pointer ${
              theme === t.id ? 'ring-2 ring-text/60 ring-offset-1 ring-offset-bg' : ''
            }`}
            title={t.id}
          >
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <path d="M16,0 A16,16 0 0,0 16,32 L16,0 Z" fill={t.primary} />
              <path d="M16,0 A16,16 0 0,1 16,32 L16,0 Z" fill={t.secondary} />
            </svg>
          </button>
        ))}
        </div>
      </div>
    </>
  )
}

export default ThemeSwitcher
