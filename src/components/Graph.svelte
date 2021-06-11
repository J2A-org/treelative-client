<script>
  import * as vis from 'vis-network/standalone/esm/vis-network'

  import { QUERY_USER } from '../graphql/queries/users'
  import { QUERY_COUPLE } from '../graphql/queries/couples'
  import { operationStore, query } from '@urql/svelte'
  
  const queryUser = operationStore(QUERY_USER)
  const queryCouple = operationStore(QUERY_COUPLE)
  
  query(queryUser)
  query(queryCouple)

  let network
  let container

  let users = []
  let couples = []
  let relations = []

  let nodeUsers = users.map(user => ({
    ...user,
    label: user?.shortName || user?.fullName,
    group: 'individual'
  }))
  let nodeCouples = couples.map(user => ({
    ...user,
    group: 'couple'
  }))


  for (const couple of queryCouple.data.users) {
    relations = [
      ...relations,
      { from: couple.userOne.id, to: couple.id },
      { from: couple.userTwo.id, to: couple.id }
    ]
  }

  // create an array with nodes & edges
  const nodes = new vis.DataSet([...users, ...couples])
  const edges = new vis.DataSet([...relations])
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