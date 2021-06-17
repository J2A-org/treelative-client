<script>
  import * as vis from 'vis-network/standalone/esm/vis-network'
  import { activeNodeID } from '../stores/activeNodeID'

  let network
  let container

  export let users
  export let couples

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
      ...couple.userOne.children.map(children => (
        { from: couple.id, to: children.id }
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

  $: if (container) {
    network = new vis.Network(container, data, options)
    network.on('selectNode', ({ nodes }) => {
      const activeNode = data.nodes.get({
        filter: node => nodes[0] === node.id
      })[0]
      // ignore clicks on couple nodes
      if (activeNode.group === 'individual') {
        // set the active node id in cache
        activeNodeID.update(id => { id = activeNode.id })
        // make all other nodes out of focus
        const nonActiveNodes = data.nodes.get({
          filter: node => nodes[0] !== node.id
        })
        data.nodes.update(nonActiveNodes.map(({ id }) => ({ id, opacity: 0.1 })))
        // hide all edges
        network.edgesHandler.options.hidden = true
      }
    })
  }
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