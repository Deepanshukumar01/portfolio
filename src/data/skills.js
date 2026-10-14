import { Braces, Layout, Server, Database, Wrench } from "lucide-react";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import {
  SiC,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiPostman,
  SiIntellijidea,
} from "react-icons/si";

/**
 * Honest proficiency labels — adjust each skill's `level` as you grow.
 * Order here is the order shown in the legend.
 */
export const skillLevels = {
  comfortable: { label: "Comfortable with", short: "Comfortable", rank: 3 },
  working: { label: "Working knowledge", short: "Working knowledge", rank: 2 },
  learning: { label: "Currently learning", short: "Learning", rank: 1 },
};

export const skillCategories = [
  {
    title: "Programming",
    icon: Braces,
    description: "Core languages I use for DSA, coursework and projects.",
    skills: [
      { name: "C", icon: SiC, level: "comfortable" },
      { name: "Java", icon: FaJava, level: "comfortable" },
      { name: "Python", icon: SiPython, level: "working" },
      { name: "JavaScript", icon: SiJavascript, level: "comfortable" },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    description: "Responsive, accessible interfaces.",
    skills: [
      { name: "HTML", icon: SiHtml5, level: "comfortable" },
      { name: "CSS", icon: SiCss, level: "comfortable" },
      { name: "JavaScript", icon: SiJavascript, level: "comfortable" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "REST APIs and server-side logic.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: "working" },
      { name: "Express.js", icon: SiExpress, level: "learning" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Schema design and SQL queries.",
    skills: [
      { name: "MySQL", icon: SiMysql, level: "comfortable" },
      { name: "SQLite", icon: SiSqlite, level: "working" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    description: "Everyday development workflow.",
    skills: [
      { name: "Git", icon: SiGit, level: "comfortable" },
      { name: "GitHub", icon: SiGithub, level: "comfortable" },
      { name: "VS Code", icon: VscVscode, level: "comfortable" },
      { name: "Postman", icon: SiPostman, level: "working" },
      { name: "IntelliJ IDEA", icon: SiIntellijidea, level: "working" },
      { name: "MySQL Workbench", icon: SiMysql, level: "working" },
    ],
  },
];
