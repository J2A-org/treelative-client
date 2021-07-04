<script>
  import { scale } from 'svelte/transition'

  import Modal from '@app/components/Layout/Modal.svelte'

  import Fa from 'svelte-fa'
  import { faExclamation } from '@fortawesome/free-solid-svg-icons'

  export let errorMessage
</script>

<Modal modalOveriteStyle="padding: 0; background: transparent;">
  <div class="container" transition:scale='{{ duration: 500, opacity: 0.5, start: 0 }}'>
    <div class="error-icon">
      <Fa icon={faExclamation} />
    </div>
    <h2 class="error-title">
      Oops! Something went wrong!
    </h2>
    <p class="error-message">
      {errorMessage} asdsa dsad sadsa dsads dads sa sd
    </p>
    <button class="reload-button" on:click={() => window.location.reload()}>
      Reload
    </button>
  </div>
</Modal>

<style lang='scss'>
  .container {
    max-width: 20rem;
    border-radius: 1.2rem;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: hsl(0, 0%, 75%) solid 0.2em;
    padding: 3.5em 2em;
    background: hsl(225, 36%, 4%);
    color: white;
    @media only screen and (max-width: 20rem) {
      width: 100vw;
      padding: 3.5em 1em;
    }
  }
  .error-icon {
    display: grid;
    place-items: center;
    font-size: 2em;
    height: 2em;
    width: 2em;
    border-radius: 50%;
    color: white;
    @media only screen and (max-width: 20rem) {
      font-size: 1.5em;
    }
  }
  .error-title {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 0.3em;
  }
  .error-message {
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 2em;
  }
  .error-icon, .reload-button {
    background: linear-gradient(hsl(337, 100%, 60%), hsl(16, 60%, 70%) 100%);
  }
  .reload-button {
    width: 8em;
    height: 2.5em;
    border: none;
    margin-top: 1em;
    border-radius: 0.5em;
    color: white;
    font-size: 1.3rem;
    &:hover, &:focus {
      background: linear-gradient(hsl(337, 100%, 55%), hsl(16, 60%, 65%) 100%);
    }
    &:active {
      background: linear-gradient(hsl(337, 100%, 50%), hsl(16, 60%, 60%) 100%);
    }
    @media only screen and (max-width: 20rem) {
      width: 100%;
    }
  }
</style>