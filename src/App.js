import React from 'react'
import Header from './components/Header/Header'
import { Row, Col } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import SignUpPage from './containers/Auth/SignUp'
import SignInPage from './containers/Auth/SignIn'
import PasswordForgetPage from './containers/Auth/PasswordForget'
import Home from './containers/Home/Home'

import * as ROUTES from './constants/routes'
import { useFirestoreUser, useStateValue} from './hooks'


const App = () => {
  const [{ user }, dispatch] = useStateValue()
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

        <Route
          render={({ location }) => (
            <div style={{}}>
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