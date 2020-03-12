import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import styled from "styled-components";
import "./styles.css";
import BgImg from "../../../assets/images/nff-bg-image.jpg";
import * as S from "./StyledComponents";

import Faq from "./Faq";
import High from "./High";
import Medium from "./Medium";
import Low from "./Low";
import NotRecommended from "./NotRecommended";
import Loading from "./Loading";

import { hideSiteContainers } from "../helpers";
import { useFirebase } from "../../../hooks";

const Recommendation = props => {
  // const { address } = location.state;
  const { address } = props;
  const firebase = useFirebase();

  const [selectedAddress, setSelectedAddress] = useState(
    address != null ? address : ""
  );
  const [propertyData, setPropertyData] = useState(null);
  const [LOMARating, setLOMARating] = useState("");
  const [NFFID, setNFFID] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    let hideSurrounding =
      window.location.href ===
      "https://flood-score.firebaseapp.com/search-eligibility" ||
      window.location.href === "http://localhost:3000/search-eligibility";

    if (hideSurrounding) {
      hideSiteContainers();
    }

    if (selectedAddress != null || selectedAddress !== "") {
      setSelectedAddress(selectedAddress);
      getPropertyRef(selectedAddress).then(data => {
        const { propertyData, LOMA, id } = data;
        setPropertyData(propertyData);
        setLOMARating(LOMA);
        setNFFID(id);
        getImg();
      })
    }
  }, [selectedAddress, NFFID, imgUrl]);

  /**
   * Get Image
   */
  const getImg = () => {
    if (NFFID !== "" || NFFID !== null) {
      firebase.getDownloadURL(NFFID).then(url => {
        setImgUrl(url);
      });
    }
  };

  /**
   * Gets all the data needed for the rest of the children component needs.
   */
  const getPropertyRef = async selectedAddress => {
    return new Promise((resolve, reject) => {
      firebase.doFirestoreAddressRefGet(selectedAddress).then(properties => {
        const propertyDoc = properties[0];
        const { id } = propertyDoc;
        if (typeof id !== "undefined") {
          setNFFID(id);
          firebase.doFirestoreDocGet("properties", id).then(data => {
            const propertyData = data;
            const { LOMA } = propertyData;
            resolve({ propertyData, LOMA, id });
          });
          // firebase.doFirestoreWhereGet('properties', 'NFF_ID', '==', id).then(data => {
          //   if (typeof data.docs[0]._document.proto.fields != 'undefined') {
          //     const propertyData = data.docs[0]._document.proto.fields
          //     const { LOMA } = propertyData
          //     setLOMARating(LOMA)
          //     setPropertyData(propertyData)
          //     const { NFF_ID } = propertyData
          //     setNFFID(NFF_ID.stringValue)
          //   }
          // })
        }
      });
    });
  };

  /**
   * Get the correct LOMA category.
   */
  const getLOMARecommendation = LOMARating => {
    console.log("LOMARating => ", LOMARating);
    switch (LOMARating) {
      case 0:
        return "n/a";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default: {
        return "n/a";
      }
    }
  };

  /**
   * Render different descriptions based on category.
   */
  const LOMARecommendations = ({ propertyData, LOMACategory }) => {
    const { FEMA_ZONE } = propertyData;

    switch (LOMARating) {
      case 0:
        return (
          <NotRecommended
            getLOMARecommendation={getLOMARecommendation}
            LOMARating={LOMARating}
            LOMACategory={LOMACategory}
            femaZone={FEMA_ZONE}
            selectedAddress={selectedAddress}
            propertyData={propertyData}
          />
        );
      case 1:
        return (
          <Low
            getLOMARecommendation={getLOMARecommendation}
            LOMARating={LOMARating}
            LOMACategory={LOMACategory}
            femaZone={FEMA_ZONE}
            selectedAddress={selectedAddress}
            propertyData={propertyData}
          />
        );
      case 2:
        return (
          <Medium
            getLOMARecommendation={getLOMARecommendation}
            LOMARating={LOMARating}
            LOMACategory={LOMACategory}
            femaZone={FEMA_ZONE}
            selectedAddress={selectedAddress}
            propertyData={propertyData}
            imgUrl={imgUrl}
          />
        );
      case 3:
        return (
          <High
            getLOMARecommendation={getLOMARecommendation}
            LOMARating={LOMARating}
            LOMACategory={LOMACategory}
            femaZone={FEMA_ZONE}
            selectedAddress={selectedAddress}
            propertyData={propertyData}
            imgUrl={imgUrl}
          />
        );
      default: {
        return "N/A";
      }
    }
  };

  if (propertyData == null) {
    return (
      <Loading />
    )
  }

  return (
    <S.Wrapper>
      <Parallax
        contentClassName="recommendation-parallax"
        bgImage={BgImg}
        strength={200}
      >
        <S.Container>
          <LOMARecommendations
            propertyData={propertyData}
            LOMACategory={getLOMARecommendation(LOMARating)}
          />
        </S.Container>
      </Parallax>
    </S.Wrapper>
  );
};

export default Recommendation;
