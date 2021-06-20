import { gql } from '@urql/svelte'

export const GET_USER_2 = gql`
  query GET_USER_2 ( $id: String ) {
    user: getUser( filter: { id: $id } ) {
      email
      phoneNumber
      socialLinks {
        id
        type
        url
      }
      currentLocation
    }
  }
`
