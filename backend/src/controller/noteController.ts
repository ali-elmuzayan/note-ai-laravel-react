import { Request, Response, NextFunction } from "express";
import { noteService } from "../services/notesService";
import { AppError } from "../middleware/errorHandler";
import { createNoteSchema, updateNoteSchema } from "../validators/notesSchema";

const getUserIdOrThrow = (req: Request): string => {
  const userId = (req as Request & { auth?: { userId: string } }).auth?.userId;
  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }
  return userId;
};

const getNoteIdOrThrow = (req: Request): string => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!id) {
    throw new AppError(400, "Note id is required");
  }
  return id;
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notes = await noteService.findAllByUserId(getUserIdOrThrow(req));
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const note = await noteService.findByIdAndUserId(
      getNoteIdOrThrow(req),
      getUserIdOrThrow(req),
    );
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = createNoteSchema.parse(req.body);
    const note = await noteService.create(getUserIdOrThrow(req), payload);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = updateNoteSchema.parse(req.body);
    const note = await noteService.update(
      getNoteIdOrThrow(req),
      getUserIdOrThrow(req),
      payload,
    );
    res.json(note);
  } catch (err) {
    next(err);
  }
};
  
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await noteService.delete(getNoteIdOrThrow(req), getUserIdOrThrow(req));
    res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
