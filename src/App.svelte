<script>
  import client from './graphql/client'
  import { setClient, operationStore, query } from '@urql/svelte'
  setClient(client)
  
  import { GET_NODES_EDGES } from './graphql/queries/nodesAndEdges'
  const queryNodesAndEdges = operationStore(GET_NODES_EDGES)
  query(queryNodesAndEdges)

  import Graph from './components/Graph.svelte'
  // import Search from './components/Search.svelte'
  import ProfileCard from './components/ProfileCard.svelte'
</script>

{#if $queryNodesAndEdges.fetching }
  <p>Loading...</p>
{:else if $queryNodesAndEdges.error}
  <p>Oh no... {$queryNodesAndEdges.error.message}</p>
{:else}
  <ProfileCard />
  <!-- <Search users={$queryNodesAndEdges.data.users}/> -->
  <Graph nodesAndEdges={$queryNodesAndEdges.data.getNetworkData} />
{/if}
