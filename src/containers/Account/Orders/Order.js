import React from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";
import MFS_Logo from "../../../assets/images/MFS_Logo.png";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiPrinter } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

const Order = ({ match }) => {
  const userData = useFirestoreUser();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  window.scrollTo(0, 0);

  const handlePrint = e => {
    e.preventDefault();
    window.print();
  };

  return (
    <OrderDetailsContainer>
      {console.log(firestoreUser.orders[parseInt(match.params.id) - 1])}
      <Card>
        <Card.Body>
          <Container>
            {/* Header */}
            <Row>
              <Col>
                <div style={{ paddingBottom: "100px" }}>
                  <img
                    src={MFS_Logo}
                    alt=""
                    style={{ padding: "0", width: "240px", height: "80px" }}
                  />
                </div>
                <h5>
                  <span style={{ fontWeight: "700" }}>
                    Order No. {parseInt(match.params.id)}
                  </span>
                </h5>
                <h3>
                  {firestoreUser.firstName + " " + firestoreUser.lastName}
                </h3>
              </Col>
              <Col style={{ paddingTop: "20px", textAlign: "right" }}>
                <FiPrinter id="printer-icon" onClick={e => handlePrint(e)} />
              </Col>
            </Row>
            <br />
            <h3 style={{ fontWeight: "700" }}>Order Details</h3>
            <hr />
            {/* Body */}
            {firestoreUser.orders[parseInt(match.params.id) - 1].items.map(
              (item, index) => (
                <Row key={index} style={{ padding: "16px 16px" }}>
                  <Col style={{ textAlign: "left" }}>
                    <b>{item.title}</b>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Amount>
                      ${(item.price / 100).toFixed(2)} <IoIosClose />{" "}
                      {item.quantity}
                    </Amount>
                  </Col>
                </Row>
              )
            )}
            <hr />
            {/* Footer */}
            <OrderDetailsFooter>
              <Row>
                <Col></Col>
                <Col style={{ textAlign: "right" }}>
                  <h3>
                    <span>
                      <span style={{ fontSize: "22px" }}>Total: </span>
                      <Total>
                        $
                        {(
                          firestoreUser.orders[parseInt(match.params.id) - 1]
                            .amount / 100
                        ).toFixed(2)}
                      </Total>
                    </span>
                  </h3>
                </Col>
              </Row>
            </OrderDetailsFooter>
          </Container>
        </Card.Body>
      </Card>
    </OrderDetailsContainer>
  );
};

const OrderDetailsContainer = styled.div`
  color: #666666;
  border-radius: 5px;
`;

const OrderDetailsFooter = styled.div`
  padding: 60px 0 10px 0;
`;

const Amount = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Total = styled.span`
  font-size: "48px";
  font-weight: 700;
`;

export default Order;
