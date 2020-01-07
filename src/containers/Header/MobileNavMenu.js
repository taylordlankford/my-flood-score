import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/constants/routes";
import * as Nav from './HeaderStyledComponents';
import CartDropdown from "./CartDropdown/CartDropdown";

const MobileNavMenu = (props) => {
  const { 
    firestoreUser, 
    showMobileNav, 
    setShowMobileNav, 
    gotolink 
  } = props

  return (
    <>
      {/* Mobile Navigation */}
      {showMobileNav == true ? (
        <Nav.MobileNav id="mobileNav">
          <Nav.MobileNavContainer>
            <Nav.MobileNavList style={{ listStyleType: "none" }}>
              <Nav.MobileNavListItem>
                <Link onClick={e => gotolink(e, ROUTES.HOME)}>Home</Link>
              </Nav.MobileNavListItem>
              <Nav.MobileNavListItem>
                <Link onClick={e => gotolink(e, ROUTES.HOME)}>About</Link>
              </Nav.MobileNavListItem>
              <Nav.MobileNavListItem>
                <Link onClick={e => gotolink(e, ROUTES.DISCOVER_HOMEOWNER)}>
                  Get Your FREE Flood Score
                </Link>
              </Nav.MobileNavListItem>
              {firestoreUser ? (
                <>
                  <Nav.MobileNavListItem>
                    <Link onClick={e => gotolink(e, ROUTES.ACCOUNT_DASHBOARD)}>
                      Hi, {firestoreUser.firstName}
                    </Link>
                  </Nav.MobileNavListItem>
                  <Nav.MobileNavListItem onClick={() => setShowMobileNav(false)}>
                    <CartDropdown />
                  </Nav.MobileNavListItem>
                </>
              ) : (
                <>
                  <Nav.MobileNavListItem>
                    <Link onClick={e => gotolink(e, ROUTES.SIGN_IN)}>
                      Login
                    </Link>
                  </Nav.MobileNavListItem>
                  <Nav.MobileNavListItem>
                    <Link onClick={e => gotolink(e, ROUTES.CHECKOUT_FREE)}>
                      Sign Up
                    </Link>
                  </Nav.MobileNavListItem>
                  <Nav.MobileNavListItem onClick={() => setShowMobileNav(false)}>
                    <CartDropdown />
                  </Nav.MobileNavListItem>
                </>
              )}
            </Nav.MobileNavList>
          </Nav.MobileNavContainer>
        </Nav.MobileNav>
      ) : (
        <></>
      )}
    </>
  )
}

export default MobileNavMenu