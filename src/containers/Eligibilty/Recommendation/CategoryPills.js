import React from "react";
import styled from "styled-components";
import * as S from "./StyledComponents";

const CategoryPills = ({ getLOMARecommendation, LOMARating }) => {
  return (
    <>
      {/*
      <PillsWrapper>
        <S.HighBlock rating={(getLOMARecommendation(LOMARating) === 'High') ? true : false}>High</S.HighBlock>
        <S.MedBlock rating={(getLOMARecommendation(LOMARating) === 'Medium') ? true : false}>Medium</S.MedBlock>
        <S.LowBlock rating={(getLOMARecommendation(LOMARating) === 'Low') ? true : false}>Low</S.LowBlock>
      </PillsWrapper>
    */}
      <S.CategoryWrapper>
        <S.HighBlock rating={(getLOMARecommendation(LOMARating) === 'High') ? true : false}>High</S.HighBlock>
        <S.MedBlock rating={(getLOMARecommendation(LOMARating) === 'Medium') ? true : false}>Medium</S.MedBlock>
        <S.LowBlock rating={(getLOMARecommendation(LOMARating) === 'Low') ? true : false}>Low</S.LowBlock>
      </S.CategoryWrapper>
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