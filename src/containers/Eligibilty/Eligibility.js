import React, { useEffect } from 'react'
import { Parallax } from 'react-parallax'
import BgImg from '../../assets/images/nff-bg-image.jpg'
import * as S from './StyledComponents'
import './styles.css'
import SearchEligibility from './SearchEligibility/SearchEligibility'

import { hideSiteContainers } from './helpers'

const Eligibility = () => {
  useEffect(() => {
    hideSiteContainers()
  })

  return (
    <S.ParallaxWrapper>
      <Parallax
        contentClassName="parallax-bg"
        strength={200}
      >
        <S.ParallaxContainer>
          <S.MainTitle>Best Available Technology & Flood Risk Models</S.MainTitle>
          <S.Subtitle>
            Let’s take the first step together and help you save thousands on
            your flood insurance by providing FEMA with the best available Flood
            Risk Information.
          </S.Subtitle>
          <SearchEligibility />
        </S.ParallaxContainer>
      </Parallax>
    </S.ParallaxWrapper>
  );
}

export default Eligibility