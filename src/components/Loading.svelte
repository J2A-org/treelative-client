<script>
  import { fade } from 'svelte/transition'
  import { network } from '../stores.js'

  let active = true

  $: if ($network) {
    $network.on('stabilized', () => {
      active = false
    })
  }
</script>

<div in:fade='{{ duration: 500 }}' out:fade='{{ duration: 500 }}' class:active>
  <img src='/images/loading.gif' alt='loading' />
</div>

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    display: none;
    align-items: center;
    justify-content: center;
    img {
      width: 400px;
      object-fit: contain;
    }
  }
  .active {
    display: flex;
  }
</style>