<script>
	import Portal from 'svelte-portal'

	import { fade } from 'svelte/transition'

	import { createEventDispatcher, onDestroy } from 'svelte'

	const dispatch = createEventDispatcher()
	const close = () => dispatch('close')

	let modal
	const handleKeydown = e => {
    if (e.key === 'Escape') close()

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*')
      const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0)

      let index = tabbable.indexOf(document.activeElement)
      if (index === -1 && e.shiftKey) index = 0

      index += tabbable.length + (e.shiftKey ? -1 : 1)
      index %= tabbable.length

      tabbable[index].focus()
      e.preventDefault()
    }
  }

	const previouslyFocused = typeof document !== 'undefined' && document.activeElement

	if (previouslyFocused) onDestroy(() => previouslyFocused.focus())
</script>

<svelte:window on:keydown={handleKeydown} />

<Portal target="body">
	<div transition:fade='{{ duration: 500 }}' class='modal-overlay' on:click={close}></div>
	<div class="modal" bind:this={modal}>
		<slot />
	</div>
</Portal>


<style lang='scss'>
	.modal-overlay {
		/* z-index: 51; */
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.8);
	}
	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}
</style>