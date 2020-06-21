const notificationReducer = (state = '', action) => {
    switch(action.type) {
      case 'EMPTY':
        return ''
      case 'SET':
        return action.data.content

      default:
        return state
    }
  }

  export const emptyNotification = () => {
    return {
      type: 'EMPTY'
    }
  }

  export const setNotification = (content, time) => {
    return async dispatch => {
       dispatch({
        type: 'SET',
        data: { content }
      })
        setTimeout(() => {
        dispatch(emptyNotification())
      }, time*1000)

  }

}

  
  export default notificationReducer