import { gql } from '@urql/svelte'

export const UPDATE_USER_FULL_NAME = gql`
  mutation UPDATE_USER_FULL_NAME ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      fullName
    }
  }
`
