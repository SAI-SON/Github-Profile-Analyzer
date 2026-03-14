import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import RepoCard from './RepoCard'

const PAGE_SIZE = 6

function RepoList({ repos, loading }) {
  const [sortBy, setSortBy] = useState('stars')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filteredRepos = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    const nextRepos = repos.filter((repo) => {
      if (!normalized) {
        return true
      }

      return (
        repo.name.toLowerCase().includes(normalized) ||
        (repo.description || '').toLowerCase().includes(normalized)
      )
    })

    return nextRepos.sort((a, b) => {
      if (sortBy === 'updated') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }

      return b.stargazers_count - a.stargazers_count
    })
  }, [repos, query, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredRepos.slice(start, start + PAGE_SIZE)
  }, [currentPage, filteredRepos])

  const handleSortChange = (value) => {
    setSortBy(value)
    setPage(1)
  }

  const handleQueryChange = (value) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-xl font-bold text-transparent dark:from-cyan-50 dark:to-cyan-300">Repositories</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Filter repositories..."
            className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-300 transition focus:border-cyan-400 focus:ring-2 dark:border-cyan-900 dark:bg-slate-900/70 dark:text-cyan-50"
          />
          <select
            value={sortBy}
            onChange={(event) => handleSortChange(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-300 transition focus:border-cyan-400 focus:ring-2 dark:border-cyan-900 dark:bg-slate-900/70 dark:text-cyan-50"
          >
            <option value="stars">Most stars</option>
            <option value="updated">Recently updated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <div
              key={`repo-skeleton-${index}`}
              className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-100/80 dark:border-cyan-900 dark:bg-cyan-950/20"
            />
          ))}
        </div>
      ) : paginatedRepos.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/70 p-6 text-sm text-slate-700 dark:border-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-100">
          No repositories matched your filter.
        </p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginatedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-600 dark:text-cyan-100">
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-cyan-700 dark:bg-transparent dark:text-cyan-100"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-cyan-700 dark:bg-transparent dark:text-cyan-100"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default RepoList
