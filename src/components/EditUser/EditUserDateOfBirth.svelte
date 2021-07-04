<script>
  import EditableDateDialog from '../Input/EditableDateDialog.svelte'

  import { operationStore, mutation } from '@urql/svelte'
  import { UPDATE_USER_DATE_OF_BIRTH } from '@app/graphql/mutations/users'

  export let user

  const updateDateOfBirthStore = operationStore(UPDATE_USER_DATE_OF_BIRTH)
  const updateDateOfBirthMutation = mutation(updateDateOfBirthStore)

  const handleSubmit = dateOfBirth => {
    const variables = { userID: user.id, input: { dateOfBirth } }
    return updateDateOfBirthMutation(variables)
  }

  console.log("ADA", user.dateOfBirth)
</script>

<EditableDateDialog
  title='Edit Date of Birth'
  subTitle={user.fullName}
  value={user.dateOfBirth}
  onSubmit={handleSubmit}
  error={$updateDateOfBirthStore.error}
  notification='Successfully updated the full name'
>
  <slot slot="trigger" name="trigger" />
</EditableDateDialog>