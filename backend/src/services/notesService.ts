import { Note } from "../models/Note";
import { CreateNoteInput, UpdateNoteInput } from "../validators/notesSchema";
import { AppError } from "../middleware/errorHandler";

// Notes Service
export class NoteService {
  // Get all notes for a user
  async findAllByUserId(userId: string): Promise<Note[]> {
    return Note.findAll({
      where: { userId },
      order: [["updatedAt", "DESC"]],
    });
  }

  // find Note by id, and user Id
  async findByIdAndUserId(id: string, userId: string): Promise<Note> {
    const note = await Note.findOne({
      where: { id, userId },
    });

    if (!note) throw new AppError(404, "Note not founded");

    return note;
  }

  // Create Note;
  async create(userId: string, data: CreateNoteInput): Promise<Note> {
    return Note.create({
      userId,
      ...data,
    });
  }

  // Update Note
  async update(
    id: string,
    userId: string,
    data: UpdateNoteInput,
  ): Promise<Note> {
    const note = await this.findByIdAndUserId(id, userId);
    await note.update({
      ...data,
      summary: data.summary === null ? undefined : data.summary,
    });

    return note;
  }

  // delete
  async delete(id: string, userId: string): Promise<void> {
    const note = await this.findByIdAndUserId(id, userId);
    await note.destroy();
  }
}

export const noteService = new NoteService();
