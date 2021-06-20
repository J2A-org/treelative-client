<script>
  import { getContext } from 'svelte'
  const user = getContext('user')

  import { scale } from 'svelte/transition'

  import Death from './Slider/Death.svelte'
  import Birth from './Slider/Birth.svelte'
</script>

<div>
  <div in:scale='{{ delay: 1200, duration: 500, opacity: 0.5, start: 0 }}'/>
  <div in:scale='{{ delay: 1250, duration: 500, opacity: 0.5, start: 0 }}' id='smaller'/>
  {#if user.dateOfDeath}
    <Death />
  {:else if user.dateOfBirth}
    <Birth />
  {/if}
</div>

<style lang='scss'>
  div {
    div {
      width: 296px;
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
    #smaller {
      width: 278px;
    }
  }
</style>