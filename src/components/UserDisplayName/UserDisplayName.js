import React, { useEffect, useState } from 'react'
import useReactRouter from "use-react-router"
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../redux/actions/userActions'
import * as ROUTES from '../../routes/constants/routes'
import { HeaderLink } from '../../StyledComponents/StyledComponents'
import { useFirestoreUser } from '../../hooks'

const UserDisplayName = (props) => {
  const { authUser } = props
  // const { displayName } = props.authUser
  const userReducer = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const [displayName, setDisplayName] = useState(userReducer.displayName)
  const { history } = useReactRouter()
  const { firestoreUser } = useFirestoreUser()

  useEffect(() => {
    if (userReducer.displayName == null) {
      updateDisplayName()
    } else {
      setDisplayName(userReducer.displayName)
    }
  }, [userReducer.displayName, firestoreUser])

  /**
   * For initial Sign Up
   * Update the display name of the auth user
  */
  const updateDisplayName = () => {
    if (authUser != null && firestoreUser != null) {
      let { firstName } = firestoreUser
      authUser.updateProfile({
        displayName: firstName
      }).then(() => {
        dispatch(update(authUser.displayName))
        setDisplayName(authUser.displayName)
        console.log('Successfully updated display name.')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const displayNameExists = typeof displayName != 'undefined'

  return displayNameExists ? (
    <HeaderLink onClick={() => history.push(ROUTES.ACCOUNT_DASHBOARD)}>
      {`Hi, ${displayName}`}
    </HeaderLink>
  ) : (<></>)
}

export default UserDisplayName;
