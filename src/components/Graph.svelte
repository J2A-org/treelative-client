<script>
  import { onMount } from 'svelte'
  import { network, activeNodeID } from '../stores'
  import * as vis from 'vis-network/standalone/esm/vis-network'

  export let networkData

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
      font: { color: 'hsl(0, 0%, 100%)' }
    },
    edges: {
      hidden: false,
      arrows: { middle: true },
      chosen: false,
      color: 'hsl(190, 84%, 44%)'
    },
    groups: {
      individual: {
        shape: 'circularImage',
        color: {
          border: 'hsl(190, 84%, 44%)',
          highlight: {
            border: 'hsl(190, 84%, 44%)'
          }
        }
      },
      admin: {
        shape: 'circularImage',
        borderWidth: 0,
        size: 52,
        font: { size: 0 },
        color: {
          background: 'transparent',
          border: 'transparent',
          highlight: {
            border: 'transparent'
          }
        }
      },
      couple: {
        shape: 'circularImage',
        size: 18,
        image: 'https://res.cloudinary.com/arun99-dev/image/upload/v1624878835/coupleNode_etlqzn.png',
        color: {
          background: 'transparent',
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
    network.update(() => new vis.Network(container, networkData, options))
    // get the node coordinates
    // const { x: nodeX, y: nodeY } = $network.getPositions(['187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f'])['187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f']
    // zoom on Graph mount
    $network.on('stabilized', () => {
      // stabilized.set(true)
      // $network.focus('187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f')
      $network.moveTo({
        // position: { x: nodeX, y: nodeY },
        scale: 0.8,
        animation: {
          duration: 1000,
          easingFunction: 'easeInCubic'
        }
      })
    })
    // diasable node drag
    const clearSelection = function () { $network.unselectAll() }
    $network.on('dragStart', clearSelection)
    // set activeNodeID on user node click
    $network.on('selectNode', ({ nodes }) => {
      const activeNode = networkData.nodes.find(node => nodes[0] === node.id)
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

<div bind:this={container} />

<style lang='scss'>
  div {
    width: 100%;
    height: 100%;
  }
</style>