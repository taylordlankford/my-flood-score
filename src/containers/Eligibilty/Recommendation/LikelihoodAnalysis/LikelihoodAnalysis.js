import React from "react";

const LikelihoodAnalysis = props => {
  const { propertyData, LOMARating, suggestion } = props
  const { FEMA_ZONE, BA_FLDZONE_S } = propertyData;

  // console.table(propertyData)
  // console.log('SUGGESTION ==> ', suggestion)

  const compareZones = () => {
    const femaZone = parseInt(FEMA_ZONE)
    const baFldZoneS = parseInt(BA_FLDZONE_S)

    // If FEMA_ZONE is low, but BA_FLDZONE_S is high
    // if (femaZone === 0 && baFldZoneS <= 3) {
    //   console.log("HIGH, property at greater risk than stated by FEMA")
    // }
    // if (femaZone === 0 && baFldZoneS === 4) {
    //   console.log('LOW')
    //   console.log("Best available floodplain modeling agrees with effective FEMA data")
    // }
  }

  return (
    <>
      <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
        Likelihood you are wrongly mapped:
      </span>
      <span style={{ fontWeight: "500" }}>
        <LikelihoodResult LOMARating={LOMARating} propertyData={propertyData} />
      </span>
    </>
  )
}

/**
 *  If LOMARating value is anything BUT 0 (N/A), the Likelihood should return as High (not
 *  directly connected to the level of the recommendation more of a yes there is
 *  a recommendation, it may be low, medium, or high we just think something is
 *  going on).
 * 
 * If the designation remains low (both FEMA_ZONE and BA_FLDZONE_S are low
 * categories), the statement should return “LOW”. An additional statement
 * should then be added to the Basis of this determination, “Best available
 * floodplain modeling agrees with effective FEMA data”
 */
const LikelihoodResult = ({ LOMARating, propertyData }) => {
  const { BA_FLDZONE_S } = propertyData
  const baFldZoneS = parseInt(BA_FLDZONE_S)
  const lomaRating = parseInt(LOMARating)

  if (LOMARating === '0') {
    return 'Not Recommended'
  } else if (LOMARating === '1') {
    return 'LOW'
  } else if (lomaRating === 0 && baFldZoneS === 4) {
    return 'LOW'
  } else if (LOMARating === '2') {
    return 'MEDIUM'
  } else if (LOMARating === '3') {
    return 'HIGH'
  } else {
    return 'N/A'
  }

  // switch (LOMARating) {
  //   case '0':
  //     return 'Not Recommended'
  //   case '1':
  //     return 'LOW'
  //   case '2':
  //     return 'High'
  //   case '3':
  //     return 'High'
  //   default: {
  //     return "N/A";
  //   }
  // }
}

export default LikelihoodAnalysis