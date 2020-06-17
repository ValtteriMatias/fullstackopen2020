const notificationReducer = (state = 'Lorem ipsum', action) => {
    switch(action.type) {
      case 'LOREM':
        console.log()
      default:
        return state
    }
  }
  
  
  export default notificationReducer