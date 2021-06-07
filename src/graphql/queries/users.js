import { gql } from '@urql/svelte'

export const QUERY_USER = gql`
  query QUERY_USER {
    users: queryUser {
      id
      username
      fullName
    }
  }
`
