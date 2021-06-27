<script>
  export let user

  import { setContext, onMount } from 'svelte'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
  import Current from './Slider/Current.svelte'

  setContext('user', user)

  let stack
  onMount(() => [...stack.children].reverse().forEach(i => stack.append(i)))
  const next = async (e) => {
    e.target.disabled = true
    const card = [...stack.children].slice(-1).pop()
    card.style = 'transform: rotate(10deg) translateX(160px) translateY(-150px); transition: 0.4s ease-in-out;'
    await new Promise(resolve => setTimeout(resolve, 400))
    card.style = 'transform: translateX(-130px) translateY(0px) scale(0.8); z-index: -1; transition: 0.4s; ease-in-out'
    setTimeout(() => {
      card.style = ''
      stack.prepend(card)
    }, 200)
    await new Promise(resolve => setTimeout(resolve, 330))
    e.target.disabled = false
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
<button on:click={next}/>

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
      transform: translate(-50%, -15px);
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
    cursor: grab;
  }
</style>