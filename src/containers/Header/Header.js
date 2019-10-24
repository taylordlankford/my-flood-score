import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import './Header.css'
import MFS_Logo from '../../assets/images/MFS_Logo.png'
import NavBar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import shoppingCart from '../../assets/images/shopping-cart-solid.svg'

function Header ({ firestoreUser }) {
  // window.onscroll = function() { scrollFunction() }
  // function scrollFunction() {
  //   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
  //     document.getElementById("navbar").style.padding = "30px 10px";
  //     document.getElementById("logo").style.fontSize = "25px";
  //   } else {
  //     document.getElementById("navbar").style.padding = "80px 10px";
  //     document.getElementById("logo").style.fontSize = "35px";
  //   }
  // }
  
  return (
    <div className="Headercontainer">
      <NavBar>
        <span className="header">
          <Col>
            <img src={MFS_Logo} className="MFS-Logo" id="logo" alt={''} />
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
