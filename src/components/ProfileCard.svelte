<script>
  import { quintOut } from 'svelte/easing'
  import { scale, fly } from 'svelte/transition'

  import { activeNodeID, network } from '../stores.js'

  import { operationStore, query } from '@urql/svelte'
  import { GET_USER } from '../graphql/queries/user'

  import Loading from './Loading.svelte'
  import Modal from './Layout/Modal.svelte'
  import Login from './ProfileCard/Login.svelte'
  import Slider from './ProfileCard/Slider.svelte'

  import EditUserFullName from './EditUser/EditUserFullName.svelte'

  const animation = { delay: 1050, y: -25, duration: 500 }

  const queryUser = operationStore(GET_USER, { id: $activeNodeID })
  query(queryUser)

  const refresh = () => {
    queryUser.context = { requestPolicy: 'cache-and-network' }
  }

  const onClose = () => {
    // clear the activeNodeID in store
    activeNodeID.update(() => null)
    // unselect all nodes
    $network.unselectAll()
  }

  let fallbackAvatar = ''
  const setFallbackAvatar = () => {
    fallbackAvatar = `https://ui-avatars.com/api/?name=${queryUser.data.user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }
</script>

<Modal on:close={onClose} modalOveriteStyle="padding: 0; background: transparent;">
  <div class="outer-container" transition:scale='{{ opacity: 0.5, start: 0, easing: quintOut, duration: animation.duration }}'>
    {#if $queryUser.fetching}
      <Loading />
    {:else if $queryUser.error}
      <Login on:complete={refresh} />
    {:else}
      <div class="inner-container" in:fly='{{ delay: animation.delay - 500, x: 500, opacity: 1, duration: animation.duration }}'>
        <img
          src={fallbackAvatar || $queryUser.data.user.avatar}
          alt='avatar'
          class='avatar'
          class:admin={$queryUser.data.user.role === 'ADMIN'}
          in:fly='{animation}'
          on:error={setFallbackAvatar}
        />
        {#if $queryUser.data.user.role === 'ADMIN'}
          <img
            src='/images/adminCrown.png'
            alt='crown'
            class='admin-crown'
            in:fly='{{ delay: animation.delay + 1500, y: -100, duration: animation.duration }}'
          />
        {/if}
        <EditUserFullName user={$queryUser.data.user}>
          <p slot="trigger">
            {$queryUser.data.user.fullName} ✏️
          </p>
        </EditUserFullName>
        <!-- <h1 in:fly='{{ ...animation, delay: animation.delay + 100 }}'>
          {$queryUser.data.user.fullName}
        </h1> -->
        <div class="slides">
          <Slider user={$queryUser.data.user} />
        </div>
      </div>
    {/if}
  </div>
</Modal>

<style lang='scss'>
  .outer-container {
    height: 600px;
    width: 400px;
    background: url('/images/profilecardBg.jpg');
    background-size: cover;
    background-position: bottom center;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    @media only screen and (max-width: 400px) {
      width: 100vw;
    }
  }
  .inner-container {
    margin-top: 56px;
    width: 330px;
    height: 450px;
    background: hsla(0, 0%, 100%, 0.6);
    border-radius: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    width: 94px;
    height: 94px;
    margin-top: -56px;
    border-radius: 50%;
    border: 5px solid #FFFFFF;
    filter: drop-shadow(0px 6px 8px hsla(0, 0%, 0%, 0.25));

  }
  .admin {
    border: 5px solid #FFE503;
  }
  .admin-crown {
    width: 120px;
    object-fit: contain;
    position:absolute;
    top: 0;
  }
  .slides {
    transform: translate(0%, 380px);
  }
</style>