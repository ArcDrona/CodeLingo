import { IconType } from "react-icons";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiPrisma,
  SiExpress,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaNodeJs, FaPython } from "react-icons/fa";
import Link from "next/link";

type CourseItem = {
  name: string;
  Icon: IconType;
  color: string;
};

const COURSES: CourseItem[] = [
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Node.js", Icon: FaNodeJs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#111827" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "Docker", Icon: SiDocker, color: "#0db7ed" },
  { name: "Prisma ORM", Icon: SiPrisma, color: "#2D3748" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#000000" },
  { name: "Python", Icon: FaPython, color: "#3776AB" },
];

export default function CourseList() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-5/12 flex flex-col justify-center" style={{ minHeight: '24rem' }}>
          <h2 className="font-logo text-4xl md:text-5xl leading-tight bg-gradient-to-r from-teal-600 via-indigo-600 to-pink-600 text-transparent bg-clip-text pb-4">
            What is CodeLingo?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            CodeLingo helps you learn modern web development with curated, hands-on topics.
            Understand fundamentals, and level up your skills across front-end and
            back-end technologies. Pick a course on the right to get started.
          </p>
        </div>

        <div className="w-full md:w-7/12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {COURSES.map((course) => (
              <CourseCard key={course.name} name={course.name} Icon={course.Icon} color={course.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ name, Icon, color }: CourseItem) {
  const backgroundGradient = `linear-gradient(135deg, ${hexToRgba(color, 0.08)} 0%, ${hexToRgba(
    color,
    0.18
  )} 100%)`;

  return (
    <Link href={`/courses/${encodeURIComponent(name)}`} passHref>
      <div
        className="group relative rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm p-3 hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
        style={{ background: backgroundGradient }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
            <Icon size={28} style={{ color }} />
          </div>
          <div className="mt-2 text-xs font-medium text-gray-800">{name}</div>
        </div>
      </div>
    </Link>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


