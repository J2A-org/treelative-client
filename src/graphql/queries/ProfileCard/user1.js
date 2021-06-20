import { gql } from '@urql/svelte'

export const GET_USER_1 = gql`
  query GET_USER_1 ( $id: String ) {
    user: getUser( filter: { id: $id } ) {
      avatar
      fullName
      dateOfBirth
      birthLocation
      dateOfDeath
      deathLocation
    }
  }
`
