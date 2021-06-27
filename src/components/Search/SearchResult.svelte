<script>
  export let querySearchUsers

  import { fly } from 'svelte/transition'
  const animation = { delay: 60, duration: 500 }

  import { createEventDispatcher } from 'svelte'

  import { activeNodeID } from '../../stores'

  const dispatch = createEventDispatcher()
  const close = async (id) => {
    await activeNodeID.update(() => id)
    dispatch('close')
  }

  // TODO: Make resuable Image component to handle fallback
  let fallbackAvatar = 'https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg'
  const setFallbackAvatar = () => {
    fallbackAvatar = 'https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg'
  }
</script>

{#if querySearchUsers.fetching}
  <p>SHOW LOADING...</p>
{:else if querySearchUsers.error }
  <p>SHOW ERROR...</p>
{:else}
  <div>
    {#each querySearchUsers.data.users as user, idx}
      <button
        in:fly='{{ delay: animation.delay * 0, y: -10, duration: animation.duration + 300 }}'
        on:click={() => close(user.id)}
      >
        <img src={fallbackAvatar || user.avatar} alt='user-avatar' on:error={setFallbackAvatar} />
        <div>
          <h1>{user.fullName}</h1>
          <div>
            {#if !user.currentLocation}
              <h1>Unavailable</h1>
            {:else}
              <h1>{user.currentLocation.terms.slice(-2).map(({ value }) => value).join(', ')}</h1>
            {/if}
          </div>
        </div>
      </button>
    {/each}
    {#if (querySearchUsers.data.users.length === 0)}
      <button
        in:fly='{{ delay: animation.delay, y: -10, duration: animation.duration + 300 }}'
      >
        No results
      </button>
    {/if}
  </div>
{/if}

<style lang='scss'>
  div {
    margin-top: 38px;
    button {
      display: flex;
      align-items: center;
      width: 280px;
      padding: 10px 15px;
      background: #FFFFFF;
      color: #062C4F;
      opacity: 0.9;
      box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      border: none;
      font: inherit;
      &:hover {
        background: rgb(230, 230, 230);
      }
      img {
        width: 36px;
        height: 36px;
        border-radius: 50px;
        margin-right: 15px;
      }
      div {
        display: flex;
        flex-direction: column;
        margin: 0;
        h1 {
          margin: 0px;
          font-weight: bold;
          font-size: 18px;
          text-align: start;
        }
        div {
          display: flex;
          flex-direction: row;
          h1 {
            font-size: 10px;
            font-weight: 300;
            text-align: start;
            margin-right: 3px;
          }
        }
      }
    }
  }
</style>
