import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { useFirestoreUser, useFirebase } from '../../../hooks'

import * as ROUTES from '../../../routes/constants/routes'
import {
  Link
} from 'react-router-dom'

/* Style Imports */
import './AccountSidebar.css'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Col from 'react-bootstrap/Col'

/* React Icons */
import {
  FaTachometerAlt,
  FaShoppingBasket,
  FaDownload,
  FaAddressBook,
  FaCreditCard,
  FaUserAlt,
  FaSignOutAlt
} from 'react-icons/fa'

import SidebarItem from './SidebarItem'

const AccountSidebar = () => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser } = userData
  const { history } = useReactRouter()
  const [sidebarItems] = useState([
    {
      id: 1,
      routePath: ROUTES.ACCOUNT_DASHBOARD,
      sidebarIcon: <FaTachometerAlt />,
      sidebarLink: 'Dashboard'
    },
    {
      id: 2,
      routePath: ROUTES.ACCOUNT_ORDERS,
      sidebarIcon: <FaShoppingBasket />,
      sidebarLink: 'Orders'
    },
    {
      id: 3,
      routePath: ROUTES.ACCOUNT_DOWNLOADS,
      sidebarIcon: <FaDownload />,
      sidebarLink: 'Downloads'
    },
    {
      id: 4,
      routePath: ROUTES.ACCOUNT_ADDRESSES,
      sidebarIcon: <FaAddressBook />,
      sidebarLink: 'Addresses'
    },
    {
      id: 5,
      routePath: ROUTES.ACCOUNT_PAYMENT_METHODS,
      sidebarIcon: <FaCreditCard />,
      sidebarLink: 'Payment Methods'
    },
    {
      id: 6,
      routePath: ROUTES.EDIT_ACCOUNT,
      sidebarIcon: <FaUserAlt />,
      sidebarLink: 'Account Settings'
    }
  ])

  const handleSignOut = (firebase) => {
    firebase.doSignOut()
      .then(() => {
        history.push(ROUTES.HOME)
      })
  }

  return (
    <Col sm={3}>
      <ListGroup>
        {
          sidebarItems.map((item, key) => (
            <SidebarItem
              key={key}
              routePath={item.routePath}
              sidebarIcon={item.sidebarIcon}
              sidebarLink={item.sidebarLink}
            />
          ))
        }
        <ListGroupItem>
          <span>
            <FaSignOutAlt style={{ fill: '#c4c4c4' }} />
          </span>
          <span id="logout-link" onClick={() => handleSignOut(firebase)}>
            Logout
          </span>
        </ListGroupItem>
      </ListGroup>
    </Col>
  )
}

export default AccountSidebar