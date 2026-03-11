import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'

/**
 * Home 페이지 컴포넌트
 */
const HomePage = () => {
  return (
    <main className="bg-black text-white">
      <AboutSection />
      <SkillsSection />
    </main>
  )
}

export default HomePage
