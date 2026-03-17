import { useEffect } from 'react'
import { Bookmark, LoaderCircle, Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

function SearchBar({
  value,
  onChange,
  onSearch,
  onDebouncedSearch,
  recentSearches,
  favoriteProfiles,
  onSelectRecent,
  onSelectFavorite,
  isLoading,
}) {
  useEffect(() => {
    if (!value.trim() || value.trim().length < 3) {
      return undefined
    }

    const timer = setTimeout(() => {
      onDebouncedSearch(value)
    }, 650)

    return () => clearTimeout(timer)
  }, [value, onDebouncedSearch])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(value)
  }

  return (
    <div className="glass soft-grid rounded-3xl border border-slate-200/90 p-4 shadow-glass dark:border-cyan-900/50 sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="github-username">
          GitHub username
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-cyan-300" />
          <input
            id="github-username"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Enter GitHub username..."
            className="w-full rounded-2xl border border-slate-300/90 bg-white/95 py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none ring-cyan-300 transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 dark:border-cyan-900 dark:bg-slate-900/70 dark:text-cyan-50 dark:placeholder:text-cyan-200/70"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 sm:w-auto"
        >
          {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Analyze
        </motion.button>
      </form>

      {recentSearches.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Recent
          </span>
          {recentSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelectRecent(item)}
              className="rounded-full border border-slate-300 bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:from-sky-50 hover:to-cyan-50 hover:text-sky-800 dark:border-cyan-800 dark:from-cyan-950/40 dark:to-cyan-900/20 dark:text-cyan-100"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {favoriteProfiles.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-cyan-200">
            <Bookmark className="h-3.5 w-3.5" />
            Favorites
          </span>
          {favoriteProfiles.map((item) => (
            <button
              key={`favorite-${item}`}
              type="button"
              onClick={() => onSelectFavorite(item)}
              className="rounded-full border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 text-xs font-semibold text-emerald-800 transition hover:border-emerald-400 hover:brightness-95 dark:border-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/20 dark:text-emerald-100"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
