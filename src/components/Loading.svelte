<script>
  import { fade } from 'svelte/transition'

  import loading from '../images/loading.gif'
</script>

<div out:fade='{{ duration: 500 }}'>
  <img src={loading} alt='loading' />
</div>

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
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