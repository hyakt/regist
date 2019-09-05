import { AuthSession, Linking } from 'expo'
import qs from 'qs'

import API from 'app/src/constants/Github'

class Github {
  getToken = async () => {
    try {
      const redirectUrl = AuthSession.getRedirectUrl()
      console.log(`redirectUrl: ${redirectUrl}`)

      const authUrl = `${API.GITHUB_OAUTH_URL}/authorize?client_id=${API.CLIENT_ID}&scope=${API.SCOPE}&redirect_uri=${encodeURIComponent(redirectUrl)}`
      console.log(`authUrl: ${authUrl}`)

      const returnUrl = Linking.makeUrl()
      console.log(`returnUrl: ${returnUrl}`)

      const result = await AuthSession.startAsync({
        authUrl: authUrl,
        returnUrl: returnUrl
      })

      return fetch(`${API.GITHUB_OAUTH_URL}/access_token/?code=${result.params.code}&client_id=${API.CLIENT_ID}&client_secret=${API.CLIENT_SECRET}`)
        .then(res => res.text())
        .then(resText => qs.parse(resText).access_token)

    } catch (err) {
      return false
    }
  }

  getUser = async (token, signal) => {
    return fetch(`${API.GITHUB_API_URL}/user`, {
      headers: { Authorization: ' token ' + token },
      signal: signal
    }).then((data) => data.json())
      .catch((err) => console.log(err))
  }

  getUserGists = async (user, token, signal) => {
    return fetch(`${API.GITHUB_API_URL}/users/${user}/gists`, {
      headers: {
        Authorization: ' token ' + token,
        'cache-control': 'no-cache',
        signal: signal
      }
    }).then((data) => data.json())
      .catch((err) => console.log(err))
  }

  getGistArticle = async (url, token, signal) => {
    return fetch(`${url}`, {
      headers: { Authorization: ' token ' + token },
      signal: signal
    }).then((data) => data.text())
      .then((article) => article)
      .catch((err) => console.log(err))
  }

  updateGist = async (gistId, payload, token) => {
    console.log(`${API.GITHUB_API_URL}/gists/${gistId}`)
    console.log(payload)
    console.log(token)
    return fetch(`${API.GITHUB_API_URL}/gists/${gistId}`, {
      method: 'PATCH',
      headers: { Authorization: ' token ' + token },
      body: `${payload}`
    }).then((data) => data.status)
      .catch((err) => console.log(err))
  }

  addGist = async (payload, token) => {
    console.log(`${API.GITHUB_API_URL}/gists`)
    console.log(payload)
    console.log(token)
    return fetch(`${API.GITHUB_API_URL}/gists`, {
      method: 'POST',
      headers: { Authorization: ' token ' + token },
      body: `${payload}`
    }).then((data) => data.status)
      .catch((err) => console.log(err))
  }

  deleteGist = async (gistId, token) => {
    console.log(`${API.GITHUB_API_URL}/gists/${gistId}`)
    console.log(token)
    return fetch(`${API.GITHUB_API_URL}/gists/${gistId}`, {
      method: 'DELETE',
      headers: { Authorization: ' token ' + token }
    }).then((data) => data.status)
      .catch((err) => console.log(err))
  }
}

const github = new Github()
export default github
