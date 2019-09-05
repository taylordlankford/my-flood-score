import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from './components/Header/Header'

import SignUpPage from './containers/Auth/SignUp'
import SignInPage from './containers/Auth/SignIn'
import PasswordForgetPage from './containers/Auth/PasswordForget'
import Home from './containers/Home/Home'
import DiscoverPage from './containers/Products/Discover'
import CheckoutPage from './containers/Cart/Checkout'
import CheckoutFreePage from './containers/Cart/CheckoutFree'
import OrderReceivedPage from './containers/Cart/OrderReceived'

import * as ROUTES from './constants/routes'
import { useFirestoreUser, useStateValue} from './hooks'
import './App.css'


const App = () => {
  const [{ user, error }, dispatch] = useStateValue()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData
  if (user !== firestoreUser) {
    dispatch({
      type: 'changeUser',
      newUser: firestoreUser,
    })
  }
  if (loading) {
    return <h1>Getting user...</h1>
  }
  return (
    <Router>
      <div>
        <Row>
          <Header/>
        </Row>
        {error && <Alert className="sticky error" variant={'danger'}>{error}</Alert>}

        <Route
          render={({ location }) => (
            <div className="main">
              <div style={{}}>
                <TransitionGroup>
                  {/* no different than other usage of
                  CSSTransition, just make sure to pass
                  `location` to `Switch` so it can match
                  the old location as it animates out
              */}
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={0}
                  >
                    <Switch location={location}>
                      <Route exact path={ROUTES.HOME} component={Home} />
                      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                      <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
                      <Route path={ROUTES.CHECKOUT} component={CheckoutPage} />
                      <Route path={ROUTES.CHECKOUT_FREE} component={CheckoutFreePage} />
                      <Route path={ROUTES.ORDER_RECEIVED} component={OrderReceivedPage} />
                      {/* Without this `Route`, we would get errors during
                      the initial transition from `/` to `/hsl/10/90/50`
                  */}
                      <Route render={() => <div>Not Found</div>} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
          )}
        />

      </div>
    </Router>
  )
}

export default App