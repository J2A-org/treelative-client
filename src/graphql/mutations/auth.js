import { gql } from '@urql/svelte'

export const LOGIN = gql`
  mutation LOGIN ($input: LoginInput!) {
    login (input: $input)
  }
`
