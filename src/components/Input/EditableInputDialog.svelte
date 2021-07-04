<script>
  import FormDialog from '@app/components/Layout/FormDialog.svelte'

  import { createForm } from 'svelte-forms-lib'
  import { object } from 'yup'

  export let type = 'text'
  export let name = 'inputFieldName'
  export let value
  export let title = 'Form Title'
  export let subTitle = 'Form Subtitle'
  export let onSubmit = console.log
  export let validation
  export let error
  export let notification = ''

  const { form, errors, isSubmitting, handleSubmit, handleReset } = createForm({
    initialValues: {
      [name]: value
    },
    validationSchema: object().shape({
      [name]: validation
    }),
    onSubmit: values => {
      return onSubmit(values[name])
      .then(result => {
        if (result.data) {
          // onSuccess, notify if applicable and close the dialog
          notification && alert('REPLACE WITH TOAST: ' + notification)
          onClose()
        }
      })
      .catch(console.log)
    }
  })

  // handle dialog's open-close state
  let isOpen = false
  const onOpen = () => { isOpen = true }
  const onClose = () => { isOpen = false }

  const handleClose = () => {
    error = null // reset any server errors
    handleReset() // reset the form's local state
    onClose()
  }
</script>

<!-- Trigger to open the edit dialog -->
<div on:click={onOpen}>
  <slot name="trigger">
    <p>{value}</p>
  </slot>
</div>

{#if isOpen}
  <FormDialog
    formID='uniqueFormID'
    title={title}
    subTitle={subTitle}
    submitLabel='Submit'
    error={error}
    isLoading={$isSubmitting}
    on:close={handleClose}
    on:submit={handleSubmit}
  >
    <div class='container'>
      {#if type === 'textarea'}
        <input type='textarea' {name} bind:value={$form[name]} class:invalid={$errors[name]} disabled={$isSubmitting} />
      {:else if type === 'number'}
        <input type='number' {name} bind:value={$form[name]} class:invalid={$errors[name]} disabled={$isSubmitting} />
      {:else}
        <input type='text' {name} bind:value={$form[name]} class:invalid={$errors[name]} disabled={$isSubmitting} />
      {/if}
      {#if $errors[name]}
        <p class="error">{$errors[name]}</p>
      {/if}
    </div>
  </FormDialog>
{/if}

<style lang="scss">
  .container {
    width: 20rem;
  }
  input {
    width: 100%;
    padding: 0.5em;
    box-shadow: 0 0 0 1px hsl(208, 18%, 50%);
    border-radius: 0.5rem;
    outline: 2px solid transparent;
    transition: box-shadow 100ms ease-in;
    &:hover:not(:focus):not(.invalid) {
      box-shadow: 0 0 0 1px hsl(208, 18%, 20%);
    }
    &:focus:not(.invalid) {
      box-shadow: 0 0 0 2px hsl(213, 49%, 34%);
    }
    &.invalid {
      box-shadow: 0 0 0 2px red;
    }
  }
  .error {
    color: red;
    margin-top: 0.5rem;
  }
</style>