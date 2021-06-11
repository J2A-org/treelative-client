import { gql } from '@urql/svelte'

export const QUERY_COUPLE = gql`
  query QUERY_COUPLE {
    users: queryCouple {
      id
      userOne {
        id
        children {
          id
        }
      }
      userTwo {
        id
      }
    }
  }
`
