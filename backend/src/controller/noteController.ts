import { Request, Response, NextFunction } from "express";
import { noteService } from "../services/notesService";

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await noteService.delete(id, req.auth!.userId);
    res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
