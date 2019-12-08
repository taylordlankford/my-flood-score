import styled from "styled-components";

export const Title = styled.div`
  color: #0d238e;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0em;
`;

export const StyledLink = styled.span`
  color: #66de80;
  font-weight: 500;

  &:hover {
    color: #55b96a;
    cursor: pointer;
    transition: 0.3s;
  }
`;

export const StyledDropdownMenuItem = styled.div`
  padding: 10px;

  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
    transition: 0.3s;
  }
`;