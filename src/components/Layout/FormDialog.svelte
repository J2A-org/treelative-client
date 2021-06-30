<script>
  import Modal from './Modal.svelte'
  import ErrorAlert from '../Error/ErrorAlert.svelte'

  export let formID = 'uniqueFormID'
  export let title = 'Form Title'
  export let subTitle = 'Form Subtitle'
  export let submitLabel = 'Submit'
  export let error
  export let loading
  export let isDisabled
</script>


<Modal on:close>
  <div class="header">
    <h2>{title}</h2>
    <h3>{subTitle}</h3>
  </div>
  <form id={formID} on:submit|preventDefault>
    <slot />
  </form>
  <div class="footer">
    {#if error}
      <ErrorAlert {error} />
    {/if}
    <button type='submit' form={formID} disabled={isDisabled} class:loading>
      {submitLabel}
    </button>
  </div>
</Modal>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
  .footer {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
</style>