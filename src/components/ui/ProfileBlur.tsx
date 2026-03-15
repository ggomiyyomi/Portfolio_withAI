/**
 * ProfileBlur 컴포넌트
 * 카드 배경에 표시되는 프로필 이미지
 * blurAmount=0 이면 선명하게, 기본값(40)은 블러 효과
 */

interface ProfileBlurProps {
  /** 블러 강도(px). 0이면 선명하게 표시 */
  blurAmount?: number
  /** 이미지 투명도 (0~1) */
  opacity?: number
}

const ProfileBlur = ({ blurAmount = 40, opacity = 0.4 }: ProfileBlurProps) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
    <div
      className="w-60 h-72 lg:w-100 lg:h-125 rounded-[20px]"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
        opacity,
        backgroundImage: `url('/assets/images/Profile.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  </div>
)

export default ProfileBlur
