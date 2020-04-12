import React from "react";
import Faq from "./Faq";
import High from "./High";
import Medium from "./Medium";
import Low from "./Low";
import NotRecommended from "./NotRecommended";

/**
 * Render different descriptions based on category.
 */
const LOMARecommendations = props => {
  const { LOMARating } = props;
  switch (LOMARating) {
    case 0:
      return <NotRecommended {...props} />;
    case 1:
      return <Low {...props} />;
    case 2:
      return <Medium {...props} />;
    case 3:
      return <High {...props} />;
    default: {
      return "N/A";
    }
  }
};

export default LOMARecommendations;
