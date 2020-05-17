import React from 'react'
import * as S from './StyledComponents'
import { FaCheck } from 'react-icons/fa'

const Faq = () => {
  return (
    <S.FaqWrapper>
      <S.FaqContainer>
        <S.FaqHeader>
          <S.FaqTitle>LOMA FAQ</S.FaqTitle>
        </S.FaqHeader>

        <S.FaqBody>
          <S.FaqList>
            <S.FaqListItem><FaCheck /> What is a LOMA?</S.FaqListItem>
            <S.FaqListItem><FaCheck /> Can I terminate my flood insurance policy?</S.FaqListItem>
            <S.FaqListItem><FaCheck /> How long will the process take?</S.FaqListItem>
            <S.FaqListItem><FaCheck /> Is it possible FEMA will reject my LOMA request?</S.FaqListItem>
          </S.FaqList>
        </S.FaqBody>

        <S.FaqFooter>
          <p>
            Learn more about the LOMA process, eligibility requirements, and
            other products offered from No Flood Florida. <a href='https://www.nofloodflorida.com/loma/' rel="noopener noreferrer" target="_blank"><b>Click Here.</b></a>
          </p>
        </S.FaqFooter>

      </S.FaqContainer>
    </S.FaqWrapper>
  )
}

export default Faq