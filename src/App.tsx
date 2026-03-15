import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from '@/pages/Landing'
import HomePage from '@/pages/Home'
import ProjectsPage from '@/pages/Projects'
import { useAppStore } from '@/store'

/**
 * 루트 App 컴포넌트
 * 페이지 라우팅 및 Framer Motion 트랜지션 처리
 */
function App() {
  const currentPage = useAppStore((s) => s.currentPage)

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage />
        </motion.div>
      )}
      {currentPage === 'home' && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HomePage />
        </motion.div>
      )}
      {currentPage === 'projects' && (
        <motion.div
          key="projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectsPage />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
