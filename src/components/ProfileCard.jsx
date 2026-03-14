import { ExternalLink, MapPin, Users } from 'lucide-react'
import { motion } from 'framer-motion'

function ProfileCard({ user, loading }) {
  if (loading) {
    return (
      <div className="glass animate-pulse rounded-3xl border border-slate-200/90 p-6 dark:border-cyan-900/50">
        <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-cyan-900" />
        <div className="mt-4 h-5 w-40 rounded bg-slate-200 dark:bg-cyan-900" />
        <div className="mt-2 h-4 w-24 rounded bg-slate-200 dark:bg-cyan-900" />
        <div className="mt-5 h-4 w-full rounded bg-slate-200 dark:bg-cyan-900" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="glass rounded-3xl border border-slate-200/90 p-6 shadow-glass transition hover:-translate-y-1 hover:shadow-xl dark:border-cyan-900/50"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="h-20 w-20 rounded-2xl border border-slate-300 object-cover dark:border-cyan-800"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-cyan-50">{user.name || user.login}</h2>
          <p className="font-mono text-sm text-slate-600 dark:text-cyan-100/80">@{user.login}</p>
          {user.bio && <p className="max-w-xl text-sm text-slate-700 dark:text-cyan-100/85">{user.bio}</p>}
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-800 dark:text-cyan-50 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-sky-50/60 px-4 py-3 dark:border-cyan-900 dark:from-slate-900 dark:to-slate-800/80">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-cyan-200/70">Followers</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-cyan-50">{user.followers}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/60 px-4 py-3 dark:border-cyan-900 dark:from-slate-900 dark:to-slate-800/80">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-cyan-200/70">Following</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-cyan-50">{user.following}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-cyan-50/60 px-4 py-3 dark:border-cyan-900 dark:from-slate-900 dark:to-slate-800/80">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-cyan-200/70">Public repos</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-cyan-50">{user.public_repos}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-cyan-100">
        <span className="inline-flex items-center gap-2">
          <Users className="h-4 w-4" />
          Community profile
        </span>
        {user.location && (
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {user.location}
          </span>
        )}
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-700 to-cyan-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-105 dark:bg-cyan-400 dark:text-cyan-950 dark:hover:bg-cyan-300"
        >
          Open profile <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  )
}

export default ProfileCard
