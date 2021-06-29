import { gql } from '@urql/svelte'

export const GET_NETWORK_DATA = gql`
  query GET_NETWORK_DATA {
    getNetworkData
  }
`
