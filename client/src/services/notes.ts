import type { Note } from "@/types";

type NoteInput = Omit<Note, "id" | "userId" | "createdAt" | "updatedAt">;

const API = () => import.meta.env.VITE_API_URL as string || "http://localhost:5000/api/v1";

const authHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
});

export const getAllNotesByUserId = async (token: string): Promise<Note[]> => {
    const response = await fetch(`${API()}/notes`, {
        headers: authHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to fetch notes");
    return response.json();
};

export const getNoteById = async (token: string, noteId: string): Promise<Note> => {
    const response = await fetch(`${API()}/notes/${noteId}`, {
        headers: authHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to fetch note");
    return response.json();
};

export const createNote = async (token: string, data: NoteInput): Promise<Note> => {
    const response = await fetch(`${API()}/notes`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create note");
    return response.json();
};

export const updateNote = async (
    token: string,
    noteId: string,
    data: Partial<NoteInput>
): Promise<Note> => {
    const response = await fetch(`${API()}/notes/${noteId}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update note");
    return response.json();
};

export const deleteNote = async (token: string, noteId: string): Promise<void> => {
    const response = await fetch(`${API()}/notes/${noteId}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to delete note");
};
