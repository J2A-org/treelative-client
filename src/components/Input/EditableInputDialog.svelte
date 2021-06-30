<script>
  import FormDialog from '../Layout/FormDialog.svelte'

  let isOpen = false
  const onOpen = () => { isOpen = true }
  const onClose = () => { isOpen = false }

  export let type = 'text'
  export let name = 'inputFieldName'
  export let value = ''
  export let title = 'Form Title'
  export let subTitle = 'Form Subtitle'
  export let onFormSubmit = console.log
  export let validation
  export let error
  export let loading

  const onCancel = () => {
    // TODO: reset form
    onClose()
  }

  import { object } from 'yup'
  import { useForm } from 'svelte-reactive-form'

  const schemaValidation = object().shape({
    [name]: validation
  })

  const form$ = useForm({
    defaultValues: { [name]: value },
    resolver: {
      validate (data) {
        return schemaValidation
          .validate(data, { abortEarly: false })
          .catch(({ inner }) => {
            return Promise.reject(
              inner.reduce((acc, cur) => {
                const { path, errors } = cur
                acc[path] = errors
                return acc
              }, {})
            )
          })
      }
    }
  })

  const { field, onSubmit, errors } = form$

  const handleOnSubmit = (form) => {
    const submitData = type !== 'number' ? form[name].trim() : parseInt(form[name])
    onFormSubmit(submitData)
      .then(result => {
        if (result.data) {
          onClose()
        }
      })
      .catch(console.log)
  }

  $: console.log($errors)
</script>

{#if isOpen}
  <FormDialog
    formID='uniqueFormID'
    title={title}
    subTitle={subTitle}
    submitLabel='Submit'
    error={error || $errors[name]}
    {loading}
    isDisabled
    on:close={onCancel}
    on:submit={onSubmit(handleOnSubmit)}
  >
    <input type={type} use:field />
  </FormDialog>
{:else}
  <p on:click={onOpen}>{value}</p>
{/if}
