import type { Task } from "@/types";

export const demoTasks: Task[] = [
  {
    id: "t1",
    title: "Finalize Q2 OKRs",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-05-09T17:00:00.000Z",
    projectId: "p1",
  },
  {
    id: "t2",
    title: "Review pull request #142",
    status: "todo",
    priority: "medium",
    dueDate: "2026-05-09T12:00:00.000Z",
    projectId: "p2",
  },
  {
    id: "t3",
    title: "Design HRMs onboarding flow",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-05-10T16:00:00.000Z",
    projectId: "p1",
  },
  {
    id: "t4",
    title: "Write blog post draft",
    status: "todo",
    priority: "low",
    dueDate: "2026-05-12T10:00:00.000Z",
  },
  {
    id: "t5",
    title: "Refactor auth middleware",
    status: "done",
    priority: "medium",
    dueDate: "2026-05-07T18:00:00.000Z",
    projectId: "p2",
  },
  {
    id: "t6",
    title: "Pay invoices",
    status: "todo",
    priority: "medium",
    dueDate: "2026-05-09T20:00:00.000Z",
  },
];
