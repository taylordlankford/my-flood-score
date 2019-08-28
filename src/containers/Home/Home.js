import React from 'react'
import './Home.css'
import {
    Button,
    withStyles,
    Grid,
} from '@material-ui/core'
import {Image, Row, Col} from 'react-bootstrap'
import backgroundImage from '../../assets/images/Background-Image.jpg'
import ReactPlayer from 'react-player'

function Home () {
    var background = {backgroundSize: 'cover'};
    var textStyle = {
        position: 'absolute', 
      };
    return (
        <div className={'container'}>
        <Image 
            style = {background} responsive
            src = {backgroundImage}
            className={'reframe'}
        ></Image>
            <Row className={'fontStyle'} style={textStyle}>
                <h1 style={{paddingBottom: 10}}>Do You Know Your Flood Score?</h1>
                <h2 className={'lineGap'}>The Most Accurate Flood Risk Assessment for</h2>
                <h2>Home Owners</h2>
                <div className={'buttonStyle'}>
                    <Button 
                        variant="contained"
                        size='large'
                        style={{
                            backgroundColor: '#55B96A',
                            color: 'white',
                            fontFamily: 'Montserrat", sans-serif',
                            fontWeight: 'bold'
                        }}
                    >
                        See My Score
                    </Button>
                </div>
            </Row>
            <div className={'container2'} >
                <h1 style={{color: '#0d238e'}}> Why You Should Know Your Flood Score</h1>
            </div>
            <div className={'video'}>
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=Dvr7wFUX1wU'
                        className='react-player'
                        playing
                        width='50%'
                    />
            </div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <div >
                    <h2 style={{paddingRight: 40}}>LOWER PREMIUMS</h2>
                    {/* <p style={{paddingRight: 40}}>For 1000’s of homeowners our Flood Score could help to reduce or even eliminate flood premiums.</p> */}
                </div>
                
                <h2 style={{margin: 40}}>KNOW AND COMPARE</h2>
                <h2 style={{margin: 40}}>EARLY INDICATIONS</h2>
            </Grid>
        
        </div>

  )
}

export default Home
