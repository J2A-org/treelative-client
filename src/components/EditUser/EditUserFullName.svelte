<script>
  import EditableInputDialog from '../Input/EditableInputDialog.svelte'

  import { string } from 'yup'

  import { operationStore, mutation } from '@urql/svelte'
  import { UPDATE_USER_FULL_NAME } from '../../graphql/mutations/users'

  export let user

  const updateFullNameStore = operationStore(UPDATE_USER_FULL_NAME)
  const updateFullNameMutation = mutation(updateFullNameStore)

  const handleSubmit = fullName => {
    const variables = { userID: user.id, input: { fullName } }
    return updateFullNameMutation(variables)
  }
</script>

<EditableInputDialog
  title='Edit Full Name'
  subTitle={user.fullName}
  name='fullName'
  value={user.fullName || ''}
  onSubmit={handleSubmit}
  validation={string().required()}
  error={$updateFullNameStore.error}
  notification='Successfully updated the full name'
>
  <slot slot="trigger" name="trigger" />
</EditableInputDialog>