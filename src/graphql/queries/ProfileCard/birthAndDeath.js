import { gql } from '@urql/svelte'

export const BIRTH_AND_DEATH = gql`
  query BIRTH_AND_DEATH ( $id: String ) {
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
