import { gql } from '@urql/svelte'

export const GET_USER = gql`
  query GET_USER ( $id: String ) {
    user: getUser( filter: { id: $id } ) {
      fullName
      email
      phoneNumber
      avatar
      birthLocation
      currentLocation
      deathLocation
      dateOfBirth
      dateOfDeath
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
      socialLinks {
        id
        type
        url
      }
    }
  }
`
