import axios from 'axios'

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

export async function getUserProfile(username) {
  const { data } = await githubClient.get(`/users/${username}`)
  return data
}

export async function getUserRepos(username) {
  const { data } = await githubClient.get(`/users/${username}/repos`, {
    params: {
      per_page: 100,
      sort: 'updated',
    },
  })

  return data
}

export async function getUserEvents(username) {
  const { data } = await githubClient.get(`/users/${username}/events/public`, {
    params: {
      per_page: 100,
    },
  })

  return data
}
