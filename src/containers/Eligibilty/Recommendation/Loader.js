import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

/**
 * Loader for going from screening form to recommendations.
 */
const Loader = props => {
  const { animation } = props
  return (
    <SpinnerWrapper>
      <SpinnerContainer>
        <Spinner size="lg" animation={animation} role="status" style={{ color: "#fff" }}>
          <SpinnerMsg className="sr-only" style={{ color: "#fff" }}>
            Loading...
          </SpinnerMsg>
        </Spinner>
      </SpinnerContainer>
    </SpinnerWrapper>
  )
}

export default Loader;

const SpinnerMsg = styled.span`
  color: #666666;
`

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
`