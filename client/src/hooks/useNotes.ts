import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/react";
import type { Note } from "@/types";
import {
    getAllNotesByUserId,
    getNoteById,
    createNote as createNoteService,
    updateNote as updateNoteService,
    deleteNote as deleteNoteService,
} from "@/services/notes";

type NoteInput = Omit<Note, "id" | "userId" | "createdAt" | "updatedAt">;

const useNotes = (noteId?: string) => {
    const { getToken, isLoaded, isSignedIn } = useAuth();

    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resolveToken = useCallback(async () => {
        const token = await getToken();
        if (!token) throw new Error("User is not authenticated");
        return token;
    }, [getToken]);

    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = await resolveToken();
                if (noteId) {
                    const data = await getNoteById(token, noteId);
                    setNote(data);
                } else {
                    const data = await getAllNotesByUserId(token);
                    setNotes(data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [noteId, isLoaded, isSignedIn, resolveToken]);

    const createNote = useCallback(async (data: NoteInput): Promise<Note | null> => {
        setLoading(true);
        setError(null);
        try {
            const token = await resolveToken();
            const created = await createNoteService(token, data);
            setNotes((prev) => [created, ...prev]);
            return created;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create note");
            return null;
        } finally {
            setLoading(false);
        }
    }, [resolveToken]);

    const updateNote = useCallback(async (
        id: string,
        data: Partial<NoteInput>
    ): Promise<Note | null> => {
        setLoading(true);
        setError(null);
        try {
            const token = await resolveToken();
            const updated = await updateNoteService(token, id, data);
            setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
            if (note?.id === id) setNote(updated);
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update note");
            return null;
        } finally {
            setLoading(false);
        }
    }, [resolveToken, note]);

    const removeNote = useCallback(async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const token = await resolveToken();
            await deleteNoteService(token, id);
            setNotes((prev) => prev.filter((n) => n.id !== id));
            if (note?.id === id) setNote(null);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete note");
            return false;
        } finally {
            setLoading(false);
        }
    }, [resolveToken, note]);

    return {
        notes,
        note,
        loading,
        error,
        createNote,
        updateNote,
        removeNote,
    };
};

export default useNotes;
