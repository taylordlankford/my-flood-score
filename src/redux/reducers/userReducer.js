import {
  UPDATE
} from '../actions/action-types/user-actions'
import { userInitState } from '../userInitState'

// User Reducer
const userReducer = (state = userInitState, action) => {
  switch (action.type) {
    case UPDATE: {
      let prevState = state
      let displayName = action.displayName
      return {
        ...prevState,
        displayName
      }
    }
    default: 
      return state
  }
}

export default userReducer