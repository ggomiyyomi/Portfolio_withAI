/**
 * Landing 페이지 컴포넌트
 * Blender로 제작된 MP4 영상을 hero 배경으로 사용
 */
const LandingPage = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/video/landing.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">HeeJeong</h1>
        <p className="mt-4 text-xl md:text-2xl text-white/70">AI-based Full Stack Developer</p>
      </div>
    </main>
  )
}

export default LandingPage
