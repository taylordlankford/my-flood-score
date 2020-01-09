import React from "react"
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/constants/routes";
import * as Nav from './HeaderStyledComponents';
import MFS_Logo from "../../assets/images/MFS_Logo.png";
import CartDropdown from "./CartDropdown/CartDropdown";

const MainNav = (props) => {
  const {
    firestoreUser,
    loading,
    history,
    lgBreakpoint,
    NavbarToggler
  } = props
  
  return (
    <>
      {lgBreakpoint == true ? (
        <Nav.Nav id="nav">
          <Nav.NavContainer>
            <Nav.NavBrand>
              <Link to={ROUTES.HOME}>
                <img src={MFS_Logo} className="MFS-Logo" id="logo" alt="MFS" />
              </Link>
            </Nav.NavBrand>
            <Nav.MobileNavItems id="mobile-nav-items">
              <NavbarToggler />
            </Nav.MobileNavItems>
          </Nav.NavContainer>
        </Nav.Nav>
      ) : (
          <Nav.Nav id="nav">
            <Nav.NavContainer>
              <Nav.NavBrand>
                <Link to={ROUTES.HOME}>
                  <img src={MFS_Logo} className="MFS-Logo" id="logo" alt="MFS" />
                </Link>
              </Nav.NavBrand>
              <Nav.NavMenuItems id="nav-items">
                <Link to={ROUTES.HOME} className="header-link">Home</Link>
                <Link to={ROUTES.HOME} className="header-link">About</Link>
                <Link to={ROUTES.DISCOVER_HOMEOWNER} className="header-link">Get Your FREE Flood Score</Link>
                {(loading == false && firestoreUser == null) ? (
                  <>
                    <Link to={ROUTES.SIGN_IN} className="header-link">Login</Link>
                    <Link to={ROUTES.CHECKOUT_FREE} className="header-link">Sign Up</Link>
                  </>
                ) : (
                    <></>
                  )}
                {(loading == false && firestoreUser != null) ? (
                  <Link to={ROUTES.ACCOUNT_DASHBOARD} className="header-link">
                    Hi, {firestoreUser.firstName}
                  </Link>
                ) : (
                  <></>
                )}
                <CartDropdown />
              </Nav.NavMenuItems>
            </Nav.NavContainer>
          </Nav.Nav>
        )}
    </>
  )
}

export default MainNav
