import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import LikelihoodAnalysis from "../LikelihoodAnalysis/LikelihoodAnalysis.js"
// import BasisOfDetermination from "../BasisOfDetermination/BasisOfDetermination"

const InfoBox = (props) => {
  const { 
    LOMARating,
    selectedAddress, 
    propertyData, 
    suggestion, 
    basisOfDetermination 
  } = props

  return (
    <InfoBoxWrapper>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
          Property Address:
        </span>
        <span style={{ fontWeight: "500" }}>{selectedAddress}</span>
      </div>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
          FEMA Flood Zone:
        </span>
        <span style={{ fontWeight: "500" }}>
          {propertyData.FEMA_ZONE}
        </span>
      </div>
      <div>
        <FaCheck />
        <LikelihoodAnalysis propertyData={propertyData} LOMARating={LOMARating} suggestion={suggestion} />
      </div>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px" }}>
          Basis of this determination:
        </span>
      </div>
      <StyledBasisOfDetermination>
        {basisOfDetermination.map((item, idx) => (
          <div key={idx}>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>
              {item.info}
            </span>
          </div>
        ))
        }
      </StyledBasisOfDetermination>
    </InfoBoxWrapper>
  );
};

export default InfoBox;

const InfoBoxWrapper = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: grid;
  grid-gap: 20px;
`;

const StyledBasisOfDetermination = styled.div`
  display: grid;
  grid-gap: 4px;
  padding-left: 40px;
`