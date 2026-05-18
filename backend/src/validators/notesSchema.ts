import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string(),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().optional(),
  summary: z.string().nullable().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
