import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import './Header.css'
import MFS_Logo from '../../assets/images/MFS_Logo.png'
import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certify from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import Discover from '../../assets/images/Discover.svg'
import NavBar from 'react-bootstrap/Navbar'
import {Row, Col} from 'react-bootstrap'
import shoppingCart from '../../assets/images/shopping-cart-solid.svg'

function Header () {
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
    <div style={{ height: 'auto' }}>
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
                  <Link to={ROUTES.SIGN_IN} className="header-link">Login</Link>
                  <Link to={ROUTES.SIGN_UP} className="header-link">Sign Up</Link>
                  <Link to={ROUTES.SIGN_UP} className="header-link">
                    <img src={shoppingCart} className="cart" alt={''} />
                  </Link>
                </div>
            </span>
          </NavBar>
        </div>
        <div className='headerBottom'>
          <a className="links2" href="https://reactjs.org" >
              Discover
              <img src={Discover} className={'links2logo'} alt={''} />
          </a>
          <a className="links2" href="https://reactjs.org" >
            Compare
            <img src={Compare} className={'links2logo'} alt={''} />
          </a>
          <a className="links2" href="https://reactjs.org" >
            Examine
            <img src={Examine} className={'links2logo'} alt={''} />
          </a>
          <a className="links2" href="https://reactjs.org" >
            Certify
            <img src={Certify} className={'links2logo'} alt={''} />
          </a>
          <a className="links2" href="https://reactjs.org" >
            Reduce or Eliminate
            <img src={Reduce_Eliminate} className={'links2logo'} alt={''} />
          </a>
        </div>
    </div>
  )
}

export default Header