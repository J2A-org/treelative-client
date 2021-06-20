<script>
  import { onMount } from 'svelte'

  import { network } from '../stores'
  import options from './Graph/options'

  import * as vis from 'vis-network/standalone/esm/vis-network'
  import { activeNodeID } from '../stores.js'

  export let nodesAndEdges

  let container

  onMount(() => {
    // set network in store
    network.update(() => new vis.Network(container, nodesAndEdges, options))
    $network.on('selectNode', ({ nodes }) => {
      const activeNode = nodesAndEdges.nodes.filter(node => nodes[0] === node.id)[0]
      // ignore clicks on couple nodes
      if (activeNode.group === 'individual') {
        // set the active node ID in store
        activeNodeID.update(() => activeNode.id)
      }
    })
  })
</script>

<div bind:this={container} />

<style lang='scss'>
  div {
    width: 100vw;
    height: 100vh;
    background: url('bg.jpg');
    background-size: cover;
    background-position: center center;
  }
</style>