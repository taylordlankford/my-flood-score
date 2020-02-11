import React from 'react'
import './Home.css'

import backgroundImage from '../../assets/images/Background-Image.jpg'
import ReactPlayer from 'react-player'
import { Parallax } from "react-parallax"
import { useFirebase, useFirestoreUser } from '../../hooks'

import SecondRow from '../Header/SecondRow'
import AutoSuggest from '../../components/AutoSuggest/AutoSuggest'
import CheckMarks from './CheckMarks'
import Products from './Products/Products'
import Testimonials from './Testimonials/Testimonials'

import Eligibility from "../Eligibilty/Eligibility";

// Data
import { TESTIMONIAL_TITLE, TESTIMONIAL_LIST } from './Testimonials/TestimonialData'
// import * as ROUTES from '../../constants/routes'
import * as ROUTES from '../../routes/constants/routes'
import Container from "react-bootstrap/Container"

function Home ({ history }) {
  const firebase = useFirebase()
  const { firestoreUser } = useFirestoreUser()

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log('selected', suggestion)
    if (firestoreUser) {
      history.push(ROUTES.GET_REPORT, { selected: suggestion })
    } else {
      history.push(ROUTES.CHECKOUT_FREE, { selected: suggestion })
    }
  }

  return (
    <>
      <SecondRow />
      <Parallax bgImage={backgroundImage} strength={600}>
        <Container>
          <div className="headlineWrapper" style={{ height: "500px" }}>
            <div className="headlineContainer">
              <h1 className="headline">Do You Know Your Flood Score?</h1>
              <h2 className="headline subtitle">
                The Most Accurate Flood Risk Assessment for Home Owners
              </h2>
            </div>
          </div>
        </Container>
      </Parallax>
      <div className="container2">
        <Container className="autosuggestWrapper">
          <AutoSuggest
            theme={autoSuggestTheme}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{ id: "homeAddressSuggest" }}
            firebase={firebase}
          />
        </Container>
        <h1 className="video-title">Why You Should Know Your Flood Score</h1>
      </div>
      <div className="video">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Dvr7wFUX1wU"
          width="747px"
          height="420px"
          playing={true}
          light={true}
        />
      </div>
      <Eligibility />
      <CheckMarks />
      <Products />
      <iframe
        src="https://flood-score.firebaseapp.com/search-eligibility"
        style={{ minHeight: "1440px", width: "100%" }}
      />
      <Testimonials
        testimonialTitle={TESTIMONIAL_TITLE}
        testimonialList={TESTIMONIAL_LIST}
      />
    </>
  );
}

export default Home

const autoSuggestTheme = {
  container: {
    width: '100%',
    display: 'inline-grid',
    position: 'relative',
    padding: '0rem 0',
    borderRadius: '24px',
    top: '-260px',
    marginBottom: '-260px',
  },
  containerOpen: {},
  input: {
    width: '100%',
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
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
  },
  inputFocused: {
    outline: 'none',
    boxShadow: '0px 1px 4px grey',
  },
  suggestionsContainer: {
    background: 'white',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    boxShadow: '0px 1px 4px grey',
    border: '2px solid #55b96a',
    borderTop: '0',
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    // marginBottom: '-200px',
  },
  suggestionsList: {
    listStyle: 'none',
    padding: '2px 0 2px 0',
  },
  suggestion: {
    padding: '4px 20px 4px 20px',
    margin: '0 1px 0 1px',
    cursor: 'pointer',
  },
  suggestionFirst: {},
  suggestionHighlighted: {
    backgroundColor: '#E6F5E9',
  },
  sectionContainer: {
    background: 'white',
    margin: '0 auto',
    width: '50%',
    position: 'relative',
  },
  sectionContainerFirst: {},
  sectionTitle: {},
}
