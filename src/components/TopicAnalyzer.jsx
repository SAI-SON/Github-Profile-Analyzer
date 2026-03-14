import { Hash } from 'lucide-react'

function TopicAnalyzer({ topics, loading }) {
  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-cyan-50">Repository Topic Analyzer</h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-cyan-100/80">Top tags and focus areas across repositories.</p>

      {loading ? (
        <div className="mt-4 h-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      ) : topics.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-cyan-700 dark:text-cyan-200">
          No topics found in repository metadata.
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((item) => (
            <div
              key={item.topic}
              className="inline-flex items-center gap-1 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-100"
            >
              <Hash className="h-3 w-3" />
              {item.topic} - {item.count}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TopicAnalyzer
