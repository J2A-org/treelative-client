<script>
  import SearchResult from './Search/SearchResult.svelte'
  
  export let users
  let searchInput
  let filteredUsers
  $: if (!searchInput) {
    filteredUsers = null
  } else {
    filteredUsers = users.filter(user => (
      user.fullName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    ))
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
  div {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 10;
  }
  input {
    width: 70vw;
    max-width: 260px;
    height: 38px;
    background: #FFFFFF;
    border-radius: 50px;
    padding: 0px 20px;
    border: 0px;
  }
</style>
