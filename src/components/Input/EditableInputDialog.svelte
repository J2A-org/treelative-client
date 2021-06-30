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

  const schemaValidation = object().shape({
    [name]: validation
  })

  // const form$ = useForm({
  //   defaultValues: { [name]: value },
  //   resolver: {
  //     validate (data) {
  //       return schemaValidation
  //         .validate(data, { abortEarly: false })
  //         .catch(({ inner }) => {
  //           return Promise.reject(
  //             inner.reduce((acc, cur) => {
  //               const { path, errors } = cur
  //               acc[path] = errors
  //               return acc
  //             }, {})
  //           )
  //         })
  //     }
  //   }
  // })

  // const { field, onSubmit, errors } = form$

  // const handleOnSubmit = (form) => {
  //   const submitData = type !== 'number' ? form[name].trim() : parseInt(form[name])
  //   onFormSubmit(submitData)
  //     .then(result => {
  //       if (result.data) {
  //         onClose()
  //       }
  //     })
  //     .catch(console.log)
  // }

  const values = {}
  let errors = {}
  async function submitHandler () {
    try {
      // `abortEarly: false` to get all the errors
      await schemaValidation.validate(values, { abortEarly: false })
      alert(JSON.stringify(values, null, 2))
      errors = {}
    } catch (err) {
      errors = extractErrors(err)
    }
  }
  function extractErrors(err) {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message }
    }, {})
  }

  $: console.log(errors)
</script>

{#if isOpen}
  <FormDialog
    formID='uniqueFormID'
    title={title}
    subTitle={subTitle}
    submitLabel='Submit'
    error={error || errors[name]}
    {loading}
    isDisabled
    on:close={onCancel}
    on:submit={submitHandler}
  >
    <input bind:value={values[name]} />
  </FormDialog>
{:else}
  <p on:click={onOpen}>{value}</p>
{/if}
