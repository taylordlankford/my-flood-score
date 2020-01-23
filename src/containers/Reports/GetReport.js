import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestoreUser } from '../../hooks'
import GetDiscover from './GetDiscover'
import GetCompare from './GetCompare'
 
// import * as ROUTES from '../../../../routes/constants/routes'

const GetReport = (props) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData
  const [selected, setSelected] = useState("")
  const [category, setCategory] = useState('discover')

  useEffect(() => {
    console.log('locaiton:', props.location)
    const { state } = props.location
    let selected = ''
    if (state !== undefined) {
      selected = state.selected
      setSelected(selected)
      setCategory(state.categoryId)
    }
  }, [])

  useEffect(() => {
    const { state } = props.location
    if (state.selected !== undefined && getInventory('discover') === 0) {
      if (getInventory('compare') > 0) {
        setCategory('compare')
      } else if (getInventory('examine') > 0) {
        setCategory('examine')
      } else if (getInventory('certify') > 0) {
        setCategory('certify')
      } else if (getInventory('reduce') > 0) {
        setCategory('reduce')
      } else {
        setCategory(state.categoryId) 
      }
    } else {
      setCategory(state.categoryId)
    }
  }, [firestoreUser])

  const getInventory = (categoryId) => {
    console.log('getInventory categoryId', categoryId)
    try {
      const catInventory =  firestoreUser.inventory.filter((item) => {
        return item.categoryId === categoryId
      })
      console.log('catInventory', catInventory)
      return catInventory[0].quantity
    } catch (err) {
      console.log('error', err)
      return 0
    }
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

  if (category === 'compare') {
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
  } else if (category === 'discover') {
    return (
      <GetDiscover
        firebase={firebase}
        firestoreUser={firestoreUser}
        getInventory={getInventory}
        getNewInventory={getNewInventory}
        selected={selected}
        {...props}
      />
    )
  }
  return (
    <GetDiscover
      firebase={firebase}
      firestoreUser={firestoreUser}
      getInventory={getInventory}
      getNewInventory={getNewInventory}
      selected={selected}
      {...props}
    />
  )
}

export default GetReport
