<script>
	import { createEventDispatcher, onDestroy } from 'svelte'

	const dispatch = createEventDispatcher()
	const close = () => dispatch('close')

	let modal

	const handleKeydown = e => {
    if (e.key === 'Escape') {
      close()
      return
    }

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

	if (previouslyFocused) {
    onDestroy(() => {
      previouslyFocused.focus()
    })
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class='modal-overlay' on:click={close}></div>

<div class='modal' role='dialog' aria-modal='true' bind:this={modal}>
	<!-- <slot name='header'></slot> -->
	<!-- <hr> -->
	<slot></slot>
	<!-- <hr> -->
	<!-- <button on:click={close}>close modal</button> -->
</div>

<style>
	.modal-overlay {
		z-index: 50;
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,0.8);
	}

	.modal {
		z-index: 51;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}

	/* button {
		display: block;
	} */
</style>