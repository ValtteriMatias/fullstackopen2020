const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const x = state.good
      return {...state, good: x + 1}
    case 'OK':
      const y = state.ok
      return {...state, ok: y + 1}
    case 'BAD':
      const z = state.bad
      return {...state, bad: z + 1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer