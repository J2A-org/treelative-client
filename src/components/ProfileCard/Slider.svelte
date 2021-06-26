<script>
  export let user

  import { setContext } from 'svelte'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
  import Current from './Slider/Current.svelte'

  setContext('user', user)

  let stack
  const next = async (e) => {
    e.target.disabled = true
    const card = [...stack.children].slice(-1).pop()
    card.style = 'transform: rotate(10deg) translateX(160px) translateY(-50px); transition: 0.4s ease-in-out;'
    await new Promise(resolve => setTimeout(resolve, 400))
    card.style = 'transform: translateX(-130px) translateY(0px) scale(0.8); z-index: -1; transition: 0.4s; ease-in-out'
    setTimeout(() => {
      card.style = ''
      stack.prepend(card)
    }, 330)
    await new Promise(resolve => setTimeout(resolve, 330))
    e.target.disabled = false
  }
  const previous = async (e) => {
    e.target.disabled = true
    const card = [...stack.children].slice(0, 1).pop()
    card.style = 'transform: rotate(-10deg) translateX(-420px) translateY(-50px) scale(0.8); transition: 0.4s ease-in-out;'
    await new Promise(resolve => setTimeout(resolve, 400))
    card.style = 'transform: translateX(-130px) translateY(0px) scale(1); z-index: 1; transition: 0.5s; ease-in-out'
    setTimeout(() => {
      card.style = ''
      stack.append(card)
    }, 430)
    await new Promise(resolve => setTimeout(resolve, 430))
    e.target.disabled = false
  }
</script>

<div bind:this={stack}>
  {#if user.dateOfDeath} <div><Death/></div> {/if}
  <div><Birth/></div>
  <div><Current/></div>
  <div><Birth/></div>
</div>
<div>
  <button on:click={previous}/>
  <button on:click={next}/>
</div>

<style lang='scss'>
  div {
    color: #26114D;
    div {
      width: 260px;
      height: 284px;
      position: absolute;
      left: 50%;
      display: grid;
      placeItems: center;
      transition: transform 200ms;
      background-image: url('images/sliderBg.jpg');
      border-radius: 20px;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.30);
    }
    div:nth-last-child(n + 4) {
      transform: translate(-50%);
    }
    div:nth-last-child(3) {
      transform: translate(-55%);
    }
    div:nth-last-child(2) {
      transform: translate(-45%);
    }
    div:nth-last-child(1) {
      transform: translate(-50%);
    }
  }
  div {
    button {
      width: 130px;
      height: 284px;
      position: sticky;
      border-radius: 20px;
      background: none;
      border: 0px;
    }
    button:last-child {
      transform: translateX(0%);
    }
  }
</style>