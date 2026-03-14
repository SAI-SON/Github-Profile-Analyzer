import { useState } from 'react'
import { ArrowLeftRight, LoaderCircle } from 'lucide-react'
import { getUserProfile, getUserRepos } from '../services/githubApi'

function CompareProfiles({ primaryUser, primaryStats }) {
  const [secondUsername, setSecondUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [comparison, setComparison] = useState(null)

  const handleCompare = async (event) => {
    event.preventDefault()
    const normalized = secondUsername.trim().toLowerCase()

    if (!normalized) {
      setError('Enter a second username to compare.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const [profile, repos] = await Promise.all([
        getUserProfile(normalized),
        getUserRepos(normalized),
      ])

      const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
      const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)

      setComparison({
        profile,
        stats: {
          totalRepos: repos.length,
          totalStars: stars,
          totalForks: forks,
          followers: profile.followers,
        },
      })
    } catch {
      setError('Could not load comparison profile.')
      setComparison(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="glass rounded-3xl border border-slate-200/90 p-5 dark:border-cyan-900/50 sm:p-6">
      <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-cyan-50">
        <ArrowLeftRight className="h-5 w-5" />
        Compare Two GitHub Profiles
      </h2>

      <form onSubmit={handleCompare} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={secondUsername}
          onChange={(event) => setSecondUsername(event.target.value)}
          placeholder="Enter second username"
          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-300 focus:ring-2 dark:border-cyan-900 dark:bg-slate-900/70 dark:text-cyan-50"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          Compare
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{error}</p>}

      {primaryUser && comparison && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-cyan-900">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900/80 dark:text-cyan-100">
              <tr>
                <th className="px-3 py-2">Feature</th>
                <th className="px-3 py-2">{primaryUser.login}</th>
                <th className="px-3 py-2">{comparison.profile.login}</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-cyan-100/90">
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-3 py-2">Repos</td>
                <td className="px-3 py-2">{primaryStats.totalRepos}</td>
                <td className="px-3 py-2">{comparison.stats.totalRepos}</td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-3 py-2">Stars</td>
                <td className="px-3 py-2">{primaryStats.totalStars}</td>
                <td className="px-3 py-2">{comparison.stats.totalStars}</td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-3 py-2">Forks</td>
                <td className="px-3 py-2">{primaryStats.totalForks}</td>
                <td className="px-3 py-2">{comparison.stats.totalForks}</td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-3 py-2">Followers</td>
                <td className="px-3 py-2">{primaryUser.followers}</td>
                <td className="px-3 py-2">{comparison.stats.followers}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CompareProfiles
