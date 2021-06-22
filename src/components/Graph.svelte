<script>
  export let nodesAndEdges

  import { fade } from 'svelte/transition'
  let animation = { delay: 500, duration: 1000 }

  import { onMount } from 'svelte'

  import { network } from '../stores'
  import { activeNodeID } from '../stores.js'

  import options from './Graph/options'

  import * as vis from 'vis-network/standalone/esm/vis-network'

  let container

  onMount(() => {
    // set network in store
    network.update(() => new vis.Network(container, nodesAndEdges, options))
    $network.on('selectNode', ({ nodes }) => {
      const activeNode = nodesAndEdges.nodes.filter(node => nodes[0] === node.id)[0]
      if (activeNode.group === 'individual') activeNodeID.update(() => activeNode.id)
    })
  })
</script>

<div transition:fade='{{ ...animation }}' bind:this={container} />

<style lang='scss'>
  div { width: 100%; height: 100%; }
</style>