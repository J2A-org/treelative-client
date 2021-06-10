<script>
  import client from './graphql/client'
  import { setClient } from '@urql/svelte'
  setClient(client)

  import Search from "./components/Search.svelte"
  // import Example from "./components/Example.svelte"
</script>

<div class="main">
  <h1>Treelative Client</h1>
  <!-- <Example /> -->
  <Search />
</div>

<style lang="scss">
  .main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin: 0;
    font-size: 3rem;
  }
</style>
