<script context="module">
	let modal
</script>

<script>
	import Portal from 'svelte-portal'

	import { scale } from 'svelte/transition'

	import Fa from 'svelte-fa'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'

	import { createEventDispatcher, onDestroy } from 'svelte'

	export let modalOveriteStyle = ''

	const dispatch = createEventDispatcher()
	const close = () => dispatch('close')

	const handleKeydown = e => {
    if (e.key === 'Escape') close()

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*')
      const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0)

      let index = tabbable.indexOf(document.activeElement)
      if (index === -1 && e.shiftKey) index = 0

      index += tabbable.length - (e.shiftKey ? -1 : 1)
      index %= tabbable.length

      tabbable[index].focus()
      e.preventDefault()
    }
  }

	const previouslyFocused = typeof document !== 'undefined' && document.activeElement

	if (previouslyFocused) onDestroy(() => previouslyFocused.focus())
</script>

<svelte:window on:keydown={handleKeydown} />

<Portal>
	<div class='modal-overlay' on:click={close}></div>
	<div transition:scale class="modal" bind:this={modal} style={modalOveriteStyle}>
		<button class="close-button" on:click={close}>
    	<div class="close-icon">
      	<Fa icon={faTimes} />
			</div>
		</button>
		<slot />
	</div>
</Portal>


<style lang='scss'>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: hsla(0, 0%, 0%, 0.8);
	}
	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: fit-content;
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 0.5em 1em;
		border-radius: 1em;
		background: white;
	}
	.close-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0.5rem;
    top: 0.5rem;
    padding: 0.5em;
    width: 2.2rem;
    height: 2.2rem;
    cursor: pointer;
    background-color: transparent;
    border-radius: 0.5em;
    &:hover, :focus {
      background-color: hsla(0, 100%, 70%, 0.1);
    }
    &:active {
      background-color: hsla(0, 100%, 70%, 0.2);
    }
  }
  .close-icon {
    font-size: 1.5em;
    color: hsl(0, 100%, 70%);
  }
</style>