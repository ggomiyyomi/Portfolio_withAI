/**
 * Zustand 글로벌 스토어
 * 앱 전체 상태 관리
 */
import { create } from 'zustand'

interface AppState {
  currentPage: 'landing' | 'home' | 'projects' | 'about' | 'contact' | 'certificationBible' | 'popspot' | 'fakeHunters'
  setCurrentPage: (page: AppState['currentPage']) => void
  projectsActiveIndex: number
  setProjectsActiveIndex: (index: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),
  projectsActiveIndex: 0,
  setProjectsActiveIndex: (index) => set({ projectsActiveIndex: index }),
}))
