<script>
  import client from './graphql/client'
  import { setClient } from '@urql/svelte'
  setClient(client)

  import Search from "./components/Search.svelte"
  import Graph from "./components/Graph.svelte"

</script>

<div class="main">
  <h1>Graph</h1>
  <Graph />
  <h1>Search</h1>
  <Search />
</div>

<style lang="scss">
  .main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin: 0;
    font-size: 3rem;
    color: rgb(255, 255, 255);
    margin: 20px 0px;
  }
</style>
