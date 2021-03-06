var timer;

const notificationReducer = (state = null    , action) => {
    switch(action.type) {
      case 'EMPTY':
        return null
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
        clearTimeout(timer)
        timer = setTimeout(() => {
        dispatch(emptyNotification())
      }, time*1000) 

  }

}
 
export default notificationReducer