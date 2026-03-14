function getCellTone(count) {
  if (count >= 7) {
    return 'bg-emerald-500/90'
  }
  if (count >= 4) {
    return 'bg-emerald-400/80'
  }
  if (count >= 2) {
    return 'bg-emerald-300/70'
  }
  if (count >= 1) {
    return 'bg-emerald-200/70'
  }
  return 'bg-slate-200 dark:bg-slate-800'
}

function ActivityHeatmap({ data, loading }) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-cyan-50">Commit Activity Heatmap</h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-cyan-100/80">Last 12 weeks of public contribution intensity.</p>

      {loading ? (
        <div className="mt-4 h-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      ) : (
        <>
          <div className="mt-4 grid grid-cols-12 gap-1.5 sm:grid-cols-14 md:grid-cols-[repeat(21,minmax(0,1fr))]">
            {data.map((item) => (
              <div
                key={item.key}
                title={`${item.key}: ${item.count} activities`}
                className={`aspect-square rounded ${getCellTone(item.count)}`}
              />
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-slate-600 dark:text-cyan-200/80">Total activity points: {total}</p>
        </>
      )}
    </section>
  )
}

export default ActivityHeatmap
