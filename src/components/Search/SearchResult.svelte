<script>
  export let users

  import { fly } from 'svelte/transition'
  const a = { delay: 60, duration: 500 }

  import { createEventDispatcher } from 'svelte'

  import { activeNodeID } from '../../stores'

  const dispatch = createEventDispatcher()
  const close = async (id) => {
    await activeNodeID.update(() => id)
    dispatch('close')
  }

  $: if (users) users = users.slice(0, 10)
</script>

<div>
  {#if users}
    {#each users as user, idx}
      <button
        in:fly='{{ delay: a.delay * idx, y: -10, duration: a.duration + 300 }}'
        out:fly='{{ delay: a.delay * idx, x: 500, opacity: 1, duration: a.duration }}'
        on:click={() => close(user.id)}
      >
        <img src={user.image} alt='user-avatar' />
        <div>
          <h1>{user.label}</h1>
          <div>
            <h1>21/11/99</h1>
            <h1>Italy, GE</h1>
          </div>
        </div>
      </button>
    {/each}
  {/if}
</div>

<style lang='scss'>
  div {
    margin-top: 38px;
    button {
      display: flex;
      align-items: center;
      width: 70vw;
      max-width: 300px;
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
