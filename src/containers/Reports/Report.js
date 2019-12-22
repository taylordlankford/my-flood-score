import React, { useState, useEffect } from 'react'
import DiscoverReport from './DiscoverReport'
import {  useFirebase, useFirestoreUser } from '../../hooks'

const Report = (props) => {
  const [property, setProperty] = useState(null)
  const [error, setError] = useState(null)
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

    useEffect(() => {
      const { pathname } = props.history.location
      const pathArray = pathname.split('/')
      const reportId = pathArray[pathArray.length - 1]
      if (!loading) {
        firebase.doFirestoreDocGet("reports", reportId)
          .then((doc) => {
            if (typeof doc.property !== 'undefined') {
              doc.property.get().then((doc) => {
                if (doc.exists) {
                  setProperty(doc.data())
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!")
                  setProperty("not found")
                }
              }).catch(function(error) {
                console.log("Error getting document:", error)
                setError(error.messsage)
              })
            } else {
              setProperty("not found")
            }
          })
      }
    }, [loading])

  if (loading) {
    return 'loading...'
  }
  if (!property) {
    return 'getting property...'
  }
  if (property === "not found") {
    return 'No Report Found'
  }

  return (
    <>
      <h3 className="authHeader" style={{ textAlign: 'center', fontWeight: 'bold', color: '#595959' }}>Discover Report</h3>
      <DiscoverReport {...property} />
    </>
  )
}

export default Report
