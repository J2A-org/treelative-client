<script>
  export let user

  import { onMount } from 'svelte'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
  import Current from './Slider/Current.svelte'

  let stack
  onMount(() => {
    // reverse the slides
    // Shallow copy to array: get a `reverse` method.
    const arr = Array.from(stack.childNodes)
    // `reverse` works in place but conveniently returns the array for chaining.
    arr.reverse()
    // `append` appends all its arguments in the order they are given.
    // An already existing parent-child relationship (as in this case) is "overwritten",
    // i.e. the node to append is cut from and re-inserted into the DOM.
    stack.append(...arr)
  })

  const slides = [Birth, Current]
  if (user.dateOfDeath) {
    slides.unshift(Death)
  }

  let isCardInMotion = false
  let currentCardIdx = 0
  const swap = async (e, direction) => {
    isCardInMotion = true
    currentCardIdx = (currentCardIdx + 1) % slides.length
    // get the current card
    const card = [...stack.children].pop()

    // perform fancy animation on current card
    if (direction === 'left') {
      card.style = `
        transform:
          rotate(-10deg)
          translateX(-420px)
          translateY(-150px);
        transition: 0.4s ease-in-out;
      `
    } else {
      card.style = `
        transform:
          rotate(10deg)
          translateX(160px)
          translateY(-150px);
        transition: 0.4s ease-in-out;
      `
    }
    await new Promise(resolve => setTimeout(resolve, 400))

    card.style = `
      transform:
        translateX(-130px)
        translateY(0px)
        scale(0.8);
      z-index: -1;
      transition: 0.4s ease-in-out;
    `
    await new Promise(resolve => setTimeout(resolve, 330))

    card.style = ''
    stack.prepend(card)

    isCardInMotion = false
  }

  let xDown = null
  let yDown = null
  function getTouches (e) {
    return e.touches || e.originalEvent.touches
  }

  function handleTouchStart (e) {
    const firstTouch = getTouches(e)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }

  function handleTouchMove (e) {
    if (!xDown || !yDown) {
      return
    }
    const xUp = e.touches[0].clientX
    const yUp = e.touches[0].clientY
    const xDiff = xDown - xUp
    const yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        swap(e, 'left')
      } else {
        swap(e, 'right')
      }
    }

    xDown = null
    yDown = null
  }
</script>

<div bind:this={stack}>
  {#each slides as Slide, idx}
    <!-- only enable click events on the first card and if any card is not in motion-->
		<div
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:click={swap}
      class:inactive={idx !== currentCardIdx || isCardInMotion}
    >
      <Slide {user} />
    </div>
	{/each}
</div>

<style lang='scss'>
  div {
    color: hsl(261, 64%, 18%);
    div {
      width: 260px;
      height: 284px;
      position: absolute;
      left: 50%;
      bottom: 25px;
      display: grid;
      transition: transform 200ms;
      background-image: url('/images/sliderBg.jpg');
      border-radius: 20px;
      box-shadow: 0px -3px 5px hsla(0, 0%, 0%, 0.20);
    }
    .inactive {
      pointer-events: none;
    }
    div:nth-last-child(n + 4) {
      transform: translate(-50%, -15px) scale(0.8);
    }
    div:nth-last-child(3) {
      transform: translate(-50%, -30px);
    }
    div:nth-last-child(2) {
      transform: translate(-50%, -15px);
    }
    div:nth-last-child(1) {
      transform: translate(-50%);
    }
  }
</style>