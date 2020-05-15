export const initialState = {
  production: true,
  theme: { primary: 'green' },
  user: null,
  error: null,
  successMessage: null,
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
    case 'changeSuccessMessage':
      return {
        ...state,
        successMessage: action.newSuccessMessage
      }
      
    default:
      return state
  }
}

export default StateReducer
