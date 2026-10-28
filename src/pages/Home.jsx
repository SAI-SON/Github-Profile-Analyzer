import { useCallback, useMemo } from 'react'
import { BookmarkCheck, BookmarkPlus, Download, FileSpreadsheet, Github, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'
import ProfileCard from '../components/ProfileCard'
import RepoList from '../components/RepoList'
import LanguageChart from '../components/LanguageChart'
import StatsCards from '../components/StatsCards'
import ContributionActivity from '../components/ContributionActivity'
import AiSummaryCard from '../components/AiSummaryCard'
import GrowthAnalytics from '../components/GrowthAnalytics'
import TopicAnalyzer from '../components/TopicAnalyzer'
import ActivityHeatmap from '../components/ActivityHeatmap'
import CompareProfiles from '../components/CompareProfiles'
import { useGithubUser } from '../hooks/useGithubUser'
import { buildLanguageStats, buildRepoStats } from '../utils/languageStats'
import {
  buildHeatmapData,
  buildRepoGrowthSeries,
  buildSkillScore,
  buildTopicStats,
  generateAiProfileSummary,
  toCsvRows,
} from '../utils/advancedAnalytics'

function Home() {
  const {
    username,
    setUsername,
    user,
    repos,
    events,
    loading,
    error,
    recentSearches,
    favoriteProfiles,
    lastUpdated,
    activeUsername,
    isFavorite,
    toggleFavoriteProfile,
    searchUser,
  } = useGithubUser('SAI-SON')

  const languageData = useMemo(() => buildLanguageStats(repos), [repos])
  const baseStats = useMemo(() => buildRepoStats(repos, languageData), [repos, languageData])
  const developerScore = useMemo(
    () =>
      buildSkillScore({
        repos: baseStats.totalRepos,
        stars: baseStats.totalStars,
        followers: user?.followers || 0,
        languages: languageData.length,
      }),
    [baseStats.totalRepos, baseStats.totalStars, languageData.length, user?.followers],
  )

  const stats = useMemo(
    () => ({
      ...baseStats,
      developerScore,
    }),
    [baseStats, developerScore],
  )

  const aiSummary = useMemo(
    () => generateAiProfileSummary({ user, repos, languageStats: languageData, events }),
    [events, languageData, repos, user],
  )
  const growthData = useMemo(() => buildRepoGrowthSeries(repos), [repos])
  const topicStats = useMemo(() => buildTopicStats(repos), [repos])
  const heatmapData = useMemo(() => buildHeatmapData(events), [events])

  const handleSearch = useCallback(
    (value) => {
      searchUser(value)
    },
    [searchUser],
  )

  const handleDebouncedSearch = useCallback(
    (value) => {
      searchUser(value, { isDebounced: true })
    },
    [searchUser],
  )

  const handleRecentSelection = useCallback(
    (value) => {
      setUsername(value)
      searchUser(value)
    },
    [searchUser, setUsername],
  )

  const handleFavoriteSelection = useCallback(
    (value) => {
      setUsername(value)
      searchUser(value)
    },
    [searchUser, setUsername],
  )

  const handleToggleFavorite = useCallback(() => {
    toggleFavoriteProfile(activeUsername)
  }, [activeUsername, toggleFavoriteProfile])

  const exportPayload = useMemo(() => {
    if (!user) {
      return null
    }

    const topRepositories = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
      }))

    return {
      generatedAt: new Date().toISOString(),
      user: {
        login: user.login,
        name: user.name,
        profileUrl: user.html_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
      },
      summary: stats,
      languages: languageData,
      topRepositories,
      recentEventCount: events.length,
      dashboardLastUpdated: lastUpdated?.toISOString() || null,
    }
  }, [events.length, languageData, lastUpdated, repos, stats, user])

  const handleExportInsights = useCallback(() => {
    if (!exportPayload || !user?.login) {
      return
    }

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${user.login}-github-insights.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [exportPayload, user])

  const handleExportCsv = useCallback(() => {
    if (!user?.login || repos.length === 0) {
      return
    }

    const csvRows = repos.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
    }))

    const csvText = toCsvRows(csvRows)
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${user.login}-repositories.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [repos, user])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-gradient-to-r from-sky-50 to-cyan-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-900 shadow-sm dark:border-cyan-500/70 dark:bg-gradient-to-r dark:from-cyan-500/25 dark:to-emerald-500/20 dark:text-cyan-50">
            <Sparkles className="h-3.5 w-3.5" />
            Developer Insights
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-cyan-50 sm:text-4xl">
            GitHub Profile Analyzer
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-700 dark:text-cyan-100/85 sm:text-base">
            Explore profile intelligence, repository trends, language distribution, and activity data in one dashboard.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-none sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:border-cyan-600/60 dark:bg-cyan-500/10 dark:text-cyan-50 dark:hover:border-cyan-400 sm:w-auto sm:text-sm"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <button
            type="button"
            onClick={handleToggleFavorite}
            className="glass inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:border-cyan-600/60 dark:bg-cyan-500/10 dark:text-cyan-50 dark:hover:border-cyan-400 sm:w-auto sm:text-sm"
          >
            {isFavorite ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
            {isFavorite ? 'Saved' : 'Save profile'}
          </button>
          <button
            type="button"
            onClick={handleExportInsights}
            disabled={!exportPayload}
            className="glass inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-600/60 dark:bg-cyan-500/10 dark:text-cyan-50 dark:hover:border-cyan-400 sm:w-auto sm:text-sm"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={!user || repos.length === 0}
            className="glass inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-600/60 dark:bg-cyan-500/10 dark:text-cyan-50 dark:hover:border-cyan-400 sm:w-auto sm:text-sm"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </motion.header>

      <div className="space-y-6">
        <SearchBar
          value={username}
          onChange={setUsername}
          onSearch={handleSearch}
          onDebouncedSearch={handleDebouncedSearch}
          recentSearches={recentSearches}
          favoriteProfiles={favoriteProfiles}
          onSelectRecent={handleRecentSelection}
          onSelectFavorite={handleFavoriteSelection}
          isLoading={loading}
        />

        {error && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-800 dark:bg-rose-900/25 dark:text-rose-100">
            {error}
          </div>
        )}

        <ProfileCard user={user} loading={loading} />

        <AiSummaryCard summary={aiSummary} score={developerScore} loading={loading} />

        <StatsCards stats={stats} loading={loading} />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <LanguageChart data={languageData} loading={loading} />
          <ContributionActivity events={events} loading={loading} />
        </div>

        <GrowthAnalytics data={growthData} loading={loading} />

        <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
          <TopicAnalyzer topics={topicStats} loading={loading} />
          <ActivityHeatmap data={heatmapData} loading={loading} />
        </div>

        <CompareProfiles primaryUser={user} primaryStats={stats} />

        <RepoList repos={repos} loading={loading} />

        {lastUpdated && (
          <p className="text-right text-xs font-medium tracking-wide text-slate-500 dark:text-cyan-100/75">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
      </div>
    </main>
  )
}

export default Home
