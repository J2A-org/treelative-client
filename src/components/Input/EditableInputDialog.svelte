<script>
  import FormDialog from '../Layout/FormDialog.svelte'

  import { createForm } from 'svelte-forms-lib'
  import { object } from 'yup'

  export let type = 'text'
  export let name = 'inputFieldName'
  export let value = ''
  export let title = 'Form Title'
  export let subTitle = 'Form Subtitle'
  export let onSubmit = console.log
  export let validation
  export let error
  export let notification = ''

  let isOpen = false
  let isLoading = false

  const onOpen = () => { isOpen = true }
  const onClose = () => { isOpen = false }

  const onCancel = () => {
    // TODO: reset form
    onClose()
  }

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      [name]: value
    },
    validationSchema: object().shape({
      [name]: validation
    }),
    onSubmit: values => {
      isLoading = true
      onSubmit(values[name])
      .then(result => {
        if (result.data) {
         notification && alert('REPLACE WITH TOAST: ' + notification)
          onClose()
        }
      })
      .catch(console.log)
      .finally(() => {
        isLoading = false
      })
    }
  })
</script>

{#if isOpen}
  <FormDialog
    formID='uniqueFormID'
    title={title}
    subTitle={subTitle}
    submitLabel='Submit'
    error={error}
    {isLoading}
    on:close={onCancel}
    on:submit={handleSubmit}
  >
    <div>
      <input {name} type='text' on:change={handleChange} bind:value={$form[name]} class:invalid={$errors[name]} />
      {#if $errors[name]}
        <p class="error">{$errors[name]}</p>
      {/if}
    </div>
  </FormDialog>
{/if}
<p on:click={onOpen}>{value}</p>

<style lang="scss">
  div {
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
  }
  .invalid {
    box-shadow: 0 0 0 1px red;
  }
  .error {
    color: red;
    margin-top: 0.5rem;
  }
</style>