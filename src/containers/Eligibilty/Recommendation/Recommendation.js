import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import styled from "styled-components";
import "./styles.css";
import BgImg from "../../../assets/images/nff-bg-image.jpg";
import * as S from "./StyledComponents";

import Loading from "./Loading";
import LOMARecommendations from "./LOMARecommendations";

import { hideSiteContainers } from "../helpers";
import { useFirebase } from "../../../hooks";

const Recommendation = props => {
  const { address } = props;
  const firebase = useFirebase();

  const [selectedAddress, setSelectedAddress] = useState(
    address != null ? address : ""
  );
  const [propertyData, setPropertyData] = useState(null);
  const [LOMARating, setLOMARating] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [femaZone, setFemaZone] = useState("");

  useEffect(() => {
    let iframeUrl = "https://flood-score.firebaseapp.com/search-eligibility";
    let localhostUrl = "http://localhost:3000/search-eligibility";
    let hideSurrounding =
      window.location.href === iframeUrl ||
      window.location.href === localhostUrl;

    if (hideSurrounding) {
      hideSiteContainers();
    }
  }, []);

  useEffect(() => {
    setSelectedAddress(selectedAddress);
    getPropertyData(selectedAddress).then(data => {
      console.log("data", data);
      const { propertyData, LOMA, id, FEMA_ZONE } = data;
      getImg(id).then(url => {
        setImgUrl(url)
      })
      setPropertyData(propertyData);
      setLOMARating(LOMA);
      setFemaZone(FEMA_ZONE);
    });
  }, [selectedAddress, imgUrl]);

  /**
   * Get Image
   */
  const getImg = nff_id => {
    return new Promise((resolve, reject) => {
      firebase.getDownloadURL(nff_id).then(url => {
        if (url !== null || typeof url !== "undefined") {
          resolve(url)
        }
      });
    })
  };

  /**
   * Gets all the data needed for the rest of the children component needs.
   */
  const getPropertyData = async selectedAddress => {
    return new Promise((resolve, reject) => {
      firebase.doFirestoreAddressRefGet(selectedAddress).then(properties => {
        const propertyDoc = properties[0];
        const { id } = propertyDoc;
        if (typeof id !== "undefined") {
          firebase.doFirestoreDocGet("properties", id).then(data => {
            const propertyData = data;
            const { LOMA } = propertyData;
            resolve({ propertyData, LOMA, id });
          });
        }
      });
    });
  };

  if (propertyData == null) {
    return <Loading />;
  }

  return (
    <S.Wrapper>
      <Parallax
        contentClassName="recommendation-parallax"
        bgImage={BgImg}
        strength={400}
      >
        <S.Container>
          <LOMARecommendations
            propertyData={propertyData}
            LOMARating={LOMARating}
            femaZone={femaZone}
            selectedAddress={selectedAddress}
            imgUrl={imgUrl}
          />
        </S.Container>
      </Parallax>
    </S.Wrapper>
  );
};

export default Recommendation;
