import React from 'react'
import './Header.css'
import MFS_Logo from '/Users/Kulow/React/myflood-score/src/images/MFS_Logo2_572019-2.png'
import NavBar from 'react-bootstrap/Navbar'
import {Row, Col} from 'react-bootstrap'
import {
    Container,
    Grid,
    Link,
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
    <div>
    <div className={'Headercontainer'}>
        <Row >
            {/* <NavBar expand='lg'> */}
                <span className={'header'}>
                    <Col>
                        <img src={MFS_Logo} className={'MFS-Logo'} alt={''}/>
                    </Col>
                    <Grid 
                        container justify="flex-end"
                        className={'linkPosition'}
                    >
                        <a href="https://reactjs.org" className={'link'}>
                            Home
                        </a>
                
                        <a href="https://reactjs.org" className={'link'}>
                            About
                        </a>
                
                        <a href="https://reactjs.org" className={'link'}>
                            Get Your FREE Flood Score
                        </a>
                
                        <a href="https://reactjs.org" className={'link'}>
                            Login
                        </a>

                        <a href="https://reactjs.org" className={'link'}>
                            Sign Up
                        </a>
                    </Grid>
                </span>
            {/* </NavBar>    */}
        </Row>
        </div>
        <Row>
            <Grid>
                <Button 
                    className={classes.button}
                >
                    Discover
                </Button>
            </Grid>
        </Row>
        
    </div>
    )
}

export default Header