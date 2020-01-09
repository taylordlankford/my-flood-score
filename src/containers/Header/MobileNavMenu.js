import React from "react";
// import { Link } from "react-router-dom";
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
                <Nav.Link onClick={e => gotolink(e, ROUTES.HOME)}>Home</Nav.Link>
              </Nav.MobileNavListItem>
              <Nav.MobileNavListItem>
                <Nav.Link onClick={e => gotolink(e, ROUTES.HOME)}>About</Nav.Link>
              </Nav.MobileNavListItem>
              <Nav.MobileNavListItem>
                <Nav.Link onClick={e => gotolink(e, ROUTES.DISCOVER_HOMEOWNER)}>
                  Get Your FREE Flood Score
                </Nav.Link>
              </Nav.MobileNavListItem>
              {firestoreUser ? (
                <>
                  <Nav.MobileNavListItem>
                    <Nav.Link onClick={e => gotolink(e, ROUTES.ACCOUNT_DASHBOARD)}>
                      Hi, {firestoreUser.firstName}
                    </Nav.Link>
                  </Nav.MobileNavListItem>
                  <Nav.MobileNavListItem onClick={() => setShowMobileNav(false)}>
                    <CartDropdown />
                  </Nav.MobileNavListItem>
                </>
              ) : (
                <>
                  <Nav.MobileNavListItem>
                    <Nav.Link onClick={e => gotolink(e, ROUTES.SIGN_IN)}>
                      Login
                    </Nav.Link>
                  </Nav.MobileNavListItem>
                  <Nav.MobileNavListItem>
                    <Nav.Link onClick={e => gotolink(e, ROUTES.CHECKOUT_FREE)}>
                      Sign Up
                    </Nav.Link>
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