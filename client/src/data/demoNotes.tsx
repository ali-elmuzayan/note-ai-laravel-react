import type { Note } from "@/types";

export const demoNotes: Note[] = [
  {
    id: "n1",
    title: "Welcome to Note AI",
    content:
      "This is your first note. Start by creating, editing, or searching your notes from this dashboard.",
    tags: ["intro", "getting-started"],
    summary: "A welcome note introducing the Note AI dashboard.",
    userId: "demo-user",
    createdAt: new Date("2026-05-01T09:45:00.000Z"),
    updatedAt: new Date("2026-05-01T10:15:00.000Z"),
  },
  {
    id: "n2",
    title: "Project ideas",
    content:
      "1. AI-powered note summarizer\n2. Smart tag suggestions\n3. Voice-to-note transcription",
    tags: ["ideas", "ai"],
    summary: "A list of AI-focused project ideas for the app.",
    userId: "demo-user",
    createdAt: new Date("2026-05-03T08:15:00.000Z"),
    updatedAt: new Date("2026-05-03T08:45:00.000Z"),
  },
  {
    id: "n3",
    title: "Reading list",
    content:
      "Designing Data-Intensive Applications, Clean Architecture, The Pragmatic Programmer.",
    tags: ["books", "learning"],
    summary: "A short reading list of software engineering books.",
    userId: "demo-user",
    createdAt: new Date("2026-04-28T18:50:00.000Z"),
    updatedAt: new Date("2026-04-28T19:22:00.000Z"),
  },
  {
    id: "n4",
    title: "Daily standup template",
    content:
      "Yesterday: ...\nToday: ...\nBlockers: ...\nNotes: keep it short and actionable.",
    tags: ["work", "template"],
    summary: "A concise template for daily standup updates.",
    userId: "demo-user",
    createdAt: new Date("2026-05-05T06:30:00.000Z"),
    updatedAt: new Date("2026-05-05T07:00:00.000Z"),
  },
  {
    id: "n5",
    title: "Grocery shopping",
    content: "Milk, eggs, bread, olive oil, tomatoes, spinach, chicken, rice.",
    tags: ["personal", "shopping"],
    summary: "A personal grocery shopping checklist.",
    userId: "demo-user",
    createdAt: new Date("2026-05-06T17:00:00.000Z"),
    updatedAt: new Date("2026-05-06T17:30:00.000Z"),
  },
  {
    id: "n6",
    title: "Tailwind v4 notes",
    content:
      "Use @theme to define design tokens. shadcn/ui works with the new tokens via CSS variables.",
    tags: ["dev", "tailwind", "ui"],
    summary: "Notes about Tailwind v4 theme tokens and shadcn/ui.",
    userId: "demo-user",
    createdAt: new Date("2026-05-07T11:35:00.000Z"),
    updatedAt: new Date("2026-05-07T12:10:00.000Z"),
  },
  {
    id: "n7",
    title: "Trip to Alexandria",
    content:
      "Pack light. Visit the library, stay near the corniche, try seafood at sunset.",
    tags: ["travel", "personal"],
    summary: "Travel reminders for a trip to Alexandria.",
    userId: "demo-user",
    createdAt: new Date("2026-04-22T13:20:00.000Z"),
    updatedAt: new Date("2026-04-22T14:05:00.000Z"),
  },
  {
    id: "n8",
    title: "Meeting with team",
    content:
      "Discuss API contract for notes service, search indexing strategy, and pagination.",
    tags: ["work", "meeting"],
    summary: "Meeting agenda for notes API and search planning.",
    userId: "demo-user",
    createdAt: new Date("2026-05-08T08:30:00.000Z"),
    updatedAt: new Date("2026-05-08T09:00:00.000Z"),
  },
];
