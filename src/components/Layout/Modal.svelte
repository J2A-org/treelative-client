<script>
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

<svelte:window on:keydown={handleKeydown}/>
<div transition:fade='{{ duration: 500 }}' class='modal-overlay' on:click={close}></div>
<div bind:this={modal}>
	<slot></slot>
</div>

<style>
	.modal-overlay {
		z-index: 50;
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,0.8);
	}
</style>