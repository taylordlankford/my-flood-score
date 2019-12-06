import React from "react";
import * as ROUTES from "../../../routes/constants/routes";
import { useFirestoreUser, useFirebase } from "../../../hooks";
import { Link } from "react-router-dom";

import { AddressesContainer } from "./AddressesStyles";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { Title, StyledLink, StyledDropdownMenuItem } from "../StyledComponents";

import "./Addresses.css";

import BillingAddress from "./BillingAddress/BillingAddress";
import ShippingAddress from "./ShippingAddress/ShippingAddress";

const Addresses = () => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  return (
    <AddressesContainer>
      <Row style={{ paddingBottom: "20px" }}>
        <Col sm={10}>
          <p>
            The following addresses will be used on the checkout page by
            default.
          </p>
        </Col>
        <Col sm={2} style={{ textAlign: "right" }}>
          <Dropdown>
            <Dropdown.Toggle>Edit{" "}</Dropdown.Toggle>
            <Dropdown.Menu alignRight style={{ width: "200px" }}>
              <Link to={ROUTES.EDIT_BILLING_ADDRESS}>
                <StyledDropdownMenuItem>Billing Address</StyledDropdownMenuItem>
              </Link>
              <Link to={ROUTES.EDIT_SHIPPING_ADDRESS}>
                <StyledDropdownMenuItem>
                  Shipping Address
                </StyledDropdownMenuItem>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <BillingAddress firestoreUser={firestoreUser} />
        <ShippingAddress firestoreUser={firestoreUser} />
      </Row>
    </AddressesContainer>
  );
};

export default Addresses;
