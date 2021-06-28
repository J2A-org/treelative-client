<script>
  import { setClient, operationStore, query } from '@urql/svelte'
  
  import { stabilized } from './stores'
  import { GET_NODES_EDGES } from './graphql/queries/nodesAndEdges'
  
  import Error from './components/Error.svelte'
  import Graph from './components/Graph.svelte'
  import Search from './components/Search.svelte'
  import Loading from './components/Loading.svelte'
  import ProfileCard from './components/ProfileCard.svelte'
  
  import client from './graphql/client'

  setClient(client)
  
  const queryNodesAndEdges = operationStore(GET_NODES_EDGES)
  query(queryNodesAndEdges)
</script>

{#if $queryNodesAndEdges.fetching}
  <Loading />
{:else if $queryNodesAndEdges.error}
  <Error errorMessage={queryNodesAndEdges.error.message} />
{:else}
  {#if !$stabilized}
    <Loading/>
  {:else}
    <ProfileCard />
    <Search />
  {/if}
  <Graph nodesAndEdges={$queryNodesAndEdges.data.getNetworkData} />
{/if}
