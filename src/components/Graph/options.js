export default {
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
