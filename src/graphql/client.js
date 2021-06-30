import { createClient } from '@urql/svelte'

export default createClient({
  url: process.env.GRAPHQL_URL,
  fetchOptions: () => {
    const AUTH_SESSION_ID = window.localStorage.getItem('AUTH_SESSION_ID') || null
    return {
      headers: { AUTH_SESSION_ID }
    }
  }
})
