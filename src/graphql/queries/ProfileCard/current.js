import { gql } from '@urql/svelte'

export const CURRENT = gql`
  query CURRENT ( $id: String ) {
    user: getUser( filter: { id: $id } ) { currentLocation }
  }
`
