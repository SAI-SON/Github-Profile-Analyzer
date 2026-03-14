export function buildLanguageStats(repos) {
  if (!Array.isArray(repos) || repos.length === 0) {
    return []
  }

  const languageMap = repos.reduce((acc, repo) => {
    if (!repo.language) {
      return acc
    }

    const current = acc.get(repo.language) || { name: repo.language, repos: 0, stars: 0 }
    current.repos += 1
    current.stars += repo.stargazers_count || 0
    acc.set(repo.language, current)

    return acc
  }, new Map())

  const totalReposWithLanguage = Array.from(languageMap.values()).reduce(
    (sum, item) => sum + item.repos,
    0,
  )

  return Array.from(languageMap.values())
    .map((item) => ({
      ...item,
      share: Number(((item.repos / totalReposWithLanguage) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.repos - a.repos)
}

export function buildRepoStats(repos, languageStats) {
  const totalRepos = repos.length
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)
  const topLanguage = languageStats[0]?.name || 'N/A'

  return {
    totalRepos,
    totalStars,
    totalForks,
    topLanguage,
  }
}
