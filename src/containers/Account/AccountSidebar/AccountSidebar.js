import React from 'react'
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

  const handleSignOut = (firebase) => {
    firebase.doSignOut()
      .then(() => {
        history.push(ROUTES.HOME)
      })
  }

  return (
    <Col sm={3}>
      <ListGroup>
        <ListGroupItem>
          <SidebarItem
            routePath={ROUTES.ACCOUNT_DASHBOARD}
            sidebarIcon={<FaTachometerAlt />}
            sidebarLink="Dashboard" />
        </ListGroupItem>

        <ListGroupItem>
          <Link to={ROUTES.ACCOUNT_ORDERS}>
            <span><FaShoppingBasket /></span>
            <span>Orders</span>
          </Link>
        </ListGroupItem>

        <ListGroupItem>
          <Link to={ROUTES.ACCOUNT_DOWNLOADS}>
            <span><FaDownload /></span>
            <span>Downloads</span>
          </Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to={ROUTES.ACCOUNT_ADDRESSES}>
            <span><FaAddressBook /></span>
            <span>Addresses</span>
          </Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to={ROUTES.ACCOUNT_PAYMENT_METHODS}>
            <span><FaCreditCard /></span>
            <span>Payment Methods</span>
          </Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to={ROUTES.EDIT_ACCOUNT}>
            <span><FaUserAlt /></span>
            <span>Account Details</span>
          </Link>
        </ListGroupItem>
        <ListGroupItem>
          <span><FaSignOutAlt /></span>
          <span id="logout-link"onClick={() => handleSignOut(firebase)}>
            Logout
          </span>
        </ListGroupItem>
      </ListGroup>
    </Col>
  )
}

export default AccountSidebar