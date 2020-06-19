
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
        const palautus = [...state, action.data.object]
        return palautus
      case 'INIT':
        return action.data
      default:
        return state
  }
}


export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (object) => {
  return {
    type: 'CREATE',
    data: { object }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}





export default anecdoteReducer