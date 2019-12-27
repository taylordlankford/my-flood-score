import React, { useState, useEffect } from 'react'
import DiscoverReport from './DiscoverReport'
import CompareReport from './CompareReport'
import {  useFirebase, useFirestoreUser } from '../../hooks'

const Report = (props) => {
  const [report, setReport] = useState(null)
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

    useEffect(() => {
      const { pathname } = props.location
      const pathArray = pathname.split('/')
      const reportId = pathArray[pathArray.length - 1]
      if (!loading) {
        firebase.doFirestoreDocGet("reports", reportId)
          .then((doc) => {
            if (doc === 'No such document!') {
              setReport('not found')
            } else {
              setReport(doc)
            }
          })
          .catch((error) => {
            setReport('not found')
          }) 
      }
    }, [loading])

  if (loading) {
    return 'loading...'
  }
  if (report === 'not found') {
    return 'Report not found.'
  }
  if (!report) {
    return 'loading...'
  }

  if (report.categoryId === 'compare') {
    return <CompareReport report={report} />
  } else if (report.categoryId === 'discover') {
    return <DiscoverReport report={report} />
  }
  return null
}

export default Report
