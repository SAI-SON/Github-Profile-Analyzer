import { Bot, Sparkles } from 'lucide-react'

function AiSummaryCard({ summary, score, loading }) {
  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-cyan-50">
            <Bot className="h-5 w-5" />
            AI Profile Summary
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-cyan-100/80">Generated from repositories, languages, and activity patterns.</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100">
          <Sparkles className="h-3.5 w-3.5" />
          Score {score}
        </span>
      </div>

      {loading ? (
        <div className="mt-4 h-16 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      ) : (
        <p className="mt-4 rounded-2xl border border-slate-200 bg-white/85 p-4 text-sm leading-relaxed text-slate-700 dark:border-cyan-900 dark:bg-slate-900/70 dark:text-cyan-100/90">
          {summary || 'No summary available yet.'}
        </p>
      )}
    </section>
  )
}

export default AiSummaryCard
