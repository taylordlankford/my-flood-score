import React, { useState, useEffect } from 'react'
import { Parallax } from 'react-parallax'
import './styles.css'
import BgImg from '../../../assets/images/nff-bg-image.jpg'
import * as S from './StyledComponents'

import Faq from './Faq'
import High from './High'
import Medium from './Medium'
import Low from './Low'

import { hideSiteContainers } from '../helpers'

import { useFirebase } from '../../../hooks'

const Recommendation = (props) => {
  const { history, location, match } = props
  const { selected } = location.state
  const firebase = useFirebase()

  // States
  const [selectedAddress, setSelectedAddress] = useState((selected != null) ? selected : '')
  const [propertyId, setPropertyId] = useState('')

  useEffect(() => {
    hideSiteContainers()

    if (selectedAddress != null || selectedAddress !== '') {
      // console.log(firebase)
      console.log('Address => ', selectedAddress)
      setSelectedAddress(selectedAddress)
      getPropertyRef(selectedAddress)
    }
  }, [])

  const getPropertyRef = async (selectedAddress) => {
    await firebase.doFirestoreAddressRefGet(selectedAddress).then(properties => {
      const property = properties[0]
      if (typeof property.id != 'undefined') {
        console.log('id => ', property.id)
        firebase.doFirestoreWhereGet('properties', 'NFF_ID', '==', property.id).then(data => {
          console.log('DOC DATA => ', data)
        })
      }
    })
  }

  return (
    <S.Wrapper>
      <Parallax
        contentClassName="recommendation-parallax"
        bgImage={BgImg}
        strength={200}
      >
        <S.Container>
          {/* FAQ */}
          <Faq />

          {/* LOMA ELIGIBILITY RECOMMENDATION */}
          <S.LOMAWrapper>
            <S.LOMAHeader>
              <S.LOMATitle>
                LOMA Eligibility Recommendation
              </S.LOMATitle>
            </S.LOMAHeader>
            <Medium />
          </S.LOMAWrapper>
        </S.Container>
      </Parallax>
    </S.Wrapper>
  )
}

export default Recommendation