import React from 'react'
import './Home.css'
import {
    Button,
    Grid,
} from '@material-ui/core'
import {Image, Row, Col} from 'react-bootstrap'
import backgroundImage from '../../assets/images/Background-Image.jpg'
import ReactPlayer from 'react-player'

function Home () {
  return (
    <div className={'container'}>
      <Image
        responsive
        style={{ backgroundSize: 'cover' }}
        src={backgroundImage}
        className="reframe"
      />
      <Row className={'fontStyle'} style={{ position: 'absolute' }}>
        <h1 style={{paddingBottom: 10}}>Do You Know Your Flood Score?</h1>
        <h2 className={'lineGap'}>The Most Accurate Flood Risk Assessment for</h2>
        <h2>Home Owners</h2>
        <div className="buttonStyle">
          <Button 
            variant="contained"
            size="large"
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
      <div className="container2" >
        <h1 style={{  color: "#0d238e" }}> Why You Should Know Your Flood Score</h1>
      </div>
      <div className="video">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Dvr7wFUX1wU"
          className="react-player"
          width="50%"
        />
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <h2 style={{paddingRight: 40}}>LOWER PREMIUMS</h2>
        <h2 style={{margin: 40}}>KNOW AND COMPARE</h2>
        <h2 style={{margin: 40}}>EARLY INDICATIONS</h2>
      </Grid>
    </div>
  )
}

export default Home
