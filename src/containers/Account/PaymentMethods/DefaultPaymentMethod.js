import React, { useContext, useEffect, useState } from "react";
import useReactRouter from "use-react-router";
import * as ROUTES from "../../../routes/constants/routes";
import { AccountContext } from "../AccountContext";
import Loading from "../../../components/Loading/Loading";
import { renderCardIcon } from "./renderCardIcon";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Container,
  SecondaryBtn,
  DefaultPaymentMethodTag
} from "../../../StyledComponents/StyledComponents";
import {
  CustomToggle,
  CustomMenu
} from "../../../components/CustomDropdown/CustomDropdown";
import { FaPencilAlt } from "react-icons/fa";

const DefaultPaymentMethod = props => {
  const { firestoreUser, firebase } = useContext(AccountContext);
  const { history } = useReactRouter();
  const { processing, detachPaymentMethod } = props;

  const [isFetchingData, setIsFetchingData] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);

  useEffect(() => {
    fetchData();
  }, [processing]);

  /**
   * Fetch data from Stripe API,
   * Set states for,
   *    customer
   *    default payment method,
   *    list of payment methods
   */
  const fetchData = () => {
    setIsFetchingData(true);
    let defaultPmId = "";
    if (typeof firestoreUser.customerId !== "undefined") {
      firebase.doGetCustomer(firestoreUser.customerId).then(customerData => {
        setCustomer(customerData.data);
        defaultPmId = customerData.data.invoice_settings.default_payment_method;
        firebase.doGetPaymentMethod(defaultPmId).then(defaultPm => {
          setDefaultPaymentMethod(defaultPm.data.paymentMethod);
          setIsFetchingData(false);
        });
      });
    }
  };

  /**
   * Render a loading spinner if we are fetching the default payment method.
   * OR
   * Render an empty Fragment if there is no default payment method set.
   */
  if (isFetchingData == true) {
    return (
      <Container
        style={{
          padding: "20px",
          textAlign: "left",
          color: "#666666"
        }}
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{ paddingLeft: "10px" }}
        />
        <span style={{ paddingLeft: "10px", fontSize: "18px" }}>
          Updating default payment method...
        </span>
      </Container>
    );
  } else if (defaultPaymentMethod == null) {
    return <></>;
  }

  return (
    <tr>
      <td>
        {renderCardIcon(defaultPaymentMethod.card.brand)} in{" "}
        {defaultPaymentMethod.card.last4}{" "}
        <Badge style={{ backgroundColor: "#0D238E", color: "#ffffff" }}>
          DEFAULT
        </Badge>
      </td>
      <td>
        {defaultPaymentMethod.card.exp_month +
          " / " +
          defaultPaymentMethod.card.exp_year}
      </td>
      <td>
        {processing ? (
          <SecondaryBtn>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{
                textAlign: "center",
                color: "#666666"
              }}
            />
          </SecondaryBtn>
        ) : (
          <Dropdown alignRight>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu} style={{ border: "0", width: "200px" }}>
              <Dropdown.Item
                eventKey="1"
                onClick={() => history.push(ROUTES.ACCOUNT_SUBSCRIPTIONS)}
              >
                View Subscriptions
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="2"
                onClick={e => detachPaymentMethod(e, defaultPaymentMethod, customer)}
              >
                Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </td>
    </tr>
  );
};

export default DefaultPaymentMethod;
