import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'

import * as ROUTES from '../../../routes/constants/routes'

const Report = ({ report, index, history }) => {
  const { categoryId, createdAt } = report
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
        {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
      </td>
      <td>
        <Moment format="MM/DD/YYYY">
          {new Date(createdAt.seconds * 1000)}
        </Moment>
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
