import {
  UPDATE
} from './action-types/user-actions'

export const update = (displayName) => ({
  type: UPDATE,
  displayName
})