import { gql } from '@urql/svelte'

export const GET_USER = gql`
  query GET_USER ( $id: String ) {
    user: getUser( filter: { id: $id } ) {
      avatar
      fullName
      # death
      dateOfBirth
      birthLocation
      # birth
      dateOfDeath
      deathLocation
      # currentLocation
      currentLocation
      # relations
      parents {
        id
        avatar
      }
      children {
        id
        avatar
      }
      couple {
        partner {
          id
          avatar
        }
        dateOfMarriage
        marriageLocation
      }
      # social
      email
      phoneNumber
      socialLinks {
        id
        type
        url
      }     
    }
  }
`
