<script>
  export let nodesAndEdges

  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'

  import { network, activeNodeID, stabilized } from '../stores'

  import * as vis from 'vis-network/standalone/esm/vis-network'

  const options = {
    // layout: {
    //   // randomSeed: 1,
    //   improvedLayout: true,
    //   hierarchical: {
    //     direction: 'UD',
    //     sortMethod: 'directed',
    //     shakeTowards: 'roots',
    //     parentCentralization: true
    //   }
    // },
    interaction: {
      // zoomSpeed: 0.3,
      keyboard: true
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
    },
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
      admin: {
        shape: 'circularImage',
        brokenImage: 'https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg',
        borderWidth: 5,
        color: {
          border: '#FFE503',
          highlight: {
            border: '#FFE503'
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
    }
  }

  let container

  onMount(() => {
    // set network in store
    network.update(() => new vis.Network(container, nodesAndEdges, options))
    $network.on('stabilized', async () => {
      await $network.moveTo({ scale: 0.8 })
      stabilized.set(true)
    })
    // set activeNodeID on user node click
    $network.on('selectNode', ({ nodes }) => {
      const activeNode = nodesAndEdges.nodes.find(node => nodes[0] === node.id)
      if (activeNode.group !== 'couple') activeNodeID.update(() => activeNode.id)
    })
    // limit the zoom
    const MIN_ZOOM = 0.3
    const MAX_ZOOM = 2.0
    let lastZoomPosition = { x: 0, y: 0 }
    $network.on('zoom', () => {
      const scale = $network.getScale()
      if (scale <= MIN_ZOOM) {
        $network.moveTo({
          position: lastZoomPosition,
          scale: MIN_ZOOM
        })
      } else if (scale >= MAX_ZOOM) {
        $network.moveTo({
          position: lastZoomPosition,
          scale: MAX_ZOOM
        })
      } else {
        lastZoomPosition = $network.getViewPosition()
      }
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