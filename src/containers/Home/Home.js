import React from 'react'
import './Home.css'

import backgroundImage from '../../assets/images/Background-Image.jpg'
import ReactPlayer from 'react-player'
import { Parallax } from "react-parallax"
import { useFirebase } from '../../hooks'

import SecondRow from '../Header/SecondRow'
import AutoSuggest from '../../components/AutoSuggest/AutoSuggest'
import CheckMarks from './CheckMarks'

import * as ROUTES from '../../constants/routes'

function Home ({ history }) {
  const firebase = useFirebase()

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log('selected', suggestion)
    history.push(ROUTES.CHECKOUT_FREE, { selected: suggestion })
  }

  return (
    <>
      <SecondRow />
      <Parallax bgImage={backgroundImage} strength={500} style={{ zIndex: '0' }}>
        <div style={{ height: '500px' }}>
          <div className="headlineContainer">
            <h1 className="headline">Do You Know Your Flood Score?</h1>
            <h2 className="headline" style={{ fontSize: '30px', lineHeight: '1.4', marginBottom: '24px' }}>The Most Accurate Flood Risk Assessment for Home Owners</h2>
          </div>
          {/* <AutoSuggest
            theme={autoSuggestTheme}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{ id: 'homeAddressSuggest' }}
            firebase={firebase}
          /> */}
        </div>
      </Parallax>
      <div className="container2" >
        <AutoSuggest
          theme={autoSuggestTheme}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={{ id: 'homeAddressSuggest' }}
          firebase={firebase}
        />
        <h1 style={{  color: "#0d238e", textAlign: 'center', margin: 0 }}> Why You Should Know Your Flood Score</h1>
      </div>
      <div className="video">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Dvr7wFUX1wU"
          className="react-player"
          width="50%"
        />
      </div>
      <CheckMarks />
    </>
  )
}

export default Home

const autoSuggestTheme = {
  container: {
    zIndex: '5000',
    width: '100%',
    display: 'inline-grid',
    position: 'relative',
    padding: '0rem 0',
    borderRadius: '24px',
    top: '-260px',
    marginBottom: '-260px',
  },
  containerOpen: {
    zIndex: '5000',
  },
  input: {
    zIndex: '5000',
    width: '50%',
    margin: '0 auto',
    padding: '8px 7px 8px 20px',
    fontSize: '18px',
    color: 'black !important',
    borderRadius: '24px',
    border: '2px solid #55b96a',
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    boxShadow: '0px 1px 4px grey',
  },
  inputOpen: {
    zIndex: '5000',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
  },
  inputFocused: {
    zIndex: '5000',
    outline: 'none',
    boxShadow: '0px 1px 4px grey',
  },
  suggestionsContainer: {
    zIndex: '5000',
    background: 'white',
    margin: '0 auto',
    width: '50%',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    zIndex: '5000',
    boxShadow: '0px 1px 4px grey',
    border: '2px solid #55b96a',
    borderTop: '0',
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    // marginBottom: '-200px',
  },
  suggestionsList: {
    zIndex: '5000',
    listStyle: 'none',
    padding: '2px 0 2px 0',
  },
  suggestion: {
    zIndex: '5000',
    padding: '4px 20px 4px 20px',
    margin: '0 1px 0 1px',
    cursor: 'pointer',
  },
  suggestionFirst: {},
  suggestionHighlighted: {
    backgroundColor: '#E6F5E9',
  },
  sectionContainer: {
    zIndex: '5000',
    background: 'white',
    margin: '0 auto',
    width: '50%',
    position: 'relative',
  },
  sectionContainerFirst: {},
  sectionTitle: {},
}
