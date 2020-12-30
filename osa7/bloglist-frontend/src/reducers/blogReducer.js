import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { 
        ...blogToChange, 
        likes: blogToChange.likes + 1
      }
      return state.map(anekdote =>
        anekdote.id !== id ? anekdote : changedBlog
      )
      case 'CREATE':
        const palautus = [...state, action.data.newblog]
        return palautus
      case 'DELETE':
        return state.filter(n => n.id !== action.data.id)
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
      type: 'LIKE',
      data: { id }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const res = await blogService.deleteBlog(id)
    console.log(res)
    dispatch({
      type: 'DELETE',
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