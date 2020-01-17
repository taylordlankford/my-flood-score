import styled from 'styled-components'

export const Wrapper = styled.div`
  line-height: 1.5em;
  font-size: 20px;
  font-weight: 500;
  color: #666666;
`

export const Container = styled.div`
  min-height: 100vh;
  padding: 50px 50px 50px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, auto)) ;
  grid-gap: 2em;
  overflow: scroll;
`

/* FAQ */
export const FaqTitle = styled.div`
  border: none;
  padding: 4px 20px 4px 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-weight: 800;
  line-height: 1.5em;
`

export const FaqWrapper = styled.div`
  border: none;
`

export const FaqContainer = styled.div`
`

export const FaqHeader = styled.div`
  background-color: rgba(234, 234, 234, 0.80);
`

export const FaqBody = styled.div`
  background-color: rgba(234, 234, 234, 0.80);
  margin-bottom: 20px;
  padding: 20px 20px;
`

export const FaqFooter = styled.div`
  background-color: rgba(234, 234, 234, 0.80);
  padding: 10px 20px 0 20px;
`

export const FaqList = styled.ul`
  padding: 0;
  margin: 0;
`

export const FaqListItem = styled.li`
  list-style-type: none;
  margin-bottom: 10px;
`

/* LOMA Eligibility Recommendation */
export const LOMAWrapper = styled.div`
`

export const LOMAHeader = styled.div`
  margin-bottom: 20px;
`

export const LOMATitle = styled.div`
  background-color: rgba(234, 234, 234, 0.80);
  padding: 4px 20px 4px 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-weight: 800;
  line-height: 1.5em;
`

export const LOMABody = styled.div`
  background-color: rgba(234, 234, 234, 0.80);
  padding: 20px;
  /* margin-bottom: 20px; */
`