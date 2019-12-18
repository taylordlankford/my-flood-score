import React from "react";
import useReactRouter from "use-react-router";
import * as ROUTES from "../../../routes/constants/routes"
import {
  Container,
  Title,
  LinkSecondary,
  TransitionBtn,
  DefaultPaymentMethodTag
} from "../../../StyledComponents/StyledComponents";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import { renderCardIcon } from "./renderCardIcon";

const PaymentMethodsList = props => {
  const {
    paymentMethods,
    handleOnClick,
    detachPaymentMethod,
    processing,
    customer
  } = props;
  const { history } = useReactRouter()

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Your credit and debit cards</th>
            <th>Expiration Date</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((paymentMethod, idx) =>
            paymentMethod.id === customer.invoice_settings.default_payment_method ? (
              <tr key={idx}>
                <td>
                  {renderCardIcon(paymentMethod.card.brand)} in{" "}
                  {paymentMethod.card.last4}{" "}
                  <Badge style={{ backgroundColor: "#8560a8", color: "#ffffff"}}>
                    DEFAULT
                  </Badge>
                </td>
                <td>
                  {paymentMethod.card.exp_month + " / " + paymentMethod.card.exp_year}
                </td>
                <td>
                  {processing ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{
                          marginLeft: "-15px",
                          marginRight: "15px"
                        }}
                      />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <DropdownButton
                        variant="secondary"
                        alignRight
                        title="DEFAULT"
                        id="dropdown-menu-align-right"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          onClick={e => handleOnClick(e, paymentMethod)}
                        >
                          Set as default
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey="2"
                          onClick={() => history.push(ROUTES.ACCOUNT_SUBSCRIPTIONS)}
                        >
                          View Subscriptions
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey="3"
                          onClick={e =>
                            detachPaymentMethod(e, paymentMethod, customer)
                          }
                        >
                          Remove
                        </Dropdown.Item>
                      </DropdownButton>
                    </>
                  )}
                </td>
              </tr>
            ) : (
              <tr key={idx}>
                <td>
                  {renderCardIcon(paymentMethod.card.brand)} in{" "}
                  {paymentMethod.card.last4}{" "}
                </td>
                <td>
                  {paymentMethod.card.exp_month +
                    " / " +
                    paymentMethod.card.exp_year}
                </td>
                <td>
                  {processing ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{
                          marginLeft: "-15px",
                          marginRight: "15px"
                        }}
                      />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <DropdownButton
                        variant="secondary"
                        alignRight
                        title="Update"
                        id="dropdown-menu-align-right"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          onClick={e => handleOnClick(e, paymentMethod)}
                        >
                          Set as Default
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey="2"
                          onClick={e =>
                            detachPaymentMethod(e, paymentMethod, customer)
                          }
                        >
                          Remove
                        </Dropdown.Item>
                      </DropdownButton>
                    </>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default PaymentMethodsList;
