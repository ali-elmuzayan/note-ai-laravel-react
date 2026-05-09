import { useMemo, useState } from "react";
import { Search, StickyNote, X } from "lucide-react";
import { demoNotes } from "@/data/demoNotes";
import GlassCard from "@/components/common/GlassCard";
import NotesList from "@/components/NotesList";

const Notes = () => {
  const [query, setQuery] = useState("");

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return demoNotes;
    return demoNotes.filter((n) => {
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  return (
    <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <header className="flex flex-col gap-2 mb-6">
        <div className="flex-between flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <StickyNote className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Your Notes
              </h1>
              <p className="text-sm text-muted-foreground">
                {demoNotes.length} {demoNotes.length === 1 ? "note" : "notes"}{" "}
                total
                {query && (
                  <>
                    {" "}
                    &middot; {filteredNotes.length} matching{" "}
                    <span className="font-medium">"{query}"</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes by title, content, or tag..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>
      <NotesList notes={filteredNotes} />
    </GlassCard>
  );
};

export default Notes;
