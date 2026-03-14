import { useMemo } from 'react'
import { Activity, GitCommitHorizontal } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function getDateLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function buildActivityData(events) {
  const today = new Date()
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (13 - index))

    return {
      day: getDateLabel(date),
      key: date.toISOString().slice(0, 10),
      commits: 0,
      events: 0,
    }
  })

  const lookup = new Map(days.map((item) => [item.key, item]))

  events.forEach((event) => {
    const key = event.created_at?.slice(0, 10)
    const current = lookup.get(key)

    if (!current) {
      return
    }

    current.events += 1

    if (event.type === 'PushEvent') {
      current.commits += event.payload?.commits?.length || 0
    }
  })

  return days
}

function ContributionActivity({ events, loading }) {
  const activityData = useMemo(() => buildActivityData(events), [events])

  const totals = useMemo(() => {
    return activityData.reduce(
      (sum, item) => {
        sum.events += item.events
        sum.commits += item.commits
        return sum
      },
      { events: 0, commits: 0 },
    )
  }, [activityData])

  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-cyan-50">Contribution Activity</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-cyan-100/80">Last 14 days from public events.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-sky-300 bg-sky-100 px-3 py-1 text-sky-900 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-100">
            <Activity className="h-3.5 w-3.5" />
            {totals.events} events
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100">
            <GitCommitHorizontal className="h-3.5 w-3.5" />
            {totals.commits} commits
          </span>
        </div>
      </div>

      <div className="mt-4 h-72">
        {loading ? (
          <div className="h-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100/70 dark:border-cyan-900 dark:bg-cyan-900/20" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
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
                  boxShadow: '0 10px 24px rgba(2, 6, 23, 0.35)',
                }}
                labelStyle={{ color: '#bae6fd', fontWeight: 700 }}
                itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
              />
              <Bar dataKey="commits" name="Commits" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="events" name="Events" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

export default ContributionActivity
