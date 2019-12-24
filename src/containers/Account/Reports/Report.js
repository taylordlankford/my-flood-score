import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import * as ROUTES from '../../../routes/constants/routes'

const Report = ({ report, index, history }) => {
  return (
    <tr>
      <td>
        <Link
          to={ROUTES.REPORT + '/' + report.reportRef.id}
          className="order-number"
        >
          #{index+1}
        </Link>
      </td>
      <td>
        {report.address.split(',')[0]}
      </td>
      <td>
        <Button
          onClick={() => history.push(ROUTES.REPORT + '/' + report.reportRef.id)}
        >
          View
        </Button>
      </td>
    </tr>
  )
}

export default Report
