import React from "react"
import * as ROUTES from "../../routes/constants/routes";
import * as Nav from './StyledComponents/Header';
import MFS_Logo from "../../assets/images/MFS_Logo.png";
import CartDropdown from "./CartDropdown/CartDropdown";
import styled from "styled-components";
import UserDisplayName from '../../components/UserDisplayName/UserDisplayName';

const MainNav = (props) => {
  const {
    firestoreUser,
    loading,
    history,
    lgBreakpoint,
    NavbarToggler,
    authUser
  } = props

  return (
    <>
      {lgBreakpoint == true ? (
        <Nav.Nav id="nav">
          <Nav.NavContainer>
            <Nav.NavBrand>
              <A onClick={() => history.push(ROUTES.HOME)}>
                <MFSLogo />
              </A>
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
                <A onClick={() => history.push(ROUTES.HOME)}>
                  <MFSLogo />
                </A>
              </Nav.NavBrand>
              <Nav.NavMenuItems id="nav-items">
                <A onClick={() => history.push(ROUTES.HOME)}>Home</A>
                <A onClick={() => history.push(ROUTES.HOME)}>About</A>
                <A onClick={() => history.push(ROUTES.DISCOVER_HOMEOWNER)}>Get Your FREE Flood Score</A>
                {(loading == false && firestoreUser == null) ? (
                  <>
                    <A onClick={() => history.push(ROUTES.SIGN_IN)}>Login</A>
                    <A onClick={() => history.push(ROUTES.CHECKOUT_FREE)}>Sign Up</A>
                  </>
                ) : (
                    <></>
                )}
                {(loading == false && firestoreUser != null) ? (
                  <UserDisplayName />
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

const MFSLogo = styled.img.attrs({
  src: MFS_Logo,
  alt: "MFS",
  id: "logo"
})`
  position: relative !important;
  margin: 0 auto !important;
  max-width: 240px !important;
  box-sizing: border-box !important;
`

const A = styled.span`
  padding-top: 10px;
  margin: 18px;
  text-decoration: none;
  color: #666666;
  font-size: 18px;

  &:link {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
  }

  &:hover {
    color: #0d238e;
    transition: 0.5s !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  &:active {
    text-decoration: underline;
  }
`
export default MainNav
