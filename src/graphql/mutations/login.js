import { gql } from '@urql/svelte'

export const LOGIN = gql`
  mutation LOGIN ( $username: String!, $password: String!) {
    login ( input: { username: $username password: $password } )
  }
`
