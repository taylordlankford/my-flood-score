import styled from 'styled-components'

export const SecondRowContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(5, auto); */
  grid-template-columns: repeat(auto-fit, minmax(100px, auto)) ;
  grid-gap: 10px;
  margin: 0 auto;
  max-width: 1080px;
  padding-left: 20px;
  padding-right: 20px;
`

export const SecondRowWrapper = styled.div`
  margin: auto 0;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 10px solid #0d238e;
  height: 90px;
  transition: all 0.5ms;
  transition-timing-function: ease-in-out;

  &:hover {
    color: #66de80 !important;
    transition: all 0.2s !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  @media (min-width: 750px) and (max-width: 1079px) {
    height: 100px;
  }

  @media (min-width: 642px) and (max-width: 855px) {
    height: 140px;
  }

  @media (min-width: 409px) and (max-width: 641px) {
    height: 280px;
  }
`;

export const ServiceImg = styled.img`
  width: 50px;
  height: 50px;
`

export const ServiceLink = styled.span`
  color: #55B96A;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #66de80 !important;
    cursor: pointer;
  }
`

export const ServiceName = styled.span`
  padding-left: 6px;
`
