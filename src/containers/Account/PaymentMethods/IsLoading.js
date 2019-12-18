import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const IsLoading = () => {
  return (
    <Container style={{ textAlign: "center", color: "#666666" }}>
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
        style={{
          marginLeft: "-15px",
          marginRight: "15px"
        }}
      />
      <span style={{ fontSize: "28px" }}>Retrieve your payment methods...</span>
    </Container>
  );
};

export default IsLoading;
