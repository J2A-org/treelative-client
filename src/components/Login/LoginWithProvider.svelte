<script>
  import { firebaseAuth } from '@app/utils/firebase'

  import Fa from 'svelte-fa'

  import ErrorDialog from '@app/components/Error/ErrorDialog.svelte'

  export let label
  export let icon
  export let provider
  export let onSuccess

  let error
  const onLogin = () => {
    firebaseAuth.signInWithPopup(provider)
      .then(async (result) => {
        const token = await firebaseAuth.currentUser.getIdToken()
        onSuccess(token, result.additionalUserInfo.profile)
      })
      .catch(err => {
        error = err
      })
  }
</script>

{#if error}
  <ErrorDialog errorMessage={error.message} />
{:else}
  <button aria-label={label} class="close-button" on:click={onLogin}>
    <div class="close-icon">
      <Fa {icon} />
    </div>
  </button>
{/if}


<style lang="scss">
  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    background-color: transparent;
    border-radius: 50%;
    &:hover, :focus {
      background-color: hsla(150, 100%, 40%, 0.3);
    }
    &:active {
      background-color: hsla(150, 100%, 40%, 0.4);
    }
  }
  .close-icon {
    font-size: 1.5em;
    color: hsl(150, 100%, 20%);
  }
</style>