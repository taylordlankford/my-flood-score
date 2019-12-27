import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestoreUser } from '../../hooks'
import GetDiscover from './GetDiscover'
import GetCompare from './GetCompare'
 
// import * as ROUTES from '../../../../routes/constants/routes'

const Request = (props) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData
  const [selected, SetSelected] = useState("")

  useEffect(() => {
    console.log('locaiton:', props.location)
    const { state } = props.location
    let selected = ''
    if (state !== undefined) {
      selected = state.selected
      SetSelected(selected)
    }
  }, [])

  const getInventory = (categoryId) => {
    const discoverInventory =  firestoreUser.inventory.filter((item) => {
      return item.categoryId === categoryId
    })
    return discoverInventory[0].quantity
  }

  const getNewInventory = (categoryId) => {
    const index = firestoreUser.inventory.map(e => e.categoryId).indexOf(categoryId)
    let newInventory = firestoreUser.inventory
    newInventory[index].quantity--
    return newInventory
  }

  if (loading) {
    return 'loading...'
  }

  if (firestoreUser === null) {
    return 'Unautherized'
  }

  return (
    <GetCompare
      firebase={firebase}
      firestoreUser={firestoreUser}
      getInventory={getInventory}
      getNewInventory={getNewInventory}
      selected={selected}
      {...props}
    />
  )
}

export default Request
