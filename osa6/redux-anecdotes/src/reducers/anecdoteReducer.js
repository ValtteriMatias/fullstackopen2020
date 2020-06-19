import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      console.log(state)
      console.log(id)
      const anekdoteToChange = state.find(n => n.id === id)
      console.log(anekdoteToChange)
      const changedAnekdote = { 
        ...anekdoteToChange, 
        votes: anekdoteToChange.votes + 1
      }
      return state.map(anekdote =>
        anekdote.id !== id ? anekdote : changedAnekdote

      )
      case 'CREATE':
        const palautus = [...state, action.data.newAnecdote]
        return palautus
      case 'INIT':
        return action.data
      default:
        return state
  }
}


export const voteAnecdote = (id, newAnecdote) => {
  return async dispatch => {

    await anecdoteService.update(id, newAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: { newAnecdote }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }

}





export default anecdoteReducer