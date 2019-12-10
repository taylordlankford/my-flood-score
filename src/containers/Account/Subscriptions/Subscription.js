import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Moment from "react-moment"
import 'moment-timezone'
import { AccountContext } from '../AccountContext'

const Subscription = ({ sub, index }) => {
  const [handlingCancel, setHandlingCancel] = useState(false)
  const [canceled, setCanceled] = useState(false)

  const { firebase } = useContext(AccountContext)

  const handleSubCancel = async (id) => {
    console.log('canceling sub', id)
    setHandlingCancel(true)
    const s = await firebase.doCancelSubscription(id)
    console.log('s', s.data.subscription)
    setHandlingCancel(false)
    if (s.data.subscription.status === 'canceled') {
      setCanceled(true)
      // Notify Success
    } else {
      // TODO: Notify error
    }
  }

  if (canceled) {
    return null
  }

  return (
    <tr key={index}>
      <td>
        {sub.plan.nickname}
      </td>
      <td>
      <Moment format="MM/DD/YYYY">
        {new Date(sub.start_date * 1000)}
      </Moment>
      </td>
      <td>
        <Moment tz="America/New_York" format="MM/DD/YYYY HH:mm z">
          {new Date(sub.current_period_end * 1000)}
        </Moment>
      </td>
      <td>
        {sub.quantity > 1
        ? `$${(sub.plan.amount * sub.quantity / 100).toFixed(2)} for ${sub.quantity} plans`
        : `$${(sub.plan.amount * sub.quantity / 100).toFixed(2)}`
        }
      </td>
      <td>
        <Button
          className="btn btn-primary view-action"
          onClick={() => handleSubCancel(sub.id)}
          disabled={handlingCancel}
        >
          {!handlingCancel
            ? 'Cancel'
            : (
              <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span>Processing..</span>
              </>
            )
          }
        </Button>
      </td>
    </tr>
  )
}

export default Subscription
