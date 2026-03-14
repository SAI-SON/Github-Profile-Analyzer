import { useCallback, useEffect, useRef, useState } from 'react'
import { getUserEvents, getUserProfile, getUserRepos } from '../services/githubApi'

const RECENT_SEARCHES_KEY = 'gpa-recent-searches'
const FAVORITE_PROFILES_KEY = 'gpa-favorite-profiles'

function getSavedRecentSearches() {
  const saved = localStorage.getItem(RECENT_SEARCHES_KEY)
  if (!saved) {
    return []
  }

  try {
    return JSON.parse(saved).filter((item) => String(item).toLowerCase() !== 'octocat')
  } catch {
    return []
  }
}

function getSavedFavoriteProfiles() {
  const saved = localStorage.getItem(FAVORITE_PROFILES_KEY)
  if (!saved) {
    return []
  }

  try {
    return JSON.parse(saved).filter((item) => String(item).toLowerCase() !== 'octocat')
  } catch {
    return []
  }
}

function getReadableError(error) {
  if (error.response?.status === 404) {
    return 'User not found. Please check the username and try again.'
  }

  if (error.response?.status === 403) {
    return 'GitHub API rate limit reached. Try again in a few minutes.'
  }

  return 'Unable to fetch GitHub data right now. Please try again shortly.'
}

export function useGithubUser(initialUsername = 'SAI-SON') {
  const hasInitializedRef = useRef(false)
  const [username, setUsername] = useState(initialUsername)
  const [activeUsername, setActiveUsername] = useState(initialUsername)
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState(getSavedRecentSearches)
  const [favoriteProfiles, setFavoriteProfiles] = useState(getSavedFavoriteProfiles)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchGithubData = useCallback(async (nextUsername, options = {}) => {
    const normalized = nextUsername.trim().toLowerCase()

    if (!normalized) {
      setError('Please enter a GitHub username.')
      return
    }

    if (options.isDebounced && normalized === activeUsername) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const [profileData, repoData, eventData] = await Promise.all([
        getUserProfile(normalized),
        getUserRepos(normalized),
        getUserEvents(normalized),
      ])

      setUser(profileData)
      setRepos(repoData)
      setEvents(eventData)
      setActiveUsername(normalized)
      setLastUpdated(new Date())

      if (!options.isDebounced) {
        setRecentSearches((prev) => {
          const nextRecent = [normalized, ...prev.filter((item) => item !== normalized)].slice(0, 6)
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecent))
          return nextRecent
        })
      }
    } catch (requestError) {
      setUser(null)
      setRepos([])
      setEvents([])
      setError(getReadableError(requestError))
    } finally {
      setLoading(false)
    }
  }, [activeUsername])

  const toggleFavoriteProfile = useCallback((nextUsername) => {
    const normalized = nextUsername.trim().toLowerCase()
    if (!normalized) {
      return
    }

    setFavoriteProfiles((prev) => {
      const alreadySaved = prev.includes(normalized)
      const nextFavorites = alreadySaved
        ? prev.filter((item) => item !== normalized)
        : [normalized, ...prev].slice(0, 8)

      localStorage.setItem(FAVORITE_PROFILES_KEY, JSON.stringify(nextFavorites))
      return nextFavorites
    })
  }, [])

  useEffect(() => {
    if (hasInitializedRef.current) {
      return
    }

    hasInitializedRef.current = true
    fetchGithubData(initialUsername)
  }, [fetchGithubData, initialUsername])

  return {
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
    isFavorite: favoriteProfiles.includes(activeUsername),
    toggleFavoriteProfile,
    searchUser: fetchGithubData,
  }
}
