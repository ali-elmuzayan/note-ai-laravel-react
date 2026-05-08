import type { Note } from "@/lib/demoNotes";
import { GlassCard } from "./common/GlassCard";
import { formatDate } from "@/lib/helper";

const NoteCard = ({ note }: { note: Note }) => (
  <GlassCard className="p-5 flex flex-col gap-3 hover:shadow-2xl transition-shadow cursor-pointer">
    <div className="flex-between">
      <h3 className="font-semibold text-lg line-clamp-1">{note.title}</h3>
      <span className="text-xs text-muted-foreground shrink-0">
        {formatDate(note.updatedAt)}
      </span>
    </div>
    <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-4">
      {note.content}
    </p>
    {note.tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
    )}
  </GlassCard>
);

export default NoteCard;
