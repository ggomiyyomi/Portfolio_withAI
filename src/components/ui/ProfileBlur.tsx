/**
 * ProfileBlur 컴포넌트
 * 카드 배경에 표시되는 프로필 이미지 블러 효과
 */

const ProfileBlur = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
    <div
      className="w-60 h-72 lg:w-100 lg:h-125 rounded-[20px] opacity-40"
      style={{
        filter: 'blur(40px)',
        backgroundImage: `url('/assets/images/Profile.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  </div>
)

export default ProfileBlur
