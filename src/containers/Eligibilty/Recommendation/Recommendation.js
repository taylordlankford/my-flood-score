import React, { useState, useEffect } from 'react'
import { Parallax } from 'react-parallax'
import './styles.css'
import BgImg from '../../../assets/images/nff-bg-image.jpg'
import * as S from './StyledComponents'


import Faq from './Faq'
import High from './High'
import Medium from './Medium'
import Low from './Low'
import NotRecommended from './NotRecommended'

import { hideSiteContainers } from '../helpers'
import { useFirebase } from '../../../hooks'

const Recommendation = (props) => {
  const { history, location, match } = props
  const { selected } = location.state
  const firebase = useFirebase()

  // States
  const [selectedAddress, setSelectedAddress] = useState((selected != null) ? selected : '')
  const [propertyData, setPropertyData] = useState(null)
  const [LOMARating, setLOMARating] = useState("")

  useEffect(() => {
    hideSiteContainers()

    if (selectedAddress != null || selectedAddress !== '') {
      // console.log(firebase)
      console.log('Address => ', selectedAddress)
      setSelectedAddress(selectedAddress)
      getPropertyRef(selectedAddress)
    }
  }, [])

  /**
   * Get the data from the selected address.
   */
  const getPropertyRef = async (selectedAddress) => {
    await firebase.doFirestoreAddressRefGet(selectedAddress).then(properties => {
      const property = properties[0]
      if (typeof property.id != 'undefined') {
        console.log('id => ', property.id)
        firebase.doFirestoreWhereGet('properties', 'NFF_ID', '==', property.id).then(data => {
          // console.log('DOC DATA => ', data.docs[0]._document.proto.fields)
          if (typeof data.docs[0]._document.proto.fields != 'undefined') {
            const propertyData = data.docs[0]._document.proto.fields
            const { LOMA } = propertyData
            setLOMARating(LOMA)
            console.log("LOMA => ", LOMA)
            console.log('propertyData => ', propertyData)
            setPropertyData(propertyData)
            // setPropertyData(data.docs[0]._document.proto.fields)
          }
        })
      }
    })
  }

  /**
   * Get the correct LOMA category.
   */
  const getLOMARecommendation = (LOMARating) => {
    switch (LOMARating.integerValue) {
      case '0':
        return 'N/A'
      case '1':
        return 'Low'
      case '2':
        return 'Medium'
      case '3':
        return 'High'
      default: {
        return 'N/A'
      }
    }
  }

  /**
   * Render different descriptions based on category.
   */
  const LOMARecommendations = ({ propertyData, LOMACategory }) => {
    // console.log('PROPERTY DATA => ', propertyData)
    const { FEMA_ZONE } = propertyData
    switch (LOMARating.integerValue) {
      case '0':
        return <NotRecommended
          getLOMARecommendation={getLOMARecommendation}
          LOMARating={LOMARating}
          LOMACategory={LOMACategory}
          femaZone={FEMA_ZONE}
          selectedAddress={selectedAddress}
          propertyData={propertyData}
        />
      case '1':
        return <Low
          getLOMARecommendation={getLOMARecommendation}
          LOMARating={LOMARating}
          LOMACategory={LOMACategory}
          femaZone={FEMA_ZONE}
          selectedAddress={selectedAddress}
          propertyData={propertyData}
        />
      case '2':
        return <Medium
          getLOMARecommendation={getLOMARecommendation}
          LOMARating={LOMARating}
          LOMACategory={LOMACategory}
          femaZone={FEMA_ZONE}
          selectedAddress={selectedAddress}
          propertyData={propertyData}
        />
      case '3':
        return <High
          getLOMARecommendation={getLOMARecommendation}
          LOMARating={LOMARating}
          LOMACategory={LOMACategory}
          femaZone={FEMA_ZONE}
          selectedAddress={selectedAddress}
          propertyData={propertyData}
        />
      default: {
        return 'N/A'
      }
    }
  }

  if (propertyData == null) {
    return "Loading..."
  }

  return (
    <S.Wrapper>
      {/* console.log('PROPERTY DATA => ', propertyData) */}
      {console.log('PROPERTY RATING => ', LOMARating)}

      <Parallax
        contentClassName="recommendation-parallax"
        bgImage={BgImg}
        strength={200}
      >
        <S.Container>
          <LOMARecommendations propertyData={propertyData} LOMACategory={getLOMARecommendation(LOMARating)} />
        </S.Container>
      </Parallax>
    </S.Wrapper>
  )
}

export default Recommendation