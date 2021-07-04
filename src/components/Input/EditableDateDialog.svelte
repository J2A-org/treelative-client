<script>
  import FormDialog from '@app/components/Layout/FormDialog.svelte'
  import AutoComplete from 'simple-svelte-autocomplete'
  import { onMount } from 'svelte'

  import { createForm } from 'svelte-forms-lib'

  export let value = new Date().toISOString()
  export let title = 'Form Title'
  export let subTitle = 'Form Subtitle'
  export let onSubmit = console.log
  export let error
  export let notification = ''

  // date options
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((name, id) => ({ id, name }))
  const years = Array.from({ length: 121 }, (_, i) => i + 1900)

  const parsedDate = new Date(value)

  const { form, isSubmitting, handleSubmit, handleReset } = createForm({
    initialValues: {
      day: parsedDate.getDate(),
      month: months[parsedDate.getMonth()],
      year: parsedDate.getFullYear()
    },
    onSubmit: ({ day, month, year }) => {
      const submitDate = new Date(year, month.id, day, 0, 0, 0, 0)
      return onSubmit(submitDate.toISOString())
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

  onMount(() => {
    // restrict all numeric inputs to type number
    document.querySelectorAll('.numeric').forEach(elm => {
      elm.type = 'number'
    })
  })
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
      <AutoComplete items={days} bind:selectedItem={$form.day} className="control" dropdownClassName="dropdown" inputClassName='numeric' />
      <AutoComplete items={months} bind:selectedItem={$form.month} className="control" dropdownClassName="dropdown" labelFieldName="name"/>
      <AutoComplete items={years} bind:selectedItem={$form.year} className="control" dropdownClassName="dropdown" inputClassName='numeric' />
    </div>
  </FormDialog>
{/if}

<style lang="scss">
  .container {
    width: 20rem;
    min-height: 10rem;
    display: flex;
  }
  .container :global(.control) {
    min-width: unset !important;
  }
  .container :global(.dropdown) {
    max-height: 8rem !important;
  }
</style>