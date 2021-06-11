<script>
  import { QUERY_USER } from '../graphql/queries/users'
  import { QUERY_COUPLE } from '../graphql/queries/couples'
  import { operationStore, query } from '@urql/svelte'

  import Network from './Graph/Network.svelte'
  
  const queryUser = operationStore(QUERY_USER)
  const queryCouple = operationStore(QUERY_COUPLE)
  
  query(queryUser)
  query(queryCouple)
</script>

{#if $queryUser.fetching || $queryCouple.fetching }
  <p>Loading...</p>
{:else if $queryUser.error || $queryCouple.fetching}
  <p>Oh no... {$queryUser.error.message && $queryCouple.fetching}</p>
  {:else}
    <Network users={$queryUser.data.users} couples={$queryCouple.data.users}/>
{/if}

<style lang="scss">
</style>
