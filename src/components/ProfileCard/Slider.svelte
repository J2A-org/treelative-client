<script>
  export let user

  import { setContext } from 'svelte'
  import { scale } from 'svelte/transition'

  import Carousel from 'svelte-carousel'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
  import Current from './Slider/Current.svelte'

  setContext('user', user)

  const animation = { delay: 1200, duration: 500, opacity: 0.5, start: 0 }
</script>

<div>
  <div in:scale={animation}/>
  <div in:scale={{ ...animation, delay: animation.delay + 500 }} />
</div>

<Carousel>
  {#if user.dateOfDeath} <Death /> {/if}
  <Birth />
  <Current />
</Carousel>

<style lang='scss'>
  div {
    div:first-child {
      width: 270px;
      display: flex;
      justify-content: space-between;
      margin-top: -70px;
    }
    div:first-child, div:nth-child(2) {
      width: 300px;
      height: 284px;
      position: absolute;
      margin-top: 28px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: rgba(255, 255, 255, 0.20);
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.20);
      border-radius: 20px;
    }
    div:nth-child(2) {
      width: 285px;
    }
  }
</style>