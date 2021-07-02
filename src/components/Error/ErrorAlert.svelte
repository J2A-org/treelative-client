<script>
  import { fade } from 'svelte/transition'

  export let error
</script>

<div transition:fade='{{ duration: 250 }}'>
  {error?.message || error}
</div>

<style lang="scss">
  div {
    margin: 0px;
    padding: 15px;
    text-align: center;
    background: hsla(0, 100%, 50%, 0.5);
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
  }
</style>
