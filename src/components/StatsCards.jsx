import { GitFork, LayoutGrid, Star, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

const statConfig = [
  {
    key: 'totalRepos',
    label: 'Total repos',
    icon: LayoutGrid,
    tint: 'from-sky-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800/80',
  },
  {
    key: 'totalStars',
    label: 'Total stars',
    icon: Star,
    tint: 'from-amber-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800/80',
  },
  {
    key: 'totalForks',
    label: 'Total forks',
    icon: GitFork,
    tint: 'from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800/80',
  },
  {
    key: 'topLanguage',
    label: 'Top language',
    icon: Trophy,
    tint: 'from-indigo-50 to-sky-50 dark:from-slate-900 dark:to-slate-800/80',
  },
]

function StatsCards({ stats, loading }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map((item, index) => {
        const Icon = item.icon

        return (
          <motion.article
            key={item.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            className={`glass rounded-2xl border border-slate-200/90 bg-gradient-to-br ${item.tint} p-5 transition hover:-translate-y-1 hover:shadow-xl dark:border-cyan-900/50`}
          >
            <div className="flex items-center justify-between text-slate-600 dark:text-cyan-200">
              <p className="text-xs uppercase tracking-wide">{item.label}</p>
              <Icon className="h-4 w-4" />
            </div>
            {loading ? (
              <div className="mt-4 h-7 w-24 animate-pulse rounded bg-slate-200 dark:bg-cyan-900" />
            ) : (
              <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-cyan-50">{stats[item.key]}</p>
            )}
          </motion.article>
        )
      })}
    </section>
  )
}

export default StatsCards
