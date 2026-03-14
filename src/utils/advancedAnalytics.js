export function buildSkillScore({ repos, stars, followers, languages }) {
  return repos * 2 + stars * 3 + followers * 2 + languages * 6
}

export function generateAiProfileSummary({ user, repos, languageStats, events }) {
  if (!user) {
    return ''
  }

  const topLanguage = languageStats[0]?.name || 'multiple technologies'
  const secondLanguage = languageStats[1]?.name
  const hasSecondLanguage = Boolean(secondLanguage)

  const activeRepos = repos.filter((repo) => {
    const updated = new Date(repo.updated_at).getTime()
    const thirtyDays = 1000 * 60 * 60 * 24 * 30
    return Date.now() - updated < thirtyDays
  }).length

  const activityLevel =
    events.length >= 40 ? 'highly active' : events.length >= 18 ? 'consistently active' : 'occasionally active'

  const webProjects = repos.filter((repo) => {
    const name = `${repo.name} ${repo.description || ''}`.toLowerCase()
    return /web|frontend|backend|api|react|next|ui/.test(name)
  }).length

  const mlProjects = repos.filter((repo) => {
    const name = `${repo.name} ${repo.description || ''}`.toLowerCase()
    return /ml|machine learning|ai|model|neural/.test(name)
  }).length

  let focus = 'general software development'
  if (webProjects > mlProjects && webProjects > 0) {
    focus = 'web development and product engineering'
  } else if (mlProjects > 0) {
    focus = 'machine learning and intelligent applications'
  }

  return `This developer mainly works with ${topLanguage}${hasSecondLanguage ? ` and ${secondLanguage}` : ''}, is ${activityLevel}, and focuses on ${focus}. ${activeRepos} repositories were updated recently, showing ongoing maintenance and delivery habits.`
}

export function buildRepoGrowthSeries(repos) {
  const grouped = new Map()

  repos.forEach((repo) => {
    const key = repo.created_at.slice(0, 7)
    const current = grouped.get(key) || { month: key, repos: 0, stars: 0, forks: 0 }
    current.repos += 1
    current.stars += repo.stargazers_count || 0
    current.forks += repo.forks_count || 0
    grouped.set(key, current)
  })

  const sorted = Array.from(grouped.values()).sort((a, b) => a.month.localeCompare(b.month))

  let cumulativeRepos = 0
  let cumulativeStars = 0
  let cumulativeForks = 0

  return sorted.map((item) => {
    cumulativeRepos += item.repos
    cumulativeStars += item.stars
    cumulativeForks += item.forks

    return {
      label: item.month,
      repos: cumulativeRepos,
      stars: cumulativeStars,
      forks: cumulativeForks,
    }
  })
}

export function buildTopicStats(repos) {
  const topicMap = new Map()

  repos.forEach((repo) => {
    const topics = Array.isArray(repo.topics) ? repo.topics : []
    topics.forEach((topic) => {
      const normalized = String(topic).trim().toLowerCase()
      if (!normalized) {
        return
      }
      topicMap.set(normalized, (topicMap.get(normalized) || 0) + 1)
    })
  })

  return Array.from(topicMap.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)
}

export function buildHeatmapData(events, days = 84) {
  const today = new Date()
  const eventMap = new Map()

  events.forEach((event) => {
    const date = event.created_at?.slice(0, 10)
    if (!date) {
      return
    }

    const existing = eventMap.get(date) || 0
    const addCount = event.type === 'PushEvent' ? (event.payload?.commits?.length || 1) : 1
    eventMap.set(date, existing + addCount)
  })

  const daily = Array.from({ length: days }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - 1 - index))
    const key = date.toISOString().slice(0, 10)
    const count = eventMap.get(key) || 0

    return {
      key,
      date,
      count,
      day: date.getDay(),
      week: Math.floor(index / 7),
    }
  })

  return daily
}

export function toCsvRows(dataRows) {
  if (!dataRows.length) {
    return ''
  }

  const headers = Object.keys(dataRows[0])
  const escaped = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`

  const lines = [headers.join(',')]
  dataRows.forEach((row) => {
    lines.push(headers.map((header) => escaped(row[header])).join(','))
  })

  return lines.join('\n')
}
