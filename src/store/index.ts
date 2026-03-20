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
  theme: 'green' | 'blue' | 'warm'
  setTheme: (theme: 'green' | 'blue' | 'warm') => void
  mode: 'dark' | 'light'
  setMode: (mode: 'dark' | 'light') => void
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),
  projectsActiveIndex: 0,
  setProjectsActiveIndex: (index) => set({ projectsActiveIndex: index }),
  theme: 'green',
  setTheme: (theme) => set({ theme }),
  mode: 'dark',
  setMode: (mode) => set({ mode }),
}))
