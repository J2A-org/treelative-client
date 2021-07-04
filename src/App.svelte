<script>
  import { setClient, operationStore, query } from '@urql/svelte'
  import { activeNodeID, showContactDialog } from '@app/utils/stores'

  import { GET_NETWORK_DATA } from '@app/graphql/queries/networkData'

  import Graph from '@app/components/Graph.svelte'
  import ProfileCard from '@app/components/ProfileCard.svelte'
  import Loading from '@app/components/Loading.svelte'
  import ErrorDialog from '@app/components/Error/ErrorDialog.svelte'
  import ContactDialog from '@app/components/ContactDialog.svelte'

  import client from '@app/graphql/client'
  setClient(client)

  const queryNetworkData = operationStore(GET_NETWORK_DATA)
  query(queryNetworkData)
</script>

{#if $queryNetworkData.fetching}
  <Loading />
{:else if $queryNetworkData.error}
  <ErrorDialog errorMessage={queryNetworkData.error.message} />
{:else}
  {#if $activeNodeID}
    <ProfileCard />
  {/if}
  {#if $showContactDialog}
    <ContactDialog />
  {/if}
  <Loading />
  <Graph networkData={$queryNetworkData.data.getNetworkData} />
{/if}
