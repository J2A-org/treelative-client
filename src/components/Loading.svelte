<script>
  import { fade } from 'svelte/transition'
</script>

<div in:fade='{{ duration: 500 }}' out:fade='{{ duration: 500 }}'>
  <img src='/images/loading.gif' alt='loading' />
</div>

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 400px;
      object-fit: contain;
    }
  }
</style>