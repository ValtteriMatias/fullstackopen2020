import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anekdoteToChange = state.find(n => n.id === id)
      const changedAnekdote = { 
        ...anekdoteToChange, 
        votes: anekdoteToChange.votes + 1
      }
      return state.map(anekdote =>
        anekdote.id !== id ? anekdote : changedAnekdote

      )
      case 'CREATE':
        const palautus = [...state, action.data.newblog]
        return palautus
      case 'INIT':
        return action.data
      default:
        return state
  }
}


export const voteBlog = (id, newblog) => {
  return async dispatch => {

    await blogService.update(id, newblog)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newblog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: { newblog }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }

}

export default blogReducer