import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const Loading = (props) => {
  const {
    message,
    style
  } = props

  return (
    <Container style={{ color: "#666666" }}>
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
      <span style={style}>{message}</span>
    </Container>
  );
};

export default Loading;
