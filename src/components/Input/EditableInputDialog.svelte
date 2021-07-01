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
    error={error || $errors[name]}
    {isLoading}
    on:close={onCancel}
    on:submit={handleSubmit}
  >
    <input {name} type='text' on:change={handleChange} bind:value={$form[name]} />
  </FormDialog>
{/if}
<p on:click={onOpen}>{value}</p>
