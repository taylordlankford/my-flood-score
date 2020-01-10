import {
  UPDATE
} from '../actions/action-types/user-actions'
import { userInitState } from '../userInitState'

// User Reducer
const userReducer = (state = userInitState, action) => {
  switch (action.type) {
    case UPDATE: {
      let update = true
      return { update }
    }
    default: 
      return state
  }
}

export default userReducer