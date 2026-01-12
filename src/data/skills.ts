import {
  HTML5,
  CSS3,
  Sass,
  TailwindCSS,
  JavaScript,
  TypeScript,
  React,
  NextJS,
  PHP,
  Laravel,
  Firebase,
  Supabase,
  Git,
  Figma,
  Canva,
  Photoshop,
  Illustrator,
} from "../utils/skills";

export interface Skill {
  name: string;
  level: number;
  category: ("frontend" | "backend" | "devops" | "design" | "other")[];
  icon: React.ReactNode | string;
}

export const skills: Skill[] = [
  {
    name: "HTML5",
    level: 4,
    category: ["frontend"],
    icon: HTML5,
  },
  {
    name: "CSS3",
    level: 4,
    category: ["frontend"],
    icon: CSS3,
  },
  {
    name: "Sass",
    level: 3,
    category: ["frontend"],
    icon: Sass,
  },
  {
    name: "Tailwind CSS",
    level: 4,
    category: ["frontend"],
    icon: TailwindCSS,
  },
  {
    name: "JavaScript",
    level: 3,
    category: ["frontend", "backend"],
    icon: JavaScript,
  },
  {
    name: "TypeScript",
    level: 3,
    category: ["frontend", "backend"],
    icon: TypeScript,
  },
  {
    name: "React",
    level: 3,
    category: ["frontend"],
    icon: React,
  },
  {
    name: "Next.js",
    level: 3,
    category: ["frontend", "backend"],
    icon: NextJS,
  },
  {
    name: "PHP",
    level: 2,
    category: ["backend"],
    icon: PHP,
  },
  {
    name: "Laravel",
    level: 2,
    category: ["backend"],
    icon: Laravel,
  },
  {
    name: "Firebase",
    level: 3,
    category: ["backend"],
    icon: Firebase,
  },
  {
    name: "Supabase",
    level: 3,
    category: ["backend"],
    icon: Supabase,
  },
  {
    name: "Git",
    level: 4,
    category: ["other"],
    icon: Git,
  },
  {
    name: "Figma",
    level: 3,
    category: ["design"],
    icon: Figma,
  },
  {
    name: "Canva",
    level: 3,
    category: ["design"],
    icon: Canva,
  },
  {
    name: "Photoshop",
    level: 1,
    category: ["design"],
    icon: Photoshop,
  },
  {
    name: "Illustrator",
    level: 1,
    category: ["design"],
    icon: Illustrator,
  },
];
