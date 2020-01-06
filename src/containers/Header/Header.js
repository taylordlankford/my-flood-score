import React, { useEffect, useState } from "react";
import useReactRouter from "use-react-router";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/constants/routes";

import "./Header.css";
import MFS_Logo from "../../assets/images/MFS_Logo.png";

import CartDropdown from "./CartDropdown/CartDropdown";
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";

import * as Nav from './StyledComponents'

const Header = ({ firestoreUser }) => {
  const { history } = useReactRouter()

  // Constants
  const MOBILE_BREAKPOINT = 1080
  const SHRINK_BREAKPOINT = 10
  const TRANSITION_TIME   = 0.2
  const TIMING_FUNCTION   = 'ease-in-out'

  // States
  const [lgBreakpoint, setLgBreakpoint]   = useState(window.innerWidth < MOBILE_BREAKPOINT)
  const [showMobileNav, setShowMobileNav] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", e => updateWindowDimensions(e))
    window.addEventListener("scroll", e => handleOnScroll(e))

    normalizeHeader()
    mobileNavHeaderStyles()
  });

  /**
   * Header Nav style when mobile menu is open.
   */
  const mobileNavHeaderStyles = () => {
    let nav = document.getElementById("nav")

    if (nav != null) {
      if (showMobileNav == true) {
        normalizeHeader()
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
    let nav            = document.getElementById("nav")
    let navItems       = document.getElementById("nav-items")
    let mobileNavItems = document.getElementById("mobile-nav-items")
    let logo           = document.getElementById("logo")

    if (nav != null) {
      nav.style.height = "60px"
      nav.style.transition = `all ${TRANSITION_TIME}s`
      nav.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
    }

    if (navItems != null) {
      navItems.style.paddingTop = "15px";
      navItems.style.transition = `all ${TRANSITION_TIME}s`
      navItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`
    }

    if (logo != null) {
      logo.style.top = "-10px";
      logo.style.transition = `all ${TRANSITION_TIME}s`
      logo.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
    }

    if (mobileNavItems != null) {
      mobileNavItems.style.paddingTop = "5px"
      mobileNavItems.style.transition = `all ${TRANSITION_TIME}s`
      mobileNavItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
    }
  }

  /**
   * Normalize the Header Nav style
   */
  const normalizeHeader = () => {
    let nav            = document.getElementById("nav")
    let navItems       = document.getElementById("nav-items")
    let mobileNavItems = document.getElementById("mobile-nav-items")
    let logo           = document.getElementById("logo")

    if (nav != null) {
      nav.style.height = "80px";
      nav.style.transition = `all ${TRANSITION_TIME}s`
      nav.style.transitionTimingFunction = `${TIMING_FUNCTION}`
    }

    if (navItems != null) {
      navItems.style.paddingTop = "26px";
      navItems.style.transition = `all ${TRANSITION_TIME}s`
      navItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
    }

    if (logo != null) {
      logo.style.top = "0";
      logo.style.transition = `all ${TRANSITION_TIME}s`;
      logo.style.transitionTimingFunction = `${TIMING_FUNCTION}`
    }

    if (mobileNavItems != null) {
      mobileNavItems.style.paddingTop = "16px"
      mobileNavItems.style.transition = `all ${TRANSITION_TIME}s`;
      mobileNavItems.style.transitionTimingFunction = `${TIMING_FUNCTION}`;
    }
  }

  /**
   * Handle on scroll
   */
  const handleOnScroll = (e) => {
    e.preventDefault()

    let hasOffsetY =
      document.body.scrollTop > SHRINK_BREAKPOINT ||
      document.documentElement.scrollTop > SHRINK_BREAKPOINT

    // Shrink header when scrolling.
    shrinkHeader()

    // Normalize header if at the top.
    if (hasOffsetY == false) {
      normalizeHeader();
    }

    // Normalize header if mobile menu is open.
    if (showMobileNav == true) {
      normalizeHeader()
    }
  }

  /**
   * When window is resized:
   * Update window dimensions, decides what to update based on breakpoint.
   */
  const updateWindowDimensions = () => {
    let lg = window.innerWidth < MOBILE_BREAKPOINT

    if (lg) {
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
        <Nav.MobileNavToggler onClick={e => toggleMobileNav(e)}>
          <IoMdClose size={48} style={{ margin: "0" }} />
        </Nav.MobileNavToggler>
      ) : (
        <Nav.MobileNavToggler onClick={e => toggleMobileNav(e)}>
          <MdMenu size={48} style={{ margin: "0" }} />
        </Nav.MobileNavToggler>
      )}
    </>
  );

  /**
   * Toggles the full height, full width mobile nav menu.
   */
  const toggleMobileNav = e => {
    e.preventDefault()
    showMobileNav == false ? setShowMobileNav(true) : setShowMobileNav(false);

    let nav = document.getElementById("nav")
    if (showMobileNav == true) {
      nav.style.borderBottom = "2px solid #ffffff";
    }
  }

  /**
   * Handles redirect to route and close the mobile nav.
   * Closes mobile menu after push.
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
                  <Nav.MobileNavListItem>
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
                  <Nav.MobileNavListItem>
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

      {/* Non-mobile Navigation */}
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
            </Nav.NavMenuItems>
          </Nav.NavContainer>
        </Nav.Nav>
      )}
    </>
  );
};

export default Header;