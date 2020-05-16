import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { StyledContainer } from "./StyledBottomMenu";

const SearchAnotherPropertyBtn = () => {
  const [mainPageUrl] = useState('https://www.nofloodflorida.com/')

  return (
    <StyledContainer>
      <a href={mainPageUrl}>
        <Button>SEARCH ANOTHER PROPERTY</Button>
      </a>
    </StyledContainer>
  )
}

export default SearchAnotherPropertyBtn

