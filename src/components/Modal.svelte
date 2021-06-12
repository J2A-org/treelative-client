<script>
  let isOpen = false
</script>

<div
  class={isOpen ? 'open-container': 'close-container'}
  on:click={() => isOpen = !isOpen}
>
  <details>
    <summary>
      <div class='trigger'>
        Show Modal
      </div>
      <div class='modal-overlay'></div>
    </summary>
    <div class='modal'>
      <div class='modal-title'>
        <h1>Title</h1>
      </div>
      <div class='modal-content'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </div>
    </div>
  </details>
</div>

<style lang='scss'>
  .close-container {
    width: 100vw;
    position: absolute;
    z-index: 10;
  }

  .open-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 10;
  }

  .trigger {
    background: white;
    &:hover {
      background-color: rgb(190, 190, 190);
    }
  }

  .modal {
    width: 30em;
    max-height: 90vh;
    background: #ffffff;
    border-radius: 0.5em;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: left;

    .modal-title {
      color: #111827;
      padding: 1.5em 2em;
      position: relative;
      h1 {
        font-size: 1.25rem;
      }
    }

    .modal-content {
      border-top: 1px solid #e0e0e0;
      padding: 2em;;
    }
  }

  .modal-overlay {
    transition: opacity 0.2s ease-out;
    pointer-events: none;
    background: rgba(#0f172a, 0.8);
    position: fixed;
    opacity: 0;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;

    details[open] & {
      pointer-events: all;
      opacity: 0.5;
    }
  }

  details {
    summary {
      list-style: none;
    }
  }
</style>
