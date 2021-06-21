import { gql } from '@urql/svelte'

export const RELATIONS = gql`
  query RELATIONS ( $id: String ) {
    user: getUser( filter: { id: $id } ) {
      parents {
        id
        avatar
        fullName
      }
      children {
        id
        avatar
        fullName
      }
      couple {
        partner {
          id
          avatar
          fullName
        }
        dateOfMarriage
        marriageLocation
      }
    }
  }
`
