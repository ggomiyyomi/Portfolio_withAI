import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ContactSection from '@/components/sections/ContactSection'

/**
 * Home 페이지 컴포넌트
 */
const HomePage = () => {
  return (
    <main className="bg-black text-white">
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  )
}

export default HomePage
