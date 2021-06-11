<script>
  import client from './graphql/client'
  import { setClient } from '@urql/svelte'
  setClient(client)

  import { QUERY_USER } from './graphql/queries/users'
  import { QUERY_COUPLE } from './graphql/queries/couples'
  import { operationStore, query } from '@urql/svelte'
  const queryUser = operationStore(QUERY_USER)
  const queryCouple = operationStore(QUERY_COUPLE)
  query(queryUser)
  query(queryCouple)

  import Graph from "./components/Graph.svelte"
  import Search from "./components/Search.svelte"
</script>

{#if $queryUser.fetching || $queryCouple.fetching }
  <p>Loading...</p>
  {:else if $queryUser.error || $queryCouple.fetching}
    <p>Oh no... {$queryUser.error.message && $queryCouple.fetching}</p>
    {:else}
      <Search users={$queryUser.data.users}/>
      <Graph users={$queryUser.data.users} couples={$queryCouple.data.users}/>
{/if}

<style lang="scss">
</style>
