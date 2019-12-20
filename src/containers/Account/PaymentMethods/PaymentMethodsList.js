import React from "react";
import useReactRouter from "use-react-router";
import * as ROUTES from "../../../routes/constants/routes"
import { SecondaryBtn } from "../../../StyledComponents/StyledComponents";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { renderCardIcon } from "./renderCardIcon";
import { CustomToggle, CustomMenu } from "../../../components/CustomDropdown/CustomDropdown"
import DefaultPaymentMethod from "./DefaultPaymentMethod"

const PaymentMethodsList = props => {
  const {
    paymentMethods,
    handleOnClick,
    detachPaymentMethod,
    processing,
    customer
  } = props;

  return (
    <Table striped responsive="sm">
      <thead>
        <tr>
          <th>Your credit and debit cards</th>
          <th>Expiration Date</th>
          <th style={{ width: "10%", textAlign: "center" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        <DefaultPaymentMethod processing={processing} detachPaymentMethod={detachPaymentMethod} />
        {paymentMethods.map((paymentMethod, idx) =>
          paymentMethod.id !== customer.invoice_settings.default_payment_method ? (
            <tr key={idx}>
              <td>
                {renderCardIcon(paymentMethod.card.brand)} in{" "}
                {paymentMethod.card.last4}{" "}
              </td>
              <td>
                {paymentMethod.card.exp_month + " / " + paymentMethod.card.exp_year}
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

                    <Dropdown.Menu as={CustomMenu} style={{ width: "200px" }}>
                      <Dropdown.Item eventKey="1" onClick={e => handleOnClick(e, paymentMethod)}>
                        Set as Default
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="2" onClick={e => detachPaymentMethod(e, paymentMethod, customer)}>
                        Remove
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ) : (<></>)
        )}
      </tbody>
    </Table>
  );
};

export default PaymentMethodsList;
