import type { Note } from "@/types";

export const demoNotes: Note[] = [
  {
    id: "n1",
    title: "Welcome to Note AI",
    content:
      "This is your first note. Start by creating, editing, or searching your notes from this dashboard.",
    tags: ["intro", "getting-started"],
    updatedAt: "2026-05-01T10:15:00.000Z",
  },
  {
    id: "n2",
    title: "Project ideas",
    content:
      "1. AI-powered note summarizer\n2. Smart tag suggestions\n3. Voice-to-note transcription",
    tags: ["ideas", "ai"],
    updatedAt: "2026-05-03T08:45:00.000Z",
  },
  {
    id: "n3",
    title: "Reading list",
    content:
      "Designing Data-Intensive Applications, Clean Architecture, The Pragmatic Programmer.",
    tags: ["books", "learning"],
    updatedAt: "2026-04-28T19:22:00.000Z",
  },
  {
    id: "n4",
    title: "Daily standup template",
    content:
      "Yesterday: ...\nToday: ...\nBlockers: ...\nNotes: keep it short and actionable.",
    tags: ["work", "template"],
    updatedAt: "2026-05-05T07:00:00.000Z",
  },
  {
    id: "n5",
    title: "Grocery shopping",
    content: "Milk, eggs, bread, olive oil, tomatoes, spinach, chicken, rice.",
    tags: ["personal", "shopping"],
    updatedAt: "2026-05-06T17:30:00.000Z",
  },
  {
    id: "n6",
    title: "Tailwind v4 notes",
    content:
      "Use @theme to define design tokens. shadcn/ui works with the new tokens via CSS variables.",
    tags: ["dev", "tailwind", "ui"],
    updatedAt: "2026-05-07T12:10:00.000Z",
  },
  {
    id: "n7",
    title: "Trip to Alexandria",
    content:
      "Pack light. Visit the library, stay near the corniche, try seafood at sunset.",
    tags: ["travel", "personal"],
    updatedAt: "2026-04-22T14:05:00.000Z",
  },
  {
    id: "n8",
    title: "Meeting with team",
    content:
      "Discuss API contract for notes service, search indexing strategy, and pagination.",
    tags: ["work", "meeting"],
    updatedAt: "2026-05-08T09:00:00.000Z",
  },
];
