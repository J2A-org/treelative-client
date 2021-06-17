<script>
  import Modal from './Layout/Modal.svelte'
  import { activeNodeID } from '../stores.js'

  const onActiveNodeClose = () => {
    // clear the activeNodeID in store
    activeNodeID.update(() => null)
    // unselect all nodes
    // network.unselectAll()
    // // show all edges
    // network.edgesHandler.options.hidden = false
    // // un-blur all nodes
    // nodes.update(nodes.map(({ id }) => ({ id, opacity: 1 })))
  }
</script>

{#if $activeNodeID}
	<Modal on:close="{onActiveNodeClose}">
		<h2 slot="header">
			modal
			<small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
		</h2>

		<ol class="definition-list">
			<li>of or relating to modality in logic</li>
			<li>containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy</li>
			<li>of or relating to a musical mode</li>
			<li>of or relating to structure as opposed to substance</li>
			<li>of, relating to, or constituting a grammatical form or category characteristically indicating predication</li>
			<li>of or relating to a statistical mode</li>
		</ol>

		<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
	</Modal>
{/if}

<style lang="scss">

</style>