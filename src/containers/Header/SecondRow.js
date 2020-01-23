import React from 'react'
import useReactRouter from 'use-react-router'
import * as ROUTES from '../../routes/constants/routes'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certify from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import Discover from '../../assets/images/Discover.svg'

import {
  SecondRowWrapper,
  SecondRowContainer,
  ServiceLink,
  ServiceImg,
  ServiceName
} from './StyledComponents/SecondRow'

const SecondRow = () => {
  const { history } = useReactRouter()

  return (
    <SecondRowWrapper>
      <SecondRowContainer>
        <ServiceLink onClick={() => history.push(ROUTES.DISCOVER)}>
          <ServiceImg src={Discover} alt="discover" />
          <ServiceName>Discover</ServiceName>
        </ServiceLink>
        <ServiceLink onClick={() => history.push(ROUTES.COMPARE)}>
          <ServiceImg src={Compare} alt="compare" style={{ width: "70px" }} />
          <ServiceName>Compare</ServiceName>
        </ServiceLink>
        <ServiceLink onClick={() => history.push(ROUTES.EXAMINE)}>
          <ServiceImg src={Examine} alt="examine" />
          <ServiceName>Examine</ServiceName>
        </ServiceLink>
        <ServiceLink onClick={() => history.push(ROUTES.CERTIFY)}>
          <ServiceImg src={Certify} alt="certify" />
          <ServiceName>Certify</ServiceName>
        </ServiceLink>
        <ServiceLink onClick={() => history.push(ROUTES.REDUCE)}>
          <ServiceImg src={Reduce_Eliminate} alt="reduce-or-eliminate" />
          <ServiceName>Reduce or Eliminate</ServiceName>
        </ServiceLink>
      </SecondRowContainer>
    </SecondRowWrapper>
  )
}


export default SecondRow
