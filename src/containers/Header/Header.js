import React from 'react'
import { Link } from 'react-router-dom'
// import * as ROUTES from '../../constants/routes'
import * as ROUTES from '../../routes/constants/routes'

import './Header.css'
import MFS_Logo from '../../assets/images/MFS_Logo.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import CartDropdown from './CartDropdown/CartDropdown'

function Header({ firestoreUser }) {
  window.onscroll = function () { scrollFunction() }
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar").style.position = "fixed";
      document.getElementById("navbar").style.background = "#fff";
      document.getElementById("navbar").style.width = "100%";
      document.getElementById("navbar").style.zIndex = "999";
      document.getElementById("navbar").style.height = "48px";
      document.getElementById("navbar").style.borderBottom = "1px solid #d3d3d3";
      document.getElementById("navbar").style.transition = "all 1s ease 0s;";
      document.getElementById("logo").style.width = "190px";
      document.getElementById("logo").style.top = "-10px";
      // document.getElementById("logo").style.height = "auto";
      document.getElementById("logo").style.transition = "width 0.5s";
      document.getElementById("logo").style.transitionTimingFunction = "ease";
    } else {
      document.getElementById("navbar").style.position = "relative";
      // document.getElementById("logo").style.fontSize = "35px";
      document.getElementById("navbar").style.height = "80px";
      document.getElementById("logo").style.width = "240px";
      document.getElementById("logo").style.top = "0px";
      document.getElementById("navbar").style.borderBottom = "2px solid #0d238e";
    }
  }

  return (
    <Navbar className="navbar" id="navbar" expand="lg">
      <Container className="navbar-wrapper">
        <Navbar.Brand>
          <Link to={ROUTES.HOME}>
            <img src={MFS_Logo} className="MFS-Logo" id="logo" alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to={ROUTES.HOME} className="header-link">Home</Link>
            <Link to={ROUTES.HOME} className="header-link">About</Link>
            <Link to={ROUTES.DISCOVER_HOMEOWNER} className="header-link">Get Your FREE Flood Score</Link>
            {(firestoreUser) ?
              <>
                <Link to={ROUTES.ACCOUNT_DASHBOARD} className="header-link">Hi, {firestoreUser.firstName}</Link>
                <CartDropdown />
              </>
              :
              (
                <>
                  <Link to={ROUTES.SIGN_IN} className="header-link">Login</Link>
                  <Link to={ROUTES.CHECKOUT_FREE} className="header-link">Sign Up</Link>
                  <CartDropdown />
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
