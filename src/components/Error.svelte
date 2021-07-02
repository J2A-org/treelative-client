<script>
  export let errorMessage

  import { scale } from 'svelte/transition'

  import Modal from './Layout/Modal.svelte'

  const animation = { delay: 1050, y: -25, duration: 500 }
</script>

<Modal modalOveriteStyle="padding: 0; background: transparent;">
  <div transition:scale='{{ duration: animation.duration, opacity: 0.5, start: 0 }}'>
    <img src='/images/error.png' alt='error indicator' />
    <h1>Oops! Something went wrong!</h1>
    <p>{errorMessage}</p>
    <button on:click={() => window.location.reload()}>Reload</button>
  </div>
</Modal>

<style lang='scss'>
  div {
    max-width: 350px;
    border-radius: 20px;
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: #fff solid 2px;
    padding: 50px 20px;
    background: hsl(225, 36%, 4%);
    color: white;
    @media only screen and (max-width: 400px) {
      width: 100vw;
      padding: 50px 10px;
    }
    img {
      width: 100px;
      object-fit: contain;
    }
    h1 {
      text-align: center;
      margin-top: 30px;
    }
    P {
      text-align: center;
    }
    button {
      width: 200px;
      height: 50px;
      border: none;
      margin-top: 30px;
      background: linear-gradient(hsl(337, 98%, 61%), hsl(16, 58%, 72%) 100%);
      border-radius: 20px;
      color: hsl(349, 100%, 97%);
      font-size: 20px;
    }
  }
</style>