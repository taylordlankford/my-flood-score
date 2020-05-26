import React, { useState } from "react";
import styled from "styled-components"

const RecommendationFooter = () => {
  const [phoneNumber] = useState("813-213-0641")

  return (
    <FooterWrapper>
      Learn more about the LOMA by visiting our{" "}
      <u>
        <a
          href="https://www.nofloodflorida.com/loma/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#16163F' }}
        >
          LOMA
        </a>
      </u>{" "}
      page or call {phoneNumber}
    </FooterWrapper>
  );
};

export default RecommendationFooter;

const FooterWrapper = styled.div`
  margin-top: 40px;
  font-size: 20px;
  background-color: #C7AE4A;
  color: #16163F;
  padding: 4px 40px 4px 40px;
  text-align: center;
  height: max-content;
`