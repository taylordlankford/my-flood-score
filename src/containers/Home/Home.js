import React from 'react'
import './Home.css'
import { Image, Row, Col, Button, Container } from 'react-bootstrap'

import backgroundImage from '../../assets/images/Background-Image.jpg'
import ReactPlayer from 'react-player'
import { Parallax } from "react-parallax"
import { useFirebase } from '../../hooks'

import AutoSuggest from '../../components/AutoSuggest/AutoSuggest'
import CheckMarks from './CheckMarks'

import * as ROUTES from '../../constants/routes'

const insideStyles = {
  background: "white",
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

function Home ({ history }) {
  const firebase = useFirebase()

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log('selected', suggestion)
    history.push(ROUTES.CHECKOUT_FREE, { selected: suggestion })
  }

  return (
    <div>
      {/* <Image
        // style={{ backgroundSize: 'cover' }}
        src={backgroundImage}
        className="reframe"
        fluid
      /> */}
      {/* <img
        src={backgroundImage}
        alt="background"
      /> */}
      <Parallax bgImage={backgroundImage} strength={500}>
        <div style={{ height: '500px' }}>
          <div className="headlineContainer">
            <h1 className="headline">Do You Know Your Flood Score?</h1>
            <h2 className="headline" style={{ fontSize: '30px', lineHeight: '1.4', marginBottom: '24px' }}>The Most Accurate Flood Risk Assessment for Home Owners</h2>
          </div>
          <AutoSuggest
            theme={autoSuggestTheme}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{ id: 'homeAddressSuggest' }}
            firebase={firebase}
          />
        </div>
      </Parallax>
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
      <CheckMarks />
    </div>
  )
}

export default Home

const autoSuggestTheme = {
  container: {
    width: '100%',
    display: 'inline-grid',
    position: 'relative',
    padding: '17rem 0',
  },
  containerOpen: {},
  input: {
    width: '50%',
    margin: '0 auto',
    borderRadius: '24px',
    /* border: 1px solid lightgray; */
    border: '2px solid #55b96a',
    padding: '8px 7px 8px 20px',
    fontSize: '18px',
    transition: '0.2s',
    color: 'black !important',
  },
  inputOpen: {},
  inputFocused: {
    outline: 'none',
    boxShadow: '0px 1px 4px grey',
  },
  suggestionsContainer: {
    background: 'white',
    margin: '0 auto',
    width: '50%',
    position: 'relative',
  },
  suggestionsContainerOpen: {},
  suggestionsList: {},
  suggestion: {},
  suggestionFirst: {},
  suggestionHighlighted: {},
  sectionContainer: {
    background: 'white',
    margin: '0 auto',
    width: '50%',
    position: 'relative',
  },
  sectionContainerFirst: {},
  sectionTitle: {},
}