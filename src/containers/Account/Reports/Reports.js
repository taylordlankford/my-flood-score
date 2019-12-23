import React, { useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { AccountContext } from '../AccountContext'
import Report from './Report'

const Reports = ({ history }) => {
  const { firestoreUser } = useContext(AccountContext)
  const { reports } = firestoreUser

  if (!reports) {
    return (
      'No Reports yet'
    )
  }

  return (
    <>
    <Table responsive borderless>
      <thead>
        <tr>
          <th>Report</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => <Report key={`Report-${index}`} report={report} index={index} history={history} />)}
      </tbody>
    </Table>
    </>
  )
}

export default Reports
