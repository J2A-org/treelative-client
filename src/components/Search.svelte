<script>
  import { QUERY_USER } from '../graphql/queries/users'
  import { operationStore, query } from '@urql/svelte'

  import SearchResult from './Search/SearchResult.svelte'
  
  const queryUser = operationStore(QUERY_USER)
  query(queryUser)

  let searchInput
  export let filteredUsers
    $: {
      if (!searchInput) {
      filteredUsers = null
    } else {
      filteredUsers = queryUser.data.users.filter(user => (
        user.fullName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      ))
    }
  }
</script>

<div>
  <input 
    type='text'
    bind:value={searchInput}
  />
  <SearchResult users={filteredUsers} />
</div>

<style lang="scss">
  input {
    width: 70vw;
    max-width: 290px;
    height: 38px;
    background: #FFFFFF;
    border-radius: 50px;
    padding: 0px 20px;
    border: 0px;
  }
</style>
