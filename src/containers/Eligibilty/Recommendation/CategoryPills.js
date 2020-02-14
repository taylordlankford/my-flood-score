import React from "react";
import "./styles.css";
import styled from "styled-components";
import * as S from "./StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CategoryPills = ({ getLOMARecommendation, LOMARating }) => {
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
      {/*
      <S.CategoryWrapper>
        <S.HighBlock rating={(getLOMARecommendation(LOMARating) === 'High') ? true : false}>High</S.HighBlock>
        <S.MedBlock rating={(getLOMARecommendation(LOMARating) === 'Medium') ? true : false}>Medium</S.MedBlock>
        <S.LowBlock rating={(getLOMARecommendation(LOMARating) === 'Low') ? true : false}>Low</S.LowBlock>
      </S.CategoryWrapper>
    */}
    </>
  );
}

const PillsWrapper = styled.div`
  color: #000;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
`

export default CategoryPills;