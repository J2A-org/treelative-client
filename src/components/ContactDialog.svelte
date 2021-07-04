<script>
  import { showContactDialog } from '@app/utils/stores'

  import { scale } from 'svelte/transition'

  import Modal from '@app/components/Layout/Modal.svelte'

  import Fa from 'svelte-fa'
  import { faIdCard } from '@fortawesome/free-solid-svg-icons'
</script>

<Modal on:close={() => showContactDialog.update(() => false)} modalOveriteStyle="padding: 0; background: transparent;">
  <div class="container" transition:scale='{{ duration: 500, opacity: 0.5, start: 0 }}'>
    <div class="contact-icon">
      <Fa icon={faIdCard} />
    </div>
    <h2 class="content">
      SHOW ARUN & JANA CONTACT INFO
    </h2>
  </div>
</Modal>

<style lang='scss'>
  .container {
    max-width: 20rem;
    border-radius: 1.2rem;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: hsl(0, 0%, 75%) solid 0.2em;
    padding: 3.5em 2em;
    background: hsl(225, 36%, 4%);
    color: white;
    @media only screen and (max-width: 20rem) {
      width: 100vw;
      padding: 3.5em 1em;
    }
  }
  .contact-icon {
    display: grid;
    place-items: center;
    font-size: 2em;
    height: 2em;
    width: 2em;
    border-radius: 50%;
    color: white;
    @media only screen and (max-width: 20rem) {
      font-size: 1.5em;
    }
  }
  .content {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 0.3em;
  }
</style>
