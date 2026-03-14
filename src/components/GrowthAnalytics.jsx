import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function GrowthAnalytics({ data, loading }) {
  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-cyan-50">Repository Growth Analytics</h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-cyan-100/80">Cumulative growth of repositories, stars, and forks over time.</p>

      <div className="mt-4 h-80">
        {loading ? (
          <div className="h-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-600 dark:border-cyan-700 dark:text-cyan-200">
            Not enough data to render growth analytics.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                allowEscapeViewBox={{ x: true, y: true }}
                wrapperStyle={{ zIndex: 20, outline: 'none' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #0e7490',
                  background: 'rgba(8, 47, 73, 0.96)',
                  color: '#e0f2fe',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="repos" name="Repos" stroke="#22d3ee" strokeWidth={2.2} dot={false} />
              <Line type="monotone" dataKey="stars" name="Stars" stroke="#f59e0b" strokeWidth={2.2} dot={false} />
              <Line type="monotone" dataKey="forks" name="Forks" stroke="#10b981" strokeWidth={2.2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

export default GrowthAnalytics
