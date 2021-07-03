<script>
  import { setClient, operationStore, query } from '@urql/svelte'
  import { activeNodeID, showContactDialog } from './stores.js'

  import { GET_NETWORK_DATA } from './graphql/queries/networkData'

  import Graph from './components/Graph.svelte'
  import ProfileCard from './components/ProfileCard.svelte'
  import Loading from './components/Loading.svelte'
  import ErrorDialog from './components/Error/ErrorDialog.svelte'
  import ContactDialog from './components/ContactDialog.svelte'

  import client from './graphql/client'
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
