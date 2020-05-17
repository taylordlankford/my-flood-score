import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const BasisOfDetermination = ({ propertyData, basisOfDetermination }) => {
  return (
    <Container>
        {basisOfDetermination.map((item, idx) => (
          <div key={idx}>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>
              {item.info}
            </span>
          </div>
        ))
        }
    </Container>
  )
}

export default BasisOfDetermination;

const Container = styled.div`
  display: grid;
  grid-gap: 4px;
  padding-left: 40px;
`
