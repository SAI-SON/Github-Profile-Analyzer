import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const CHART_COLORS = ['#06b6d4', '#14b8a6', '#0ea5e9', '#22c55e', '#84cc16', '#f59e0b']

function LanguageChart({ data, loading }) {
  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-cyan-50">Language Analytics</h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-cyan-100/80">
        Distribution of repository languages.
      </p>

      <div className="mt-4 h-72">
        {loading ? (
          <div className="h-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100/70 dark:border-cyan-900 dark:bg-cyan-900/20" />
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-700 dark:border-cyan-700 dark:text-cyan-200">
            No language data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="repos"
                nameKey="name"
                innerRadius={66}
                outerRadius={104}
                paddingAngle={3}
                animationDuration={750}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, _, payload) => [`${value} repos`, payload.payload.name]}
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}

export default LanguageChart
