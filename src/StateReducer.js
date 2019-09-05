export const initialState = {
  production: true,
  theme: { primary: 'green' },
  user: null,
  error: null,
}

const StateReducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme
      }
    case 'changeUser':
      return {
        ...state,
        user: action.newUser
      }
    case 'changeError':
      return {
        ...state,
        error: action.newError
      }
      
    default:
      return state
  }
}

export default StateReducer
