import { GlassCard } from "./common/GlassCard";
import NoteCard from "./NoteCard";
import { type Note } from "../types";

const NotesList = ({ notes }: { notes: Note[] }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <p className="text-base font-medium">No notes found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different search term.
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
