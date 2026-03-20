/**
 * Contact 섹션 컴포넌트
 * 흰 배경 + CONTACT with me 타이틀 + 이메일 + GitHub / Tistory 링크
 */

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const ContactSection = () => {
  return (
    <section className="mode-inverted w-full min-h-screen bg-surface flex flex-col justify-center items-center py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-16">

      {/* ── 타이틀 영역 ── */}
      <div className="flex flex-col items-start md:flex-row md:items-end gap-1 md:gap-5 lg:gap-6">
        <h2
          className="font-extrabold text-primary text-6xl md:text-9xl lg:text-[10rem] leading-none"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          CONTACT
        </h2>
        <span
          className="font-bold text-primary text-xl md:text-3xl lg:text-4xl md:pb-2 lg:pb-4"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          with me.
        </span>
      </div>

      {/* ── 연락처 영역 ── */}
      <div className="mt-14 md:mt-20 lg:mt-24 flex flex-col items-center gap-5 md:gap-10">

        {/* 이메일 */}
        <a
          href="mailto:heejung9865@naver.com"
          className="text-primary text-sm md:text-base hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          heejung9865@naver.com
        </a>

        {/* 링크 목록 */}
        <div className="flex flex-col items-start gap-2 md:gap-5">

          {/* GitHub */}
          <a
            href="https://github.com/ggomiyyomi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text hover:text-primary transition-colors"
          >
            <img
              src={`${DI}/github/github-original.svg`}
              alt="GitHub"
              className="w-5 h-5 md:w-6 md:h-6 icon-invert"
            />
            <span className="font-bold text-sm md:text-base" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              GITHUB
            </span>
          </a>

          {/* Tistory */}
          <a
            href="https://doyiya24.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text hover:text-primary transition-colors"
          >
            <img
              src="/assets/icons/Tistoryicon.svg"
              alt="Tistory"
              className="w-5 h-5 md:w-6 md:h-6 shrink-0"
            />
            <span className="font-bold text-sm md:text-base" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              TISTORY
            </span>
          </a>

        </div>
      </div>

    </section>
  )
}

export default ContactSection
