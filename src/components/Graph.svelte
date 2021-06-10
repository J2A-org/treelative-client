<script>
  import * as vis from 'vis-network/standalone/esm/vis-network'

  let container;
  let network;

  // export let users = []
  // export let couples = []

  // create an array with nodes
  const nodes = new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ]);

  // create an array with edges
  const edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
  ]);

  // create a network
  const data = {
    nodes: nodes,
    edges: edges,
  };

  const options = {};

  $: if (container) {
    network = new vis.Network(container, data, options);
  }
</script>



<div bind:this={container}></div>

<style lang="scss">
  div {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
  }
</style>