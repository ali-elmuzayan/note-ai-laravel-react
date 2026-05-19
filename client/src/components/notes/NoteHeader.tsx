import { demoNotes } from '@/data/demoNotes'
import { StickyNote } from 'lucide-react'

interface NoteHeaderProps {
  notesLength: number;
  query: string;
}

const NoteHeader = ({ notesLength, query }: NoteHeaderProps) => {
  return (
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
                &middot; {notesLength} matching{" "}
                <span className="font-medium">"{query}"</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>


  </header>
  )
}

export default NoteHeader