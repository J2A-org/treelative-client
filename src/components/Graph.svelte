<script>
  import { onMount } from 'svelte'

  import { network, networkData } from '../stores.js'

  import * as vis from 'vis-network/standalone/esm/vis-network'
  import { activeNodeID } from '../stores.js'

  export let users
  export let couples

  let container

  const nodeUsers = users.map(user => ({
    ...user,
    label: user?.shortName || user?.fullName,
    group: 'individual'
  }))

  const nodeCouples = couples.map(user => ({
    ...user,
    group: 'couple'
  }))

  const nodeEdges = couples.map(couple => (
    [
      { from: couple.userOne.id, to: couple.id },
      { from: couple.userTwo.id, to: couple.id },
      ...couple.userOne.children.map(child => (
        { from: couple.id, to: child.id }
      ))
    ]
  )).flat()

  // create an array with nodes & edges
  const nodes = new vis.DataSet([...nodeUsers, ...nodeCouples])
  const edges = new vis.DataSet([...nodeEdges])
  // create a network
  const data = { nodes, edges }

  const options = {
    groups: {
      individual: {
        shape: 'circularImage',
        image: 'https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg',
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

  onMount(() => {
    networkData.update(() => data)
    const localNetwork = new vis.Network(container, data, options)
    localNetwork.on('selectNode', ({ nodes }) => {
      const activeNode = data.nodes.get({
        filter: node => nodes[0] === node.id
      })[0]
      // ignore clicks on couple nodes
      if (activeNode.group === 'individual') {
        // set the active node id in cache
        activeNodeID.update(() => activeNode.id)
        // // make all other nodes out of focus
        // const nonActiveNodes = data.nodes.get({
        //   filter: node => nodes[0] !== node.id
        // })
        // data.nodes.update(nonActiveNodes.map(({ id }) => ({ id, opacity: 0.1 })))
        // // hide all edges
        // localNetwork.edgesHandler.options.hidden = true
      }
    })
    // add the network to store
    network.update(() => localNetwork)
  })
</script>

<div bind:this={container} />

<style lang="scss">
  div {
    width: 100vw;
    height: 100vh;
    background: url('https://res.cloudinary.com/arun99-dev/image/upload/v1623402658/background_snqado.jpg');
    background-size: cover;
    background-position: center center;
  }
</style>