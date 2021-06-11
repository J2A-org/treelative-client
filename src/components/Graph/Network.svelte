<script>
import { children } from 'svelte/internal';

  import * as vis from 'vis-network/standalone/esm/vis-network'

  let network
  let container

  export let users
  export let couples

  let nodeUsers = users.map(user => ({
    ...user,
    label: user?.shortName || user?.fullName,
    group: 'individual'
  }))
  let nodeCouples = couples.map(user => ({
    ...user,
    group: 'couple'
  }))
  let edgeCopules = couples.map(couple => (
    [{ from: couple.userOne.id, to: couple.id },
    { from: couple.userTwo.id, to: couple.id }]
  ))
  edgeCopules = [].concat.apply([], edgeCopules)
  let edgeChildren = couples.map(couple => (
    couple.userOne.children.map(children => (
      { from: couple.id, to: children.id }
    ))
  ))
  edgeChildren = [].concat.apply([], edgeChildren)

  // create an array with nodes & edges
  const nodes = new vis.DataSet([...nodeUsers, ...nodeCouples])
  const edges = new vis.DataSet([...edgeCopules, ...edgeChildren])
  // create a network
  const data = { nodes: nodes, edges: edges }

  const options = {
    groups: {
      individual: {
        shape: 'circularImage',
        image: 'https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg',
        color: {
          border: '#12B0CE',
          highlight: {
            border: '#12B0CE',
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
            border: 'transparent',
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
      arrows: { middle: true},
      chosen: false,
      color: '#12B0CE'
    },
  }

  $: if (container) network = new vis.Network(container, data, options)
</script>



<div bind:this={container}></div>

<style lang='scss'>
  div {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
    background: url('https://res.cloudinary.com/arun99-dev/image/upload/v1623402658/background_snqado.jpg');
    background-size: cover;
    background-position: center center;
  }
</style>