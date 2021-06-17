<script>
  import client from './graphql/client'
  import { setClient } from '@urql/svelte'
  setClient(client)

  import { QUERY_ALL_USERS } from './graphql/queries/users'
  import { QUERY_COUPLE } from './graphql/queries/couples'
  import { operationStore, query } from '@urql/svelte'

  import Graph from './components/Graph.svelte'
  import Search from './components/Search.svelte'
  import ProfileCard from './components/ProfileCard.svelte'

  const queryUser = operationStore(QUERY_ALL_USERS)
  const queryCouple = operationStore(QUERY_COUPLE)
  query(queryUser)
  query(queryCouple)
</script>

{#if $queryUser.fetching || $queryCouple.fetching }
  <p>Loading...</p>
{:else if $queryUser.error || $queryCouple.fetching}
  <p>Oh no... {$queryUser.error.message && $queryCouple.fetching}</p>
{:else}
  <ProfileCard />
  <Search users={$queryUser.data.users}/>
  <Graph users={$queryUser.data.users} couples={$queryCouple.data.users}/>
{/if}
