<script>
  import { fly, scale } from 'svelte/transition'

  const animation = { delay: 1600, y: -25, duration: 600 }

  export let user
</script>

<div in:scale='{{ delay: animation.delay - 300, duration: animation.duration - 100, opacity: 0.5, start: 0 }}'>
  <h1 in:fly='{{ ...animation }}'>Date Of Death</h1>
  <h1 in:fly='{{ ...animation, delay: animation.delay + 100 }}'>{user.dateOfDeath.slice(0, 10).replaceAll('-', '/')}</h1>
  <img
    src='/images/tombstone.svg'
    alt='tombstone'
    in:fly='{{ ...animation, delay: animation.delay + 200 }}'
  />
  <h1 in:fly='{{ ...animation, delay: animation.delay + 300 }}'>Death Location</h1>
  {#if !user.deathLocation}
    <h1 in:fly='{{ ...animation, delay: animation.delay + 400 }}'>Unavailable</h1>
  {:else}
    <h1 in:fly='{{ ...animation, delay: animation.delay + 400 }}'>{user.deathLocation.terms.slice(-3).map(({ value }) => value).join(', ')}</h1>
  {/if}
</div>

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1:first-child, h1:nth-child(4) {
      margin-bottom: 0px;
      font-weight: 100;
      font-size: 7px;
      line-height: 8px;
      user-select: none;
    }
    h1:nth-child(4) { margin-top: 15px; }
    h1:nth-child(2), h1:nth-child(5) {
      margin: 0px;
      width: 85%;
      text-align: center;
      font-size: 18px;
      line-height: 22px;
    }
    img {
      width: 128px;
      height: 128px;
      margin-top: 15px;
      filter: drop-shadow(0px 3px 5px hsla(0, 0%, 0%, 0.25));
    }
  }
</style>