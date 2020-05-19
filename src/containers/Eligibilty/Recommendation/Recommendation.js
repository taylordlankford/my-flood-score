import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import "./styles.css";
import BgImg from "../../../assets/images/nff-bg-image.jpg";
import { Wrapper, Container, LoadingText, LoadingWrapper } from "./StyledComponents";
import Spinner from "react-bootstrap/Spinner";
import LOMARecommendations from "./LOMARecommendations";
import { hideSiteContainers } from "../helpers";
import { useDomains, useGetPropertyData, useGetImg } from "../eligibility-hooks"

const Recommendation = props => {
  const { address, county } = props;
  const { pubDomain, devDomain } = useDomains();
  const { docData, loading } = useGetPropertyData(county, address);
  const { imgUrlData, imgLoading } = useGetImg(county, address);

  const [selectedAddress] = useState(address != null ? address : null);
  const [propertyData, setPropertyData] = useState(null);
  const [LOMARating, setLOMARating] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [femaZone, setFemaZone] = useState("");
  const [fakeLoading1, setFakeLoading1] = useState(true)
  const [fakeLoading2, setFakeLoading2] = useState(true)

  useEffect(() => {
    let hideSurrounding = window.location.href === pubDomain || window.location.href === devDomain

    if (hideSurrounding) {
      hideSiteContainers();
    }
  }, [pubDomain, devDomain]);

  useEffect(() => {
    console.log('in useeffect docData:', docData)
    if (docData !== null || docData !== undefined) {
      let data = { ...docData }
      const { FEMA_ZONE } = data;
      const { LOMA } = data;
      setFemaZone(FEMA_ZONE)
      setLOMARating(LOMA)
      setPropertyData({ ...docData });
    }
  }, [docData])

  useEffect(() => {
    if (imgUrlData !== null || imgUrlData !== undefined) {
      setImgUrl(imgUrlData)
    }
  }, [imgUrlData, imgLoading])

  if (loading || fakeLoading1) {
    setTimeout(() => {
      setFakeLoading1(false)
    }, 1200)
    return (
      <LoadingWrapper style={{ background: `linear-gradient(0deg,rgba(22, 22, 63, 0.90),rgba(22, 22, 63, 0.90)), url(${BgImg})` }}>
        <Spinner size="lg" animation="border" role="status" style={{ color: "#fff", alignSelf: 'center' }} />
        <LoadingText>Getting Property Data...</LoadingText>
      </LoadingWrapper>
    )
  }

  if (fakeLoading2) {
    setTimeout(() => {
      setFakeLoading2(false)
    }, 2000)
    return (
      <LoadingWrapper style={{ background: `linear-gradient(0deg,rgba(22, 22, 63, 0.90),rgba(22, 22, 63, 0.90)), url(${BgImg})` }}>
        <Spinner size="lg" animation="border" role="status" style={{ color: "#fff", alignSelf: 'center' }} />
        <LoadingText>Analyzing Data...</LoadingText>
      </LoadingWrapper>
    )
  }

  return (
    <Wrapper>
      <Parallax
        contentClassName="recommendation-parallax"
        bgImage={BgImg}
        strength={400}
      >
        <Container>
          <LOMARecommendations
            propertyData={propertyData}
            LOMARating={LOMARating}
            femaZone={femaZone}
            selectedAddress={selectedAddress}
            imgUrl={imgUrl}
          />
        </Container>
      </Parallax>
    </Wrapper>
  );
};

export default Recommendation;
