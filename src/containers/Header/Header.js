import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import './Header.css'
import MFS_Logo from '../../assets/images/MFS_Logo.png'
import NavBar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'

import CartDropdown from './CartDropdown/CartDropdown'

function Header ({ firestoreUser }) {
  window.onscroll = function() { scrollFunction() }
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
      document.getElementById("logo").style.height = "auto";
      document.getElementById("logo").style.transition = "width 0.5s";
      document.getElementById("logo").style.transitionTimingFunction = "ease";
    } else {
      document.getElementById("navbar").style.position = "relative";
      document.getElementById("logo").style.fontSize = "35px";
      document.getElementById("navbar").style.height = "80px";
      document.getElementById("logo").style.width = "240px";
    }
  }

  return (
    <div className="Headercontainer">
      <NavBar id="navbar">
        <span className="header">
          <Col>
            <Link to={ROUTES.HOME} className="header-link">
              <img src={MFS_Logo} className="MFS-Logo" id="logo" alt="" />
            </Link>
          </Col>
            <div className="linkPosition" >
              <Link to={ROUTES.HOME} className="header-link">Home</Link>
              <Link to={ROUTES.HOME} className="header-link">About</Link>
              <Link to={ROUTES.DISCOVER_HOMEOWNER} className="header-link">Get Your FREE Flood Score</Link>
              {(firestoreUser)
                ? <Link to={ROUTES.ACCOUNT} className="header-link">Hi, {firestoreUser.firstName}</Link>
                : (
                  <>
                  <Link to={ROUTES.SIGN_IN} className="header-link">Login</Link>
                  <Link to={ROUTES.CHECKOUT_FREE} className="header-link">Sign Up</Link>
                  <CartDropdown />
                  </>
                )
              }
              {/* <Link to={ROUTES.SIGN_UP} className="header-link">
                <img src={shoppingCart} className="cart" alt="" />
              </Link> */}
            </div>
          </span>
        </NavBar>
      </div>
  )
}

export default Header
