import { gql } from '@urql/svelte'

export const SOCIALS = gql`
  query SOCIALS ( $id: String ) {
    user: getUser( filter: { id: $id } ) { 
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
