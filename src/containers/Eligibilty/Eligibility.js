import React, { useEffect, useState, useRef } from "react";
import { useFirebase } from "../../hooks";
import { useDomains } from "./eligibility-hooks";

/* Styles */
import "./styles.css";
import { Parallax } from "react-parallax";
// import BgImg from "../../assets/images/nff-bg-image.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  ParallaxWrapper,
  ParallaxContainer,
  MainTitle,
  Subtitle,
  SubtitleLink,
  IframeSearchBtn,
  HeaderContainer,
} from "./styled-eligibility"

/* Components */
import AutoSuggest from "../../components/AutoSuggest/AutoSuggest";
import Screening from "./Screening/Screening";
import Recommendation from "./Recommendation/Recommendation";
import { hideSiteContainers } from "./helpers";

const Eligibility = () => {
  const firebase = useFirebase();
  const { pubDomain, devDomain } = useDomains();
  // const { firestoreUser } = useFirestoreUser();

  const [showSearch, setShowSearch] = useState(true);
  const [showScreening, setShowScreening] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(null);

  useEffect(() => {
    let hideSurrounding = window.location.href === pubDomain || window.location.href === devDomain;

    if (hideSurrounding) {
      hideSiteContainers();
    }
  }, []);

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    setSelectedAddress(suggestion);
  }

  function updateParentCountyState(county) {
    setSelectedCounty(county)
  }

  const handleOnClick = () => {
    setShowSearch(false);
    setShowScreening(true);
  };

  /* Render recommendation */
  if (showRecommendation) {
    console.log('showing recommendation')
    console.log('selectedCounty:', selectedCounty)
    console.log('selectedAddress:', selectedAddress)
    return (
      <Recommendation county={selectedCounty} address={selectedAddress} />
    )
  }


  /* Render screening component */
  if (showScreening) {
    return (
      <Screening
        selected={selectedAddress}
        setShowRecommendation={setShowRecommendation}
      />
    );
  }

  /* Render IFrame Landing */
  if (showSearch) {
    return (
      <IFrameLanding
        onSuggestionSelected={onSuggestionSelected}
        updateParentCountyState={updateParentCountyState}
        firebase={firebase}
        handleOnClick={handleOnClick}
        selectedCounty={selectedCounty}
      />
    );
  }
};

const IFrameLanding = props => {
  const { onSuggestionSelected, updateParentCountyState, firebase, handleOnClick } = props
  return (
    <ParallaxWrapper>
      <Parallax contentClassName="parallax-bg" strength={200}>
        <ParallaxContainer>
          <MainTitle>
            Best Available Technology <br /> & Flood Risk Models
          </MainTitle>
          <Subtitle>
            Let’s take the first step together and help you save thousands on
            your flood insurance.{" "}
            <SubtitleLink
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nofloodflorida.com/orderloma/"
            >
              Find out if you qualify for a Letter of Map Amendment!
            </SubtitleLink>
          </Subtitle>
          <div style={{ paddingLeft: "10px", paddingRight: "10px", textAlign: 'center' }}>
            <Row xs={12} style={{ margin: "0 auto", maxWidth: "800px" }}>
              <Col xs={10} style={{ padding: "0", margin: "0", margin: '0 auto' }}>
                <AutoSuggest
                  autocomplete="off"
                  theme={autosuggestTheme}
                  countySelectStyles={countySelectStyles}
                  updateParentCountyState={updateParentCountyState}
                  onSuggestionSelected={onSuggestionSelected}
                  inputProps={{ id: "eligibilityAddressSuggest" }}
                  firebase={firebase}
                  showProceedButton={true}
                  handleProceedButton={e => handleOnClick(e)}
                />
              </Col>
                {/* <Col xs={2} style={{ padding: "0", margin: "0", top: '27px' }}>
                  <IframeSearchBtn onClick={e => handleOnClick(e)}>
                    Proceed
                  </IframeSearchBtn>
                </Col> */}
            </Row>
          </div>
          );
          <HeaderContainer>
            <p style={{ margin: "0 auto", maxWidth: "400px" }}>
              Over 650,000 properties analyzed!
            </p>
            <p style={{ margin: "0 auto", maxWidth: "720px" }}>
              Can’t find your property?{" "}
              <u style={{ color: "#007bff" }}>Contact us</u> for a custom
              screening.
            </p>
          </HeaderContainer>
        </ParallaxContainer>
      </Parallax>
    </ParallaxWrapper>
  );
};

export default Eligibility;

/* Auto Suggest Theme Styles */
const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  zIndex: '999',
}

const autosuggestTheme = {
  container: {
    width: '100%',
    color: '#666666',
    fontWeight: '500',
    position: 'relative',
    top: '6px',
  },

  containerOpen: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: '999',
    position: 'relative',
  },

  input: {
    fontWeight: '500',
    color: "#666666",
    width: '100%',
    padding: '10px 40px 10px 40px',
    height: '3rem',
    border: 'none',
  },

  inputOpen: {
    fontWeight: '500',
    color: "#666666",
    padding: '10px 40px 10px 40px',
    border: 'none',
  },

  inputFocused: {
    outline: 'none',
  },

  suggestionsContainer: {
    maxHeight: '300px',
    margin: '0',
    padding: '0',
    /* overflow: 'scroll', */
    zIndex: '999',
    textAlign: 'left',
  },

  /**
   * Position absolute here will not push the containers underneath down.
   */
  suggestionsContainerOpen: {
    width: '100%',
    /* overflow: 'scroll', */
    zIndex: '999',
    backgroundColor: '#fff',
    position: 'absolute'
  },

  suggestionsList: {
    listStyleType: 'none',
    borderTop: '1px solid #eee',
    paddingRight: '40px',
    /* overflow: 'scroll', */
    paddingBottom: '10px',
    marginBottom: '0'
  },

  suggestion: {
    paddingTop: '4px',
    paddingBottom: '4px',
    cursor: 'pointer',
  },

  suggestionHighlighted: {
    backgroundColor: '#eeeeee',
    fontWeight: '600',
  },

  suggestionFirst: {},
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {},
}

const countySelectStyles = {
  position: 'relative',
  margin: '0 auto',
  top: '-40px',
  marginBottom: '-40px',
  width: '50%',
  color: 'white'
}
