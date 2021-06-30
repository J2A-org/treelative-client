<script>
  import EditableInputDialog from '../Input/EditableInputDialog.svelte'

  import { string } from 'yup'

  import { operationStore, mutation } from '@urql/svelte'
  import { UPDATE_USER_FULL_NAME } from '../../graphql/mutations/users'

  export let user
  let isLoading = false

  const updateFullNameStore = operationStore(UPDATE_USER_FULL_NAME)
  const updateFullNameMutation = mutation(updateFullNameStore)

  const handleSubmit = fullName => {
    isLoading = true
    console.log('SUBMIT', fullName)
    const variables = { userID: user.id, input: { fullName } }
    console.log(variables)
    // updateFullNameMutation(variables)
    //   .then(() => {
    //     isLoading = false
    //   })
  }
</script>

<EditableInputDialog
  title='Edit Full Name'
  subTitle={user.fullName}
  name='fullName'
  value={user.fullName || ''}
  onSubmit={handleSubmit}
  validation={string().required()}
  loading={isLoading}
  error={$updateFullNameStore.error}
  notification='Successfully updated the full name'
/>