import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Alert from 'react-bootstrap/Alert'

import Header from './containers/Header/Header'
import Footer from './containers/Footer/Footer'
import FloatingLink from './components/FloatingLink/FloatingLink'

import SignUpPage from './containers/Auth/SignUp'
import SignInPage from './containers/Auth/SignIn'
import PasswordForgetPage from './containers/Auth/PasswordForget'
import Home from './containers/Home/Home'
import CheckoutPage from './containers/Cart/Checkout'
import CheckoutFreePage from './containers/Cart/CheckoutFree'
import OrderReceivedPage from './containers/Cart/OrderReceived'
import EmailActionPage from './containers/EmailActionHandler/EmailAction'
import OptionsPage from './containers/Options/Options'
import Cart from './containers/Cart/Cart'

import Discover from './containers/Products/Discover/Discover'
import Compare from './containers/Products/Compare/Compare'
import Examine from './containers/Products/Examine/Examine'
import Certify from './containers/Products/Certify/Certify'
import Reduce from './containers/Products/Reduce/Reduce'
import DiscoverHomeowner from './containers/Products/Discover/DiscoverHomeowner'
import DiscoverHomeownerPlus from './containers/Products/Discover/DiscoverHomeownerPlus'
import DiscoverBusiness from './containers/Products/Discover/DiscoverBusiness'
import CompareHomeowner from './containers/Products/Compare/CompareHomeowner'
import CompareHomeownerPlus from './containers/Products/Compare/CompareHomeownerPlus'
import CompareBusiness from './containers/Products/Compare/CompareBusiness'
import ExamineHomeowner from './containers/Products/Examine/ExamineHomeowner'
import ExamineBusiness from './containers/Products/Examine/ExamineBusiness'
import CertifyHomeowner from './containers/Products/Certify/CertifyHomeowner'
import CertifyBusiness from './containers/Products/Certify/CertifyBusiness'
import ReduceHomeowner from './containers/Products/Reduce/ReduceHomeowner'

import Account from './containers/Account/Account'

// import * as ROUTES from './constants/routes'
import * as ROUTES from './routes/constants/routes'
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
  // if (loading) {
  //   return <h1>Getting user...</h1>
  // } // TODO: Uncomment
  return (
    <Router>
      <ScrollToTopWithRouter>
        <div>
          <Header firestoreUser={firestoreUser} />
          {error && <Alert className="sticky error" variant={'danger'}>{error}</Alert>}

          <Route
            render={({ location }) => (
                <div>
                  {/* <TransitionGroup> */}
                    {/* no different than other usage of
                    CSSTransition, just make sure to pass
                    `location` to `Switch` so it can match
                    the old location as it animates out */}
                    {/* <CSSTransition
                      key={location.key}
                      classNames="fade"
                      timeout={0}
                    > */}
                      <Switch location={location}>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.CHECKOUT} component={CheckoutPage} />
                        <Route path={ROUTES.CHECKOUT_FREE} component={CheckoutFreePage} />
                        <Route path={ROUTES.ORDER_RECEIVED} component={OrderReceivedPage} />
                        <Route path={ROUTES.EMAIL_ACTION_HANDLER} component={EmailActionPage} />
                        <Route path={ROUTES.OPTIONS} component={OptionsPage} />
                        <Route path={ROUTES.CART} component={Cart} />

                        <Route path={ROUTES.DISCOVER} component={Discover} />
                        <Route path={ROUTES.COMPARE} component={Compare} />
                        <Route path={ROUTES.EXAMINE} component={Examine} />
                        <Route path={ROUTES.CERTIFY} component={Certify} />
                        <Route path={ROUTES.REDUCE} component={Reduce} />

                        <Route path={ROUTES.DISCOVER_HOMEOWNER} component={DiscoverHomeowner} />
                        <Route path={ROUTES.DISCOVER_HOMEOWNER_PLUS} component={DiscoverHomeownerPlus} />
                        <Route path={ROUTES.DISCOVER_BUSINESS} component={DiscoverBusiness} />
                        <Route path={ROUTES.COMPARE_HOMEOWNER} component={CompareHomeowner} />
                        <Route path={ROUTES.COMPARE_HOMEOWNER_PLUS} component={CompareHomeownerPlus} />
                        <Route path={ROUTES.COMPARE_BUSINESS} component={CompareBusiness} />
                        <Route path={ROUTES.EXAMINE_HOMEOWNER} component={ExamineHomeowner} />
                        <Route path={ROUTES.EXAMINE_BUSINESS} component={ExamineBusiness} />
                        <Route path={ROUTES.CERTIFY_HOMEOWNER} component={CertifyHomeowner} />
                        <Route path={ROUTES.CERTIFY_BUSINESS} component={CertifyBusiness} />
                        <Route path={ROUTES.REDUCE_HOMEOWNER} component={ReduceHomeowner} />

                        <Route path={ROUTES.ACCOUNT} component={Account} />

                        <Route render={() => <div>Not Found</div>} />
                      </Switch>
                    {/* </CSSTransition> */}
                  {/* </TransitionGroup> */}
                </div>
            )}
          />
          <FloatingLink />
          <Footer />
        </div>
      </ScrollToTopWithRouter>
    </Router>
  )
}

export default App

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop)
