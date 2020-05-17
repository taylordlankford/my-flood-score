import React from "react";
import High from "./High/High";
import Medium from "./Medium";
import Low from "./Low/Low";
import NotRecommended from "./NotRecommended/NotRecommended";

/**
 * Render different descriptions based on LOMA Rating.
 */
const LOMARecommendations = props => {
  const { LOMARating } = props;
  switch (LOMARating) {
    case '0':
      return <NotRecommended {...props} />;
    case 0:
      return <NotRecommended {...props} />;
    case '1':
      return <Low {...props} />;
    case 1:
      return <Low {...props} />;
    case '2':
      return <Medium {...props} />;
    case 2:
      return <Medium {...props} />;
    case '3':
      return <High {...props} />;
    case 3:
      return <High {...props} />;
    default: {
      return "N/A";
    }
  }
};

export default LOMARecommendations;
