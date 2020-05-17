import React from "react";
import NotApplicableLowRisk from "./NotApplicableLowRisk"
import NotApplicableHighRisk from "./NotApplicableHighRisk"

const NotRecommended = props => {
  const { selectedAddress, propertyData } = props;
  const { LOMA, FEMA_ZONE } = propertyData

  if (LOMA == "0" && (FEMA_ZONE == "X, AREA OF MINIMAL FLOOD HAZARD" || FEMA_ZONE == "X, 0.2 PCT ANNUAL CHANCE FLOOD HAZARD")) {
    return <NotApplicableLowRisk selectedAddress={selectedAddress} propertyData={propertyData} />
  } else if (LOMA == "0" && (FEMA_ZONE != "X, AREA OF MINIMAL FLOOD HAZARD" || FEMA_ZONE != "X, 0.2 PCT ANNUAL CHANCE FLOOD HAZARD")) {
    return <NotApplicableHighRisk selectedAddress={selectedAddress} propertyData={propertyData} />
  }
};

export default NotRecommended;

