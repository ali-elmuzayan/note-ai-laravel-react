import { Search } from "lucide-react"
import { X } from "lucide-react"

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  className?: string;
}

const SearchBar = ({ query, setQuery, className = "" }: SearchBarProps) => {
  return (
    <div className={`relative mt-4 ${className}`}>
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
  )
}

export default SearchBar