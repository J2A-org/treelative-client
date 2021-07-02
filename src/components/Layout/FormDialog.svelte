<script>
  import Modal from './Modal.svelte'
  import ErrorAlert from '../Error/ErrorAlert.svelte'

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
        show loading indicator ..
      {:else}
        {submitLabel}
      {/if}
    </button>
  </div>
</Modal>

<style lang="scss">
  .content {
    padding: 0.5rem 0;
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
    gap: 4rem;
  }
  button[type=submit] {
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
