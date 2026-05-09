import type { Project } from "@/types";

export const demoProjects: Project[] = [
  {
    id: "p1",
    name: "HRMs Platform",
    description: "Internal HR management system for employees and payroll.",
    status: "active",
    progress: 62,
    membersCount: 5,
    color: "bg-blue-500",
  },
  {
    id: "p2",
    name: "Note AI",
    description: "Smart notes app with AI-powered summaries and search.",
    status: "active",
    progress: 38,
    membersCount: 3,
    color: "bg-violet-500",
  },
  {
    id: "p3",
    name: "Portfolio v3",
    description: "Personal portfolio redesign with case studies.",
    status: "on-hold",
    progress: 20,
    membersCount: 1,
    color: "bg-amber-500",
  },
  {
    id: "p4",
    name: "Marketing site",
    description: "Landing pages and SEO content for product launch.",
    status: "completed",
    progress: 100,
    membersCount: 2,
    color: "bg-emerald-500",
  },
];
