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
            your flood insurance. <a href="https://www.nofloodflorida.com/orderloma/"><span style={{ fontWeight: '700', color: "#C7AE4A" }}>Find out if you qualify for a Letter of Map Amendment!</span> </a>
          </S.Subtitle>
          <SearchEligibility />
          <div style={{ textAlign: 'center', color: '#fff', paddingTop: '100px', fontSize: '20px', fontWeight: '500', lineHeight: '1.5em' }}>
            <p style={{ margin: '0 auto', maxWidth: '400px' }}>
              Over 650,000 properties analyzed!
            </p>
            <p style={{ margin: '0 auto', maxWidth: '720px' }}>
              Can’t find your property? <u style={{ color: '#007bff' }}>Contact us</u> for a custom screening.
            </p>
          </div>
        </S.ParallaxContainer>
      </Parallax>
    </S.ParallaxWrapper>
  );
}

export default Eligibility
