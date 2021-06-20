import { gql } from '@urql/svelte'

export const GET_USER_ = gql`
  query GET_USER_ ( $id: String ) {
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
