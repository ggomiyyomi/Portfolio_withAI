/**
 * Skills 섹션 컴포넌트
 * SKILLS 제목 + 두 줄 무한 스크롤 기술스택 아이콘
 */

/** 스킬 아이템 타입 */
interface Skill {
  label: string
  icon: string
}

// Devicons CDN 기본 URL
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

/** 1행 스킬 목록 (백엔드 / 인프라 / DB 중심) */
const row1: Skill[] = [
  { label: 'Java',           icon: `${DI}/java/java-original.svg` },
  { label: 'Spring Boot',    icon: `${DI}/spring/spring-original.svg` },
  { label: 'Spring Security',icon: `${DI}/spring/spring-original.svg` },
  { label: 'Python',         icon: `${DI}/python/python-original.svg` },
  { label: 'FastAPI',        icon: `${DI}/fastapi/fastapi-original.svg` },
  { label: 'PostgreSQL',     icon: `${DI}/postgresql/postgresql-original.svg` },
  { label: 'MySQL',          icon: `${DI}/mysql/mysql-original.svg` },
  { label: 'MariaDB',        icon: `${DI}/mariadb/mariadb-original.svg` },
  { label: 'Oracle',         icon: `${DI}/oracle/oracle-original.svg` },
  { label: 'Redis',          icon: `${DI}/redis/redis-original.svg` },
  { label: 'AWS',            icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { label: 'Docker',         icon: `${DI}/docker/docker-original.svg` },
  { label: 'Nginx',          icon: `${DI}/nginx/nginx-original.svg` },
  { label: 'Apache Tomcat',  icon: `${DI}/tomcat/tomcat-original.svg` },
  { label: 'MyBatis',        icon: `${DI}/mybatis/mybatis-plain.svg` },
  { label: 'JPA',            icon: `${DI}/spring/spring-original.svg` },
  { label: 'GitHub Actions', icon: `${DI}/githubactions/githubactions-original.svg` },
  { label: 'Git',            icon: `${DI}/git/git-original.svg` },
]

/** 2행 스킬 목록 (프론트 / 툴 중심) */
const row2: Skill[] = [
  { label: 'TypeScript',     icon: `${DI}/typescript/typescript-original.svg` },
  { label: 'React',          icon: `${DI}/react/react-original.svg` },
  { label: 'Vite',           icon: `${DI}/vite/vite-original.svg` },
  { label: 'HTML5',          icon: `${DI}/html5/html5-original.svg` },
  { label: 'CSS3',           icon: `${DI}/css3/css3-original.svg` },
  { label: 'JavaScript',     icon: `${DI}/javascript/javascript-original.svg` },
  { label: 'Tailwind CSS',   icon: `${DI}/tailwindcss/tailwindcss-original.svg` },
  { label: 'Bootstrap',      icon: `${DI}/bootstrap/bootstrap-original.svg` },
  { label: 'GitHub',         icon: `${DI}/github/github-original.svg` },
  { label: 'Postman',        icon: `${DI}/postman/postman-original.svg` },
  { label: 'Figma',          icon: `${DI}/figma/figma-original.svg` },
  { label: 'Notion',         icon: `${DI}/notion/notion-original.svg` },
  { label: 'IntelliJ IDEA',  icon: `${DI}/intellij/intellij-original.svg` },
  { label: 'Eclipse',        icon: `${DI}/eclipse/eclipse-original.svg` },
  { label: 'VSCode',         icon: `${DI}/vscode/vscode-original.svg` },
  { label: 'Blender',        icon: `${DI}/blender/blender-original.svg` },
  { label: 'Google Colab',   icon: `${DI}/googlecolab/googlecolab-original.svg` },
  { label: 'DBeaver',        icon: `${DI}/dbeaver/dbeaver-original.svg` },
]

/** 스킬 아이콘 단일 아이템 */
const SkillItem = ({ skill }: { skill: Skill }) => (
  <div className="flex flex-col items-center gap-1.5 mx-2 md:mx-4 flex-shrink-0">
    <div className="w-16 h-16 md:w-30 md:h-30 flex items-center justify-center">
      <img
        src={skill.icon}
        alt={skill.label}
        className="w-10 h-10 md:w-20 md:h-20 object-contain"
        onError={(e) => {
          // 아이콘 로드 실패 시 첫 글자 표시
          const target = e.currentTarget
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent && !parent.querySelector('span')) {
            const span = document.createElement('span')
            span.textContent = skill.label[0]
            span.className = 'text-lg font-bold text-[#61BA91]'
            parent.appendChild(span)
          }
        }}
      />
    </div>
    <span className="text-[12px] text-[#9CA3AF] whitespace-nowrap tracking-wide">
      {skill.label}
    </span>
  </div>
)

/** 무한 스크롤 트랙 */
const MarqueeRow = ({
  skills,
  reverse = false,
}: {
  skills: Skill[]
  reverse?: boolean
}) => {
  // 아이템을 3번 복제해 끊김 없는 루프 구현
  const items = [...skills, ...skills, ...skills]

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {items.map((skill, i) => (
          <SkillItem key={`${skill.label}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  )
}

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-white gap-15 md:gap-20 overflow-hidden"
    >
      {/* SKILLS 제목 */}
      <h2
        className="text-4xl md:text-5xl font-bold tracking-[0.1em] text-white"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        SKILLS
      </h2>

      {/* 아이콘 스크롤 행 */}
      <div className="w-full flex flex-col gap-11 md:gap-16">
        <MarqueeRow skills={row1} />
        <MarqueeRow skills={row2} reverse />
      </div>
    </section>
  )
}

export default SkillsSection
