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

export const SEARCH_USERS = gql`
  query SEARCH_USERS ($search: String!) {
    users: queryUser (
      where: {
        OR: [
          { username: { contains: $search, mode: "insensitive" } }
          { fullName: { contains: $search, mode: "insensitive" } }
          { shortName: { contains: $search, mode: "insensitive" } }
          { email: { contains: $search, mode: "insensitive" } }
          { phoneNumber: { contains: $search, mode: "insensitive" } }
          { currentLocation: { path: ["description"], string_contains: $search } }
          { birthLocation: { path: ["description"], string_contains: $search } }
          { deathLocation: { path: ["description"], string_contains: $search } }
        ]
      }
      orderBy: { fullName: asc }
      take: 5
    ) {
      id
      avatar
      fullName
      currentLocation
    }
  }
`
