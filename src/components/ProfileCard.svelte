<script>
  import Modal from './Layout/Modal.svelte'
  import Login from './ProfileCard/Login.svelte'
  import Logout from './ProfileCard/Logout.svelte'

  
  import { activeNodeID, network } from '../stores.js'
  
  import bg from '../images/profilecardBg.jpg'

  const onActiveNodeClose = () => {
    // clear the activeNodeID in store
    activeNodeID.update(() => null)
    // unselect all nodes
    $network.unselectAll()
  }

  const authCheck = window.localStorage.getItem('AUTH_SESSION_ID')
</script>

{#if $activeNodeID}
	<Modal on:close={onActiveNodeClose}>
    <div style="background-image: url('{bg}');">
      {#if !authCheck}
        <Login />
      {:else}

        <Logout />
      {/if}
    </div>
	</Modal>
{/if}

<style lang='scss'>
  div {
    width: 400px;
    height: 550px;
    background-size: 100% auto;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
  }
</style>