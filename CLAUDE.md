# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: AI Portfolio Website

## Overview

3D 애니메이션을 활용한 AI 기반 풀스택 개발자 포트폴리오 웹사이트.

## Tech Stack

- Language : TypeScript
- Framework : React 19 / Vite
- Styling : Tailwind CSS 4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed)
- State : Zustand (`src/store/index.ts`)
- Animation : Framer Motion
- Deployment : Vercel
- Git: https://github.com/ggomiyyomi/Portfolio_withAI

## Commands

```bash
npm run dev       # 개발 서버 실행
npm run build     # 타입체크 + 빌드
npm run lint      # ESLint 실행
npm run preview   # 빌드 미리보기
```

## Project Structure

```
src/
├── components/
│   ├── ui/         # 재사용 가능한 기본 UI 컴포넌트
│   ├── layout/     # 레이아웃 컴포넌트 (Header, Footer 등)
│   └── sections/   # 페이지 섹션 컴포넌트
├── pages/
│   ├── Landing/    # 랜딩 페이지 (MP4 hero 배경)
│   └── Home/       # 메인 포트폴리오 페이지
├── assets/         # 정적 에셋 (src에서 import하는 것)
│   ├── images/
│   ├── video/
│   └── design/
├── hooks/          # 커스텀 React 훅
├── store/          # Zustand 스토어
└── styles/         # 글로벌 CSS (Tailwind 유틸리티로 처리 안 되는 것)
public/
└── assets/video/landing.mp4   # Landing hero 비디오 (Vite가 그대로 서빙)
```

## Design System

Primary color
#61BA91

Secondary color
#EFF1C5

White
#FFFFFF

Background
#000000

Secondary text
#9CA3AF

Transparency rule
UI overlays and glass effects should use 20–30% opacity.

Examples
bg-[#61BA91]/20  
bg-white/20  
bg-black/30

## Typography

Primary font

Orbitron
https://fonts.google.com/specimen/Orbitron

Use Orbitron for titles and headings.
Body text should remain readable and minimal.

## Architecture

- **라우팅**: React Router 없이 Zustand `currentPage` 상태로 페이지 전환. `App.tsx`에서 `AnimatePresence`로 페이지 트랜지션.
- **Tailwind CSS 4**: `src/index.css` 상단에 `@import "tailwindcss";` 한 줄로 적용. 별도 config 파일 없음.
- **Path alias**: `@/` → `src/` (vite.config.ts + tsconfig.app.json 모두 설정됨).
- **Landing 비디오**: `/assets/video/landing.mp4` 경로로 서빙 (`public/assets/video/` 폴더에 배치).

## Code Style Rules

- 커밋 메시지는 한글로 작성
- 모든 함수에 JSDoc 주석 추가
- console.log 대신 logger 사용
- 코드 생성 시 모듈화된 구조 유지
- 모바일 반응형 필수
