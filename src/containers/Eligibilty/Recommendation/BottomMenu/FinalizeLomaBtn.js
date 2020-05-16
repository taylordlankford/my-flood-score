import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { StyledContainer } from "./StyledBottomMenu";

const FinalizeLomaBtn = () => {
  const [orderLomaUrl] = useState("https://www.nofloodflorida.com/orderloma/")

  return (
    <StyledContainer>
      <a
        href={orderLomaUrl}
        rel="noopener noreferrer"
        target="_top"
      >
        <Button>Finalize LOMA Request</Button>
      </a>
    </StyledContainer>
  )
}

export default FinalizeLomaBtn;