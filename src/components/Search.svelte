<script>
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  const tween = tweened(0, { duration: 100 })

  import { operationStore, query } from '@urql/svelte'
  import { SEARCH_USERS } from '@app/graphql/queries/users'

  import Modal from '@app/components/Layout/Modal.svelte'
  import SearchResult from '@app/components/Search/SearchResult.svelte'

  let searchInput
  let querySearchUsers
  $: {
    if (searchInput) {
      querySearchUsers = operationStore(SEARCH_USERS, { search: searchInput })
      query(querySearchUsers)
    }
  }

  let isOpen = false
  const handleOpen = () => {
    isOpen = true
    tween.set(240)
  }
  const handleClose = async (e) => {
    await tween.set(0)
    isOpen = false
  }
</script>

<button on:click={handleOpen}>
  <img src='/images/search.svg' alt='search'/>
</button>
{#if isOpen}
  <Modal on:close={handleClose}>
    <div transition:fade='{{ duration: 500 }}'>
      <div>
        <img
          src='/images/search.svg'
          alt='search'
          on:click={handleClose}
        />
        <input
          autofocus
          type='text'
          bind:value={searchInput}
          style='width: {$tween}px;'
        />
        {#if querySearchUsers}
          <SearchResult querySearchUsers={$querySearchUsers} on:close={handleClose}/>
        {/if}
      </div>
    </div>
  </Modal>
{/if}

<style lang='scss'>
  button {
    position: absolute;
    z-index: 1;
		right: 40px;
		top: 40px;
    width: 40px;
    height: 38px;
    border-radius: 50%;
    border: 0px;
    background: #FFFFFF;
    opacity: 0.3;
    transition: opacity 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    img {
      position: absolute;
      right: 0px;
      top: 0px;
      padding: 8px;
    }
  }
  div {
		position: absolute;
		right: 20px;
		top: 20px;
    z-index: 51;
    div {
      img {
        position: absolute;
        z-index: 2;
        right: 0px;
        top: 0px;
        padding: 8px;
        cursor: pointer;
      }
      input {
        position: absolute;
        right: 0px;
		    top: 0px;
        height: 38px;
        background: #FFFFFF;
        border-radius: 50px;
        padding: 0px 20px;
        border: 0px;
      }
    }
  }
  @media only screen and (max-width: 500px) {
    button {
      right: 20px;
    }
    div {
      right: 10px;
    }
  }
</style>
