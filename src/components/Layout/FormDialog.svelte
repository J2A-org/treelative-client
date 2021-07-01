<script>
  import Modal from './Modal.svelte'
  import ErrorAlert from '../Error/ErrorAlert.svelte'
  // import MdClose from 'svelte-icons/md/MdClose.svelte'
  import Fa from 'svelte-fa'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
  <button class="close-button" on:click={onClose}>
    <div class="close-icon">
      <Fa icon={faTimes} />
    </div>
  </button>
  <div class="header">
    <h2 class="title">{title}</h2>
    <h3 class="subTitle">{subTitle}</h3>
  </div>
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
  .close-button {
    position: absolute;
    right: 1rem;
    width: 3rem;
    cursor: pointer;
    background: transparent;
    border-width: 0px;
  }
  .close-icon {
    font-size: 3em;
    color: tomato;
  }
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
</style>