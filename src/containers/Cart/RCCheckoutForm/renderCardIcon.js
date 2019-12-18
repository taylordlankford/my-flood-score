
import React from "react"
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex
} from "react-icons/fa";

// Render correct icon for card type
export const renderCardIcon = cardType => {
  switch (cardType) {
    case "visa": {
      return (
        <>
          <FaCcVisa size={30} /> Ending{" "}
        </>
      );
    }
    case "mastercard": {
      return (
        <>
          <FaCcMastercard size={30} /> Ending{" "}
        </>
      );
    }
    case "discover": {
      return (
        <>
          {" "}
          <FaCcDiscover size={30} /> Ending{" "}
        </>
      );
    }
    case "amex": {
      return (
        <>
          {" "}
          <FaCcAmex size={30} /> Ending{" "}
        </>
      );
    }
    default: {
      return cardType;
    }
  }
};
