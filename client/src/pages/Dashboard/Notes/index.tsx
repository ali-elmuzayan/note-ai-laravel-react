import { useMemo, useState } from "react";
import { demoNotes } from "@/data/demoNotes";
import GlassCard from "@/components/common/GlassCard";
import NotesList from "@/components/NotesList";
import SearchBar from "@/components/notes/SearchBar";
import NoteHeader from "@/components/notes/NoteHeader";
import useNotes from "@/hooks/useNotes";

const Notes = () => {
  const { notes, } = useNotes();
  const [query, setQuery] = useState("");



  console.log("notes", notes);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => {
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  return (
    <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <NoteHeader notesLength={filteredNotes.length} query={query} />
      <SearchBar query={query} setQuery={setQuery} />
      <NotesList notes={filteredNotes} />
    </GlassCard>
  );
};

export default Notes;
