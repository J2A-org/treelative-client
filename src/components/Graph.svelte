<script>
  export let nodesAndEdges

  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'

  import { network, activeNodeID } from '../stores'

  import * as vis from 'vis-network/standalone/esm/vis-network'

  const options = {
    groups: {
      individual: {
        shape: 'circularImage',
        brokenImage: 'https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg',
        color: {
          border: '#12B0CE',
          highlight: {
            border: '#12B0CE'
          }
        }
      },
      couple: {
        shape: 'circularImage',
        size: 10,
        image: 'https://freeiconshop.com/wp-content/uploads/edd/heart-flat.png',
        color: {
          border: 'transparent',
          highlight: {
            border: 'transparent'
          }
        }
      }
    },
    nodes: {
      borderWidth: 2,
      size: 25,
      font: { color: '#ffffff' }
    },
    edges: {
      hidden: false,
      arrows: { middle: true },
      chosen: false,
      color: '#12B0CE'
    }
  }

  let container

  onMount(() => {
    // set network in store
    network.update(() => new vis.Network(container, nodesAndEdges, options))
    $network.on('selectNode', ({ nodes }) => {
      const activeNode = nodesAndEdges.nodes.find(node => nodes[0] === node.id)
      if (activeNode.group === 'individual') activeNodeID.update(() => activeNode.id)
    })
  })
</script>

<div transition:fade='{{ delay: 500, duration: 1000 }}' bind:this={container} />

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
  }
</style>