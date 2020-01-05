import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes/constants/routes'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certify from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import Discover from '../../assets/images/Discover.svg'

import styled from 'styled-components'

const SecondRow = () => (
  <SecondRowWrapper>
    <SecondRowContainer>
    <Link to={ROUTES.DISCOVER} className="links2">
      <img src={Discover} className={'links2logo'} alt="discover" />
      <span style={{ paddingLeft: "6px "}}>Discover</span>
    </Link>
    <Link to={ROUTES.COMPARE} className="links2">
      <img src={Compare} className={'links2logo'} alt="compare" />
      <span style={{ paddingLeft: "6px" }}>Compare</span>
    </Link>
    <Link to={ROUTES.EXAMINE} className="links2">
      <img src={Examine} className={'links2logo'} alt="examine" />
      <span style={{ paddingLeft: "6px" }}>Examine</span>
    </Link>
    <Link to={ROUTES.CERTIFY} className="links2">
      <img src={Certify} className={'links2logo'} alt="certify" />
      <span style={{ paddingLeft: "6px" }}>Certify</span>
    </Link>
    <Link to={ROUTES.REDUCE} className="links2">
      <img src={Reduce_Eliminate} className={'links2logo'} alt="reduce-or-eliminate" />
      <span style={{ paddingLeft: "6px" }}>Reduce or Eliminate</span>
    </Link>
    </SecondRowContainer>
  </SecondRowWrapper>
)

const SecondRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  margin: 0 auto;
  max-width: 1080px;
  padding-left: 10px;
  padding-right: 10px;
`

const SecondRowWrapper = styled.div`
  margin: auto 0;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 10px solid #0d238e;
  height: 70px;
  transition: all 0.3s;
  transition-timing-function: linear;

  &:hover {
    color: #66de80 !important;
    transition: all 0.2s !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  @media (min-width: 750px) and (max-width: 1004px) {
    height: 100px;
  }

  @media (min-width: 625px) and (max-width: 825px) {
    height: 130px;
  }

  @media (min-width: 409px) and (max-width: 705px) {
    height: 160px;
  }
`;

export default SecondRow
