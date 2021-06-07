<script>
  import { QUERY_USER } from '../graphql/queries/users'
  import { operationStore, query } from '@urql/svelte'
  
  const queryUser = operationStore(QUERY_USER)
  query(queryUser)
</script>

<div class="example">
  <h2>example fetching users</h2>
  {#if $queryUser.fetching}
    <p>Loading...</p>
  {:else if $queryUser.error}
    <p>Oh no... {$queryUser.error.message}</p>
  {:else}
    {#each $queryUser.data.users as user}
      <h3>{user.fullName}</h3>
    {/each}
  {/if}
</div>

<style lang="scss">
  .example {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  h2, h3 {
    margin: 0;
    font-weight: 600;
  }
  h2 {
    font-size: 1.25rem;
  }
  h3 {
    font-size: 1rem;
  }
</style>
