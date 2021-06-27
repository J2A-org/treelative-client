<script>
  export let user

  import { setContext, onMount } from 'svelte'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
  import Current from './Slider/Current.svelte'

  setContext('user', user)

  let stack
  onMount(() => [...stack.children].reverse().forEach(i => stack.append(i)))
  const swap = async (e, direction) => {
    e.target.disabled = true
    const card = [...stack.children].slice(-1).pop()
    if (direction === 'left') {
      card.style = 'transform: rotate(-10deg) translateX(-420px) translateY(-150px); transition: 0.4s ease-in-out;'
    } else {
      card.style = 'transform: rotate(10deg) translateX(160px) translateY(-150px); transition: 0.4s ease-in-out;'
    }
    await new Promise(resolve => setTimeout(resolve, 400))
    card.style = 'transform: translateX(-130px) translateY(0px) scale(0.8); z-index: -1; transition: 0.4s; ease-in-out'
    setTimeout(() => {
      card.style = ''
      stack.prepend(card)
    }, 200)
    await new Promise(resolve => setTimeout(resolve, 330))
    e.target.disabled = false
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
  {#if user.dateOfDeath} <div><Death/></div> {/if}
  <div><Birth/></div>
  <div><Current/></div>
  <div><Birth/></div>
  <!-- <div><Relations/></div> -->
  <!-- <div><Social/></div> -->

</div>
<button on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:click={swap} />

<style lang='scss'>
  div {
    color: #26114D;
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
      box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.20);
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
  button {
    width: 260px;
    height: 284px;
    position: sticky;
    border-radius: 20px;
    background: none;
    border: 0px;
  }
</style>