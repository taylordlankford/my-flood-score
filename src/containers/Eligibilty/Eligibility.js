import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import BgImg from "../../assets/images/nff-bg-image.jpg";
import * as S from "./StyledComponents";
import styled from "styled-components";
import "./styles.css";
import {
  menuStyle,
  autosuggestTheme,
  AutoSuggestWrapper,
  AutoSuggestContainer,
  IframeSearchBtn
} from "./StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AutoSuggest from "../../components/AutoSuggest/AutoSuggest";
import { useFirestoreUser, useFirebase } from "../../hooks";

import Screening from "./Screening/Screening";
import Recommendation from "./Recommendation/Recommendation";

import { hideSiteContainers } from "./helpers";

const Eligibility = props => {
  const { firestoreUser } = useFirestoreUser();
  const firebase = useFirebase();

  const [showSearch, setShowSearch] = useState(true);
  const [showScreening, setShowScreening] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    let hideSurrounding =
      window.location.href === "https://flood-score.firebaseapp.com/search-eligibility" ||
      window.location.href === "http://localhost:3000/search-eligibility";

    if (hideSurrounding) {
      hideSiteContainers();
    }
  });

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    console.log("selected", suggestion);
    setSelectedAddress(suggestion);
    console.log("Selected Address ==> ", selectedAddress);
  };

  const handleOnClick = e => {
    // e.preventDefault();
    setShowSearch(false);
    setShowScreening(true);
  };

  /**
   * Render recommendation
   */
  if (showRecommendation) {
    return (
      <Recommendation address={selectedAddress} />
    )
  }


  /**
   * Render screening component
   */
  if (showScreening) {
    return (
      <Screening
        selected={selectedAddress}
        setShowRecommendation={setShowRecommendation}
      />
    );
  }

  /**
   * Render IFrame Landing
   */
  if (showSearch) {
    return (
      <IFrameLanding
        onSuggestionSelected={onSuggestionSelected}
        firebase={firebase}
        handleOnClick={handleOnClick}
      />
    );
  }
};

const IFrameLanding = props => {
  const { onSuggestionSelected, firebase, handleOnClick } = props;
  return (
    <S.ParallaxWrapper>
      <Parallax contentClassName="parallax-bg" strength={200}>
        <S.ParallaxContainer>
          <S.MainTitle>
            Best Available Technology & Flood Risk Models
          </S.MainTitle>
          <S.Subtitle>
            Let’s take the first step together and help you save thousands on
            your flood insurance.{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nofloodflorida.com/orderloma/"
            >
              <span style={{ fontWeight: "700", color: "#C7AE4A" }}>
                Find out if you qualify for a Letter of Map Amendment!
              </span>{" "}
            </a>
          </S.Subtitle>
          {/* }<SearchEligibility /> */}
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <Row xs={12} style={{ margin: "0 auto", maxWidth: "800px" }}>
              <Col xs={10} style={{ padding: "0", margin: "0" }}>
                <AutoSuggest
                  autocomplete="off"
                  theme={autosuggestTheme}
                  onSuggestionSelected={onSuggestionSelected}
                  inputProps={{ id: "homeAddressSuggest" }}
                  firebase={firebase}
                />
              </Col>
              <Col xs={2} style={{ padding: "0", margin: "0" }}>
                <IframeSearchBtn onClick={e => handleOnClick(e)}>
                  Proceed
                </IframeSearchBtn>
              </Col>
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
        </S.ParallaxContainer>
      </Parallax>
    </S.ParallaxWrapper>
  );
};

const HeaderContainer = styled.div`
  text-align: center;
  color: #fff;
  padding-top: 40px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5em;
`;

export default Eligibility;
