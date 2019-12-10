import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Moment from "react-moment"
import 'moment-timezone'
import { AccountContext } from '../AccountContext'
import { pushInfo, pushDanger } from '../../../redux/actions/notificationActions'

const Subscription = ({ sub, index }) => {
  const dispatch = useDispatch()
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
      dispatch(pushInfo('Subscription canceled'))
    } else {
      dispatch(pushDanger('Failed to cancel subscription. Please try again or contact us'))
    }
  }

  const getnickname = (sub) => {
    let nickname = ''
    sub.items.data.forEach(item => {
      console.log('in loop', item.plan.nickname)
      nickname = nickname.concat(item.plan.nickname)
      if (item.quantity > 1) {
        nickname = nickname.concat(' x ', item.quantity)
      }
      nickname = nickname.concat('/')
    })
    nickname = nickname.split('/').filter(Boolean).join('/');
    return nickname
  }

  const getAmount = (sub) => {
    let amount = 0
    sub.items.data.forEach(item => {
      amount += item.quantity * item.plan.amount
    })
    amount = (amount / 100).toFixed(2)
    return amount
  }

  const getQuantity = (sub) => {
    let q = 0
    sub.items.data.forEach(item => {
      q += item.quantity
    })
    return q
  }

  if (canceled) {
    return null
  }

  return (
    <tr key={index}>
      <td>
        {getnickname(sub)}
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
        {`$${getAmount(sub)}`}
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
                style={{ marginLeft: '-15px', marginRight: '15px' }}
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
