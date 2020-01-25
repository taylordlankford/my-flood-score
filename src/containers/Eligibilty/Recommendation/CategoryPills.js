import React from 'react'
import * as S from './StyledComponents'

const CategoryPills = ({ getLOMARecommendation, LOMARating }) => {
  return (
    <S.CategoryWrapper>
      <S.HighBlock rating={(getLOMARecommendation(LOMARating) === 'High') ? true : false}>High</S.HighBlock>
      <S.MedBlock rating={(getLOMARecommendation(LOMARating) === 'Medium') ? true : false}>Medium</S.MedBlock>
      <S.LowBlock rating={(getLOMARecommendation(LOMARating) === 'Low') ? true : false}>Low</S.LowBlock>
    </S.CategoryWrapper>
  )
}

export default CategoryPills;