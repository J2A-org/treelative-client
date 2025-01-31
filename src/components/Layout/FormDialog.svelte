<script>
  import Modal from '@app/components/Layout/Modal.svelte'
  import ErrorAlert from '@app/components/Error/ErrorAlert.svelte'
  import { Diamonds } from 'svelte-loading-spinners'

  import { createEventDispatcher } from 'svelte'

  export let formID = 'uniqueFormID'
  export let title = 'Form Title'
  export let subTitle = 'Form Subtitle'
  export let submitLabel = 'Submit'
  export let error
  export let isLoading = false
  export let isDisabled = false

  const dispatch = createEventDispatcher()
  const onClose = () => {
    dispatch('close')
  }
</script>


<Modal on:close={onClose}>
  <div class="header">
    <h2 class="title">{title}</h2>
    <h3 class="subTitle">{subTitle}</h3>
  </div>
  <div class="content">
    <form id={formID} on:submit|preventDefault>
      <slot />
    </form>
    <div class="footer">
      {#if error}
        <ErrorAlert {error} />
      {/if}
      <button type='submit' form={formID} disabled={isDisabled || isLoading}>
      {#if isLoading}
        <Diamonds size="60" color="hsl(209, 62%, 65%)" unit="px" duration="4s" />
      {:else}
        {submitLabel}
      {/if}
    </button>
  </div>
</Modal>

<style lang="scss">
  .content {
    padding: 0.5rem 0;
    max-width: 20rem;
  }
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .title {
    font-size: 1.6rem;
  }
  .subTitle {
    font-size: 0.8rem;
  }
  form {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
  .footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  button[type=submit] {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2.5rem;
    background-color: hsl(209, 62%, 50%);
    padding: 0.5em;
    border-radius: 0.5em;
    color: white;
    outline: 2px solid transparent;
    &:hover, &:focus {
      background-color: hsl(209, 62%, 45%);
    }
    &:active {
      background-color: hsl(209, 62%, 40%);
    }
  }
</style>
