import React, { useEffect, useState } from "react";
import useReactRouter from "use-react-router";
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import * as Nav from './StyledComponents/Header';
import MobileNavMenu from './MobileNavMenu';
import { normalizeHeader, shrinkHeader } from './NavAnimations';
import MainNav from './MainNav'

const Header = ({ firestoreUser }) => {
  const { history } = useReactRouter()

  // Constants
  const MOBILE_BREAKPOINT = 1080
  const SHRINK_BREAKPOINT = 10

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
    showMobileNav == true ? (
      <Nav.MobileNavToggler onClick={e => toggleMobileNav(e)}>
        <IoMdClose size={48} style={{ margin: "0" }} />
      </Nav.MobileNavToggler>
    ) : (
        <Nav.MobileNavToggler onClick={e => toggleMobileNav(e)}>
          <MdMenu size={48} style={{ margin: "0" }} />
        </Nav.MobileNavToggler>
      )
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
      <MobileNavMenu
        firestoreUser={firestoreUser}
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
        gotolink={gotolink}
      />

      {/* Non-mobile Navigation */}
      <MainNav
        // firestoreUser={firestoreUser}
        // loading={loading}
        history={history}
        lgBreakpoint={lgBreakpoint}
        NavbarToggler={NavbarToggler}
      />
    </>
  );
};

export default Header;
