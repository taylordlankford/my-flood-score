import React from "react";
import "./styles.css";
import styled from "styled-components";
import * as S from "./StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CategoryPills = ({ LOMARating }) => {
  const getLOMARecommendation = LOMARating => {
    switch (LOMARating) {
      case 0:
        return "n/a";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default: {
        return "n/a";
      }
    }
  };
  return (
    <>
      <Row sm={12} className="category-pill-wrapper">
        <Col sm={4} className="category-pill">
          <S.HighBlock rating={getLOMARecommendation(LOMARating) === "High" ? true : false}>High</S.HighBlock>
        </Col>
        <Col sm={4} className="category-pill">
          <S.MedBlock rating={ getLOMARecommendation(LOMARating) === "Medium" ? true : false }>Medium</S.MedBlock>
        </Col>
        <Col sm={4} className="category-pill">
          <S.LowBlock rating={getLOMARecommendation(LOMARating) === "Low" ? true : false}>Low</S.LowBlock>
        </Col>
      </Row>
    </>
  );
}

export default CategoryPills;
