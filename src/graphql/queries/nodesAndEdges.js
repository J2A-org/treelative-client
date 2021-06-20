import { gql } from '@urql/svelte'

export const GET_NODES_EDGES = gql`
  query GET_NODES_EDGES {
    getNetworkData
  }
`
