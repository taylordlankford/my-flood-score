import styled from "styled-components";

export const Title = styled.div`
  color: #0d238e;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0em;
  padding-bottom: 30px;
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

export const InfBtn = styled.a`
  &,
  &:link,
  &:visited {
    text-align: center;
    margin-bottom: 35px;
    color: white !important;
    cursor: pointer;
    background-color: #8560a8;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
  }

  &:hover {
    background-position: 100%;
    color: white;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }
`;

export const PrimaryBtn = styled.a`
  &,
  &:link,
  &:visited {
    text-align: center;
    color: white !important;
    cursor: pointer;
    background-color: #55b96a;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
  }

  &:hover {
    background-position: 100%;
    color: white;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }
`;

export const SecondaryBtn = styled.a`
  &,
  &:link,
  &:visited {
    text-align: center;
    color: white !important;
    cursor: pointer;
    background-color: #666666;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%
    );
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    display: inline-block;
    padding: 0.62rem 1.25rem;
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
  }

  &:hover {
    background-position: 100%;
    color: white;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }
`;
