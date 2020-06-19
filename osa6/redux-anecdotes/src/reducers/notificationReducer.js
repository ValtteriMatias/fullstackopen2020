const notificationReducer = (state = '', action) => {
    switch(action.type) {
      case 'VOTED':
        return `Voted: ${action.data.content}`
      case 'CREATED':
        return `Created: ${action.data.content}`
      case 'EMPTY':
        return ''
      default:
        return state
    }
  }

  export const voteNotification = (content) => {
    return {
      type: 'VOTED',
      data: { content }
    }
  }

  export const createNotification = (content) => {
    return {
      type: 'CREATED',
      data: { content }
    }
  }

  export const emptyNotification = () => {
    return {
      type: 'EMPTY'
    }
  }


  
  export default notificationReducer