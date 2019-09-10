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
import {
    Container,
    Grid,
    makeStyles,
    Button,
} from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: 'none',
    },
    fontFamily: '"Montserrat", sans-serif'
}));

function Header () {
    const classes = useStyles();
    return (
    <div style={{ width: '100%' }}>
    <div className={'Headercontainer'}>
        <Row >
            <NavBar expand='lg'>
                <span className={'header'}>
                    <Col>
                        <img src={MFS_Logo} className={'MFS-Logo'} alt={''}/>
                    </Col>
                    <Grid 
                        container justify="flex-end"
                        className={'linkPosition'}
                    >
                        <Link to={ROUTES.HOME}>Home</Link>
                
                        <a href="https://reactjs.org" className={'header-link'}>
                            About
                        </a>

                        <Link to={ROUTES.DISCOVER}>Get Your FREE Flood Score</Link>
                
                        <Link to={ROUTES.SIGN_IN}>Login</Link>

                        <a href="https://reactjs.org" className={'header-link'}>
                            Sign Up
                        </a>
                        <a href="https://reactjs.org" className={'header-link'}>
                            <img src={shoppingCart} className={'cart'} alt={''}/>
                        </a>
                    </Grid>
                </span>
            </NavBar>   
        </Row>
        </div>
        <Row className='bottomBorder'>
            <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{paddingTop: 20, marginBottom: 10}}
                >
                <a
                    className={'links2'}
                    href="https://reactjs.org"
                >
                    Discover
                </a>
                <a href="https://reactjs.org">
                    <img src={Discover} className={'links2logo'} alt={''}/>
                </a>
                <a
                    className={'links2'}
                    href="https://reactjs.org"
                >
                    Compare
                </a>
                <a href="https://reactjs.org">
                    <img src={Compare} className={'links2logo'} style={{marginLeft: -40, width: 120, height: 40}} alt={''}/>
                </a>
                <a
                    className={'links2'}
                    href="https://reactjs.org"
                >
                    Examine
                </a>
                <a href="https://reactjs.org">
                    <img src={Examine} className={'links2logo'} alt={''}/>
                </a>
                <a
                    className={'links2'}
                    href="https://reactjs.org"
                >
                    Certify
                </a>
                <a href="https://reactjs.org">
                    <img src={Certify} className={'links2logo'} alt={''}/>
                </a>
                <a
                    className={'links2'}
                    href="https://reactjs.org"
                >
                    Reduce or Eliminate
                </a>
                <a href="https://reactjs.org">
                    <img src={Reduce_Eliminate} className={'links2logo'} alt={''}/>
                </a>
            </Grid>
        </Row>
        
    </div>
    )
}

export default Header