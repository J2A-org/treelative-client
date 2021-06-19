export default (users, couples) => {
  const nodeUsers = users.map(user => ({
    ...user,
    label: user?.shortName || user?.fullName,
    group: 'individual',
    image: user.avatar
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

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers, ...nodeCouples]
  const edges = [...nodeEdges]

  return { nodes, edges }
}
