import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import "./styles.css";
import BgImg from "../../../assets/images/nff-bg-image.jpg";
import { Wrapper, Container } from "./StyledComponents";
import Loader from "./Loader"
import LOMARecommendations from "./LOMARecommendations";
import { hideSiteContainers } from "../helpers";
import { useDomains, useGetPropertyData, useGetImg } from "../eligibility-hooks"
// import { useFirebase } from "../../../hooks";

const Recommendation = props => {
  const { address, county } = props;
  const { pubDomain, devDomain } = useDomains();
  const { docData, loading } = useGetPropertyData(county, address);
  const { imgUrlData, imgLoading } = useGetImg(county, address);

  // const { LOMA, id, FEMA_ZONE } = propertyData;
  // const firebase = useFirebase();

  const [selectedAddress] = useState(address != null ? address : null);
  const [propertyData, setPropertyData] = useState(null);
  const [LOMARating, setLOMARating] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [femaZone, setFemaZone] = useState("");

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

  if (loading) {
    return (
      <Loader animation="border" />
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
