import { GitFork, Languages, Star } from 'lucide-react'
import { motion } from 'framer-motion'

function RepoCard({ repo, isTrending }) {
  return (
    <motion.article
      whileHover={{ y: -5, scale: 1.01 }}
      className="glass rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/80 p-5 dark:border-cyan-900/50 dark:from-slate-900 dark:to-slate-800/80"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-cyan-50">{repo.name}</h3>
          {isTrending && (
            <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100">
              STAR Trending Project
            </span>
          )}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold uppercase tracking-wide text-sky-700 hover:text-sky-600 dark:text-cyan-300"
        >
          View
        </a>
      </div>

      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-relaxed text-slate-700 dark:text-cyan-100/80">
        {repo.description || 'No description provided for this repository.'}
      </p>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-800 dark:text-cyan-100">
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/80 bg-amber-100/70 px-2.5 py-1 dark:border-amber-600 dark:bg-amber-700/20">
          <Star className="h-3.5 w-3.5" />
          {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-sky-300 bg-sky-100/80 px-2.5 py-1 dark:border-cyan-700 dark:bg-cyan-900/30">
          <GitFork className="h-3.5 w-3.5" />
          {repo.forks_count}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/80 bg-emerald-100/70 px-2.5 py-1 dark:border-emerald-700 dark:bg-emerald-900/30">
          <Languages className="h-3.5 w-3.5" />
          {repo.language || 'Unknown'}
        </span>
      </div>
    </motion.article>
  )
}

export default RepoCard
