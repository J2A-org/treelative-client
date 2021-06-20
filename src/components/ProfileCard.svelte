<script>
  import { quintOut } from 'svelte/easing'
  import { scale, fly } from 'svelte/transition'

  import { GET_USER_1 } from '../graphql/queries/ProfileCard/user1'
  import { operationStore, query } from '@urql/svelte'

  import Modal from './Layout/Modal.svelte'
  import Login from './ProfileCard/Login.svelte'
  import Logout from './ProfileCard/Logout.svelte'
  import Slider from './ProfileCard/Slider.svelte'

  import { activeNodeID, network } from '../stores.js'
  
  import bg from '../images/profilecardBg.jpg'

  const onActiveNodeClose = () => {
    // clear the activeNodeID in store
    activeNodeID.update(() => null)
    // unselect all nodes
    $network.unselectAll()
  }

  const queryUser = operationStore(GET_USER_1, { id: null }, { pause: true })
  query(queryUser)
	const unsubscribe = activeNodeID.subscribe(value => {
    if (value) {
      $queryUser.context.pause = false
      $queryUser.variables.id = value
    }
	})
  const onLoginComplete = () => refresh()
  const refresh = () => $queryUser.context = { requestPolicy: 'cache-and-network' }

</script>

{#if $activeNodeID}
	<Modal on:close={onActiveNodeClose}>
    <div 
      style="background-image: url('{bg}');"
      transition:scale='{{ duration: 500, opacity: 0.5, start: 0, easing: quintOut }}'
    >
      {#if !$activeNodeID}
        <p>Loading</p>
      {:else}
        {#if $queryUser.fetching}
          <p>Loading..</p>
        {:else if $queryUser.error }
          <!-- <p>Oh no... {$queryUser?.error?.message}</p> -->
          <Login onComplete={onLoginComplete} />
        {:else}
        <div in:fly='{{ delay: 550, x: 500, opacity: 1, duration: 500 }}'>
          <img
            src={queryUser.data.user.avatar}
            alt='user-avatar'
            in:fly='{{ delay: 1050, y: -25, duration: 500 }}'
          />
          <h1 in:fly='{{ delay: 1150, y: -25, duration: 500 }}'>{$queryUser.data.user.fullName}</h1>
          <Slider />
        </div>
        {/if}
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
    div {
      width: 330px;
      height: 418px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      left: 35px;
      top: 94px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 20px;
      overflow: visible;
      img {
        width: 94px;
        margin-top: -56px;
        border-radius: 50%;
        border: 5px solid #FFFFFF;
        filter: drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.25));
      }
      h1 {
        margin-top: 8px;
        font-size: 22px;
        font-weight: 100;
        color: #26114D;
      }
    }
  }
</style>