import { gql } from '@urql/svelte'

export const QUERY_ALL_USERS = gql`
  query QUERY_ALL_USERS {
    users: queryUser {
      id
      shortName
      fullName
    }
  }
`
