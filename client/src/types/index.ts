export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string; // ISO date
};

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date
  projectId?: string;
};

export type ProjectStatus = "active" | "on-hold" | "completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0-100
  membersCount: number;
  color: string; // tailwind bg color class fragment, e.g. "bg-blue-500"
};

export type PomodoroStats = {
  todaySessions: number;
  todayMinutes: number;
  weekSessions: number;
  currentStreakDays: number;
};
