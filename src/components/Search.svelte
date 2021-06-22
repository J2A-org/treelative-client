<script>
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  const value = tweened(0, { duration: 100 })

  import Modal from './Layout/Modal.svelte'
  import SearchResult from './Search/SearchResult.svelte'

  import search from '../images/search.svg'

  export let nodes

  let searchInput
  let filteredUsers
  $: if (!searchInput) {
    filteredUsers = null
  } else {
    filteredUsers = nodes.filter(user => user.group === 'individual')
    filteredUsers = filteredUsers.filter(user => user.label.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)
  }

  let isOpen = false
  const handleOpen = () => {
    isOpen = !isOpen
    value.set(260)
  }
  const handleClose = async () => {
    await value.set(0)
    isOpen = !isOpen
  }
</script>

<button on:click={handleOpen}>
  <img src={search} alt='search'/>
</button>
{#if isOpen}
  <Modal on:close={handleClose}>
    <div transition:fade='{{ duration: 500 }}'>
      <div>
        <img src={search} alt='search'/>
        <input
          type='text'
          bind:value={searchInput}
          style='width: {$value}px;'
          autofocus
        />
        <SearchResult users={filteredUsers} on:close={handleClose}/>
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
    img {
      position: absolute;
      right: 8px;
      top: 8px;
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
        right: 8px;
        top: 8px;
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
</style>
