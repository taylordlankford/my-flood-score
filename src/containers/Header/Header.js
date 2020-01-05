import React, { useEffect, useState } from "react";
import useReactRouter from "use-react-router";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/constants/routes";

import "./Header.css";
import MFS_Logo from "../../assets/images/MFS_Logo.png";

import CartDropdown from "./CartDropdown/CartDropdown";
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import styled from "styled-components";

const Header = ({ firestoreUser }) => {
  const { history } = useReactRouter()

  const [lgBreakpoint, setLgBreakpoint] = useState(window.innerWidth < 1080)
  const [showMobileNav, setShowMobileNav] = useState(false)
  // const [isOffsetY, setIsOffsetY] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", (e) => updateWindowDimensions(e))
    window.addEventListener("scroll", (e) => handleOnScroll(e))
    console.log('Inner Width => ', window.innerWidth)

    normalizeHeader()
    mobileNavHeaderStyles()
  });

  const mobileNavHeaderStyles = () => {
    let nav = document.getElementById("nav")
    
    if (nav != null) {
      if (showMobileNav == true) {
        nav.style.borderBottom = "2px solid #ffffff";
      } else {
        nav.style.borderBottom = "2px solid #0d238e";
      }
    }
  }

  /**
   * Shrink the Header
   */
  const shrinkHeader = () => {
    let nav = document.getElementById("nav")
    let navItems = document.getElementById("nav-items")
    let mobileNavItems = document.getElementById("mobile-nav-items")
    let logo = document.getElementById("logo")

    if (nav != null) {
      nav.style.height = "60px"
      nav.style.transition = "all 0.3s"
      nav.style.transitionTimingFunction = "ease";
    }

    if (navItems != null) {
      navItems.style.paddingTop = "13px";
      navItems.style.transition = "all 0.3s";
      navItems.style.transitionTimingFunction = "ease";
    }

    if (logo != null) {
      logo.style.top = "-10px";
      logo.style.transition = "all 0.3s";
      logo.style.transitionTimingFunction = "ease";
    }

    if (mobileNavItems != null) {
      mobileNavItems.style.paddingTop = "5px"
      mobileNavItems.style.transition = "all 0.3s";
      mobileNavItems.style.transitionTimingFunction = "ease";
    }
  }

  /**
   * Normalize the Header Nav style
   */
  const normalizeHeader = () => {
    let nav = document.getElementById("nav")
    let navItems = document.getElementById("nav-items")
    let mobileNavItems = document.getElementById("mobile-nav-items")
    let logo = document.getElementById("logo")

    if (nav != null) {
      nav.style.height = "80px";
      nav.style.transition = "all 0.3s"
      nav.style.transitionTimingFunction = "ease";
    }

    if (navItems != null) {
      navItems.style.paddingTop = "26px";
      navItems.style.transition = "all 0.3s";
      navItems.style.transitionTimingFunction = "ease";
    }

    if (logo != null) {
      logo.style.top = "0";
      logo.style.transition = "all 0.3s";
      logo.style.transitionTimingFunction = "ease";
    }

    if (mobileNavItems != null) {
      mobileNavItems.style.paddingTop = "16px"
      mobileNavItems.style.transition = "all 0.3s";
      mobileNavItems.style.transitionTimingFunction = "ease";
    }
  }

  /**
   * Handle on scroll
   */
  const handleOnScroll = (e) => {
    e.preventDefault()
    let hasOffsetY = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20

    // setIsOffsetY(hasOffsetY)

    if (hasOffsetY) {
      shrinkHeader()
    } else {
      // At the top
      normalizeHeader();
    }

    /* Normalize Header Nav when mobile menu is open */
    if (showMobileNav == true) {
      normalizeHeader()
    }
  }

  /**
   * Update window dimensions, decides what to update based on breakpoint.
   * If breakpoint is NOT greater than or equal to 1280 pixel:
   *    set breakpoint to false (unmounts mobile button)
   *    set mobile nav to false (unmounts mobile nav)
   */
  const updateWindowDimensions = () => {
    let lg = window.innerWidth < 1080 

    if (lg) {
      console.log('Hit LG Breakpoint')
      setLgBreakpoint(true)
    } else {
      setLgBreakpoint(false)
      setShowMobileNav(false)
    }
  }

  /**
   * Navbar Toggler component
   */
  const NavbarToggler = () => (
    <>
      {showMobileNav == true ? (
        <MobileNavToggler onClick={e => toggleMobileNav(e)}>
          <IoMdClose size={48} style={{ margin: "0" }} />
        </MobileNavToggler>
      ) : (
        <MobileNavToggler onClick={e => toggleMobileNav(e)}>
          <MdMenu size={48} style={{ margin: "0" }} />
        </MobileNavToggler>
      )}
    </>
  );

  /**
   * Toggles the full height, full width mobile nav.
   */
  const toggleMobileNav = e => {
    e.preventDefault()
    console.log('Clicked!')
    showMobileNav == false ? setShowMobileNav(true) : setShowMobileNav(false);

    let nav = document.getElementById("nav")
    if (showMobileNav == true) {
      nav.style.borderBottom = "2px solid #ffffff";
    }
  }

  /**
   * Handles redirect to route and close the mobile nav.
   */
  const gotolink = (e, route) => {
    e.preventDefault()
    history.push(route)
    setShowMobileNav(false)
  }

  return (
    <>
      {/* Mobile Navigation */}
      {showMobileNav == true ? (
        <MobileNav id="mobileNav">
          <MobileNavContainer>
            <MobileNavList style={{ listStyleType: "none" }}>
              <MobileNavListItem>
                <Link onClick={e => gotolink(e, ROUTES.HOME)}>Home</Link>
              </MobileNavListItem>
              <MobileNavListItem>
                <Link onClick={e => gotolink(e, ROUTES.HOME)}>About</Link>
              </MobileNavListItem>
              <MobileNavListItem>
                <Link onClick={e => gotolink(e, ROUTES.DISCOVER_HOMEOWNER)}>
                  Get Your FREE Flood Score
                </Link>
              </MobileNavListItem>
              {firestoreUser ? (
                <>
                  <MobileNavListItem>
                    <Link onClick={e => gotolink(e, ROUTES.ACCOUNT_DASHBOARD)}>
                      Hi, {firestoreUser.firstName}
                    </Link>
                  </MobileNavListItem>
                  <MobileNavListItem>
                    <CartDropdown />
                  </MobileNavListItem>
                </>
              ) : (
                <>
                  <MobileNavListItem>
                    <Link gotolink={e => gotolink(e, ROUTES.SIGN_IN)}>
                      Login
                    </Link>
                  </MobileNavListItem>
                  <MobileNavListItem>
                    <Link onClick={e => gotolink(e, ROUTES.CHECKOUT_FREE)}>
                      Sign Up
                    </Link>
                  </MobileNavListItem>
                  <MobileNavListItem>
                    <CartDropdown />
                  </MobileNavListItem>
                </>
              )}
            </MobileNavList>
          </MobileNavContainer>
        </MobileNav>
      ) : (
        <></>
      )}

      {/* Non-mobile Navigation */}
      {lgBreakpoint == true ? (
        <Nav id="nav">
          <NavContainer>
            <NavBrand>
              <Link to={ROUTES.HOME}>
                <img src={MFS_Logo} className="MFS-Logo" id="logo" alt="MFS" />
              </Link>
            </NavBrand>
            <MobileNavItems id="mobile-nav-items">
              <NavbarToggler />
            </MobileNavItems>
          </NavContainer>
        </Nav>
      ) : (
        <Nav id="nav">
          <NavContainer>
            <NavBrand>
              <Link to={ROUTES.HOME}>
                <img src={MFS_Logo} className="MFS-Logo" id="logo" alt="MFS" />
              </Link>
            </NavBrand>
            <NavMenuItems id="nav-items">
              <Link to={ROUTES.HOME} className="header-link">
                Home
              </Link>
              <Link to={ROUTES.HOME} className="header-link">
                About
              </Link>
              <Link to={ROUTES.DISCOVER_HOMEOWNER} className="header-link">
                Get Your FREE Flood Score
              </Link>
              {firestoreUser ? (
                <>
                  <Link to={ROUTES.ACCOUNT_DASHBOARD} className="header-link">
                    Hi, {firestoreUser.firstName}
                  </Link>
                  <CartDropdown />
                </>
              ) : (
                <>
                  <Link to={ROUTES.SIGN_IN} className="header-link">
                    Login
                  </Link>
                  <Link to={ROUTES.CHECKOUT_FREE} className="header-link">
                    Sign Up
                  </Link>
                  <CartDropdown />
                </>
              )}
            </NavMenuItems>
          </NavContainer>
        </Nav>
      )}
    </>
  );
};

/* Styled Components */

 /**
  * Normal navigation
  */
const Nav = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  position: fixed;
  /* border-bottom: 2px solid #0d238e; */
  background-color: #ffffff;
  font-weight: 500;
  z-index: 999;
`;

const NavContainer = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: right;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

const NavBrand = styled.div`
  text-align: left;
`

const NavMenuItems = styled.div`
  text-align: right;
`;

 /**
  * Mobile navigation
  */
const MobileNav = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  z-index: 999;
  position: fixed;
  background-color: #ffffff;
`;

const MobileNavContainer = styled.div`
  padding-top: 200px;
  z-index: 999;
  text-align: center;
`;

const MobileNavItems = styled.div`
  /* padding-top: 18px; */
`

const MobileNavList = styled.ul`
  list-style-type: none;
`;

const MobileNavListItem = styled.li`
  font-size: 28px;
  font-weight: 600;
  color: #666666;
  padding-bottom: 50px;

  &:hover {
    cursor: pointer;
  }
`;

const MobileNavToggler = styled.span`
  color: #666666;

  &:hover {
    cursor: pointer;
    color: #0d238e;
  }
`;

export default Header;
