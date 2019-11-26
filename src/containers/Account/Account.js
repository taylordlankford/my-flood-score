import React from 'react'
import { useFirestoreUser, useFirebase } from '../../hooks'

/* React Router */
// import useReactRouter from 'use-react-router'
import * as ROUTES from '../../routes/constants/routes'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Link
} from 'react-router-dom'

/* Style Imports */
import './Account.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AccountSidebar from './AccountSidebar/AccountSidebar'
import Dashboard from './Dashboard'
import Orders from './Orders/Orders'
import Downloads from './Downloads'
import Addresses from './Addresses'
import PaymentMethods from './PaymentMethods'
import EditAccount from './EditAccount'

const Account = () => {
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

  if (loading) {
    return 'loading...'
  }

  if (!firestoreUser) {
    return 'Unauthorized'
  }

  return (
    <Router>
      <Route render={() => (
        <>
          <Container className="acct-container">
            <Row>
              <AccountSidebar />
              <Col sm={9} className="acct-main">
                <Switch>
                  <Route path={ROUTES.ACCOUNT_DASHBOARD} component={Dashboard} />
                  <Route path={ROUTES.ACCOUNT_ORDERS} component={Orders} />
                  <Route path={ROUTES.ACCOUNT_DOWNLOADS} component={Downloads} />
                  <Route path={ROUTES.ACCOUNT_ADDRESSES} component={Addresses} />
                  <Route path={ROUTES.ACCOUNT_PAYMENT_METHODS} component={PaymentMethods} />
                  <Route path={ROUTES.EDIT_ACCOUNT} component={EditAccount} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </>
      )} />
    </Router>
  )
}

export default Account