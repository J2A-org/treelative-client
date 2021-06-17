<script>
  import Modal from './Layout/Modal.svelte'
  import { activeNodeID, network } from '../stores.js'

  const onActiveNodeClose = () => {
    // clear the activeNodeID in store
    activeNodeID.update(() => null)
    // unselect all nodes
    $network.unselectAll()
  }
</script>

{#if $activeNodeID}
	<Modal on:close="{onActiveNodeClose}">
		<h2 slot="header">
			userID:
			<small>{$activeNodeID}</small>
		</h2>

		<p>BOOB</p>
	</Modal>
{/if}

<style lang="scss">

</style>