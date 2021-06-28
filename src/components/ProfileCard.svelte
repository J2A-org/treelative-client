<script>
  import { quintOut } from 'svelte/easing'
  import { scale, fly } from 'svelte/transition'

  import { operationStore, query } from '@urql/svelte'

  import { activeNodeID, network } from '../stores.js'
  import { GET_USER } from '../graphql/queries/user'

  import Loading from './Loading.svelte'
  import Modal from './Layout/Modal.svelte'
  import Login from './ProfileCard/Login.svelte'
  import Slider from './ProfileCard/Slider.svelte'

  const animation = { delay: 1050, y: -25, duration: 500 }

  const onActiveNodeClose = () => {
    // reset fallbackAvatar
    fallbackAvatar = ''
    // clear the activeNodeID in store
    activeNodeID.update(() => null)
    // unselect all nodes
    $network.unselectAll()
  }

  let queryUser
  $: {
    if ($activeNodeID) {
      queryUser = operationStore(GET_USER, { id: $activeNodeID })
      query(queryUser)
    }
  }

  const refresh = () => {
    queryUser.context = { requestPolicy: 'cache-and-network' }
  }

  let fallbackAvatar = ''
  const setFallbackAvatar = () => {
    fallbackAvatar = `https://ui-avatars.com/api/?name=${queryUser.data.user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }
</script>

{#if $activeNodeID}
	<Modal on:close={onActiveNodeClose}>
    <div>
      <div transition:scale='{{ duration: animation.duration, opacity: 0.5, start: 0, easing: quintOut }}'>
        {#if !$activeNodeID}
          <p>Loading</p>
        {:else}
          {#if $queryUser.fetching}
           <Loading />
          {:else if $queryUser.error }
            <!-- <p>Oh no... {$queryUser?.error?.message}</p> -->
            <!-- SHOW ERROR MODAL-->
            <Login onComplete={refresh} />
          {:else}
            <img
              id={queryUser.id}
              src='/images/close.svg'
              alt='close-button'
              class='close-btn'
              on:click={onActiveNodeClose}
            />
            <div in:fly='{{ delay: animation.delay - 500, x: 500, opacity: 1, duration: animation.duration }}'>
              <img
                src={fallbackAvatar || queryUser.data.user.avatar}
                alt='avatar'
                in:fly='{animation}'
                on:error={setFallbackAvatar}
              />
              <h1 in:fly='{{ ...animation, delay: animation.delay + 100 }}'>
                {queryUser.data.user.fullName}
              </h1>
              <Slider user={queryUser.data.user} />
            </div>
          {/if}
        {/if}
      </div>
    </div>
	</Modal>
{/if}

<style lang='scss'>
  div {
    z-index: 51;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -25%);
    div {
      width: 100vw;
      height: 600px;
      max-width: 400px;
      background-size: 100% auto;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      background-size: cover;
      background-position: bottom center;
      background: url('/images/profilecardBg.jpg');
      .close-btn {
        position: absolute;
        top: 25px;
        right: 25px;
        cursor: pointer;
      }
      div {
        width: 330px;
        height: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%, -43%);
        background: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
        overflow: visible;
        img {
          width: 94px;
          height: 94px;
          margin-top: -56px;
          border-radius: 50%;
          border: 5px solid #FFFFFF;
          filter: drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.25));
        }
        h1 {
          width: 50%;
          margin-top: 8px;
          font-size: 22px;
          font-weight: 100;
          color: #26114D;
          text-align: center;
        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
    div {
      div {
        max-width: 500px;
      }
    }
  }
</style>