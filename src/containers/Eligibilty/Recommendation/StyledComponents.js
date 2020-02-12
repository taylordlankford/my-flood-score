import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 80px;
  font-family: 'Helvetica', sans-serif;
  line-height: 1.5em;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  min-height: inherit;
  padding: 50px 50px 50px 50px;
  overflow: scroll;
  /* display: grid; */
  /* grid-template-columns: 3fr 4fr; */
  /* grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); */
  /* grid-gap: 2em; */
  /*
  @media(max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(768px, 1fr));
  }
  */
`

/* FAQ */
export const FaqTitle = styled.div`
  border: none;
  padding: 4px 20px 4px 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.5em;
`

export const FaqWrapper = styled.div`
  border: none;
`

export const FaqContainer = styled.div`
`

export const FaqHeader = styled.div`
  /* background-color: rgba(234, 234, 234, 0.90); */
`

export const FaqBody = styled.div`
  /* background-color: rgba(234, 234, 234, 0.90); */
  margin-bottom: 20px;
  padding: 20px 20px;
`

export const FaqFooter = styled.div`
  /* background-color: rgba(234, 234, 234, 0.90); */
  padding: 20px 20px 10px 20px;
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
  /* background-color: rgba(234, 234, 234, 0.90); */
  margin-bottom: 20px;
`

export const LOMATitle = styled.div`
  /* background-color: rgba(234, 234, 234, 0.90); */
  padding: 4px 20px 4px 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.5em;
`

export const LOMABody = styled.div`
  /* background-color: rgba(234, 234, 234, 0.90); */
  padding: 20px;
  border: 1px solid #453100;
`

/**
 * Styles for Category pills.
 */
export const CategoryWrapper = styled.div`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 21px;
  color: #000000;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 20px;
  padding-left: 64px;
  padding-right: 64px;
`

export const HighBlock = styled.div`
  transform: ${props => props.rating == true ? "scale(1.3)" : "none"};
  box-shadow: ${props => props.rating == true ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "none" };
  border: ${props => props.rating ? "2px solid red" : "none" };
  background-color: rgb(0, 179, 102);
  margin-right: ${props => props.rating ? "14px" : "0" };
  padding: 5px 20px 5px 20px;
`

export const MedBlock = styled.div`
  transform: ${props => props.rating == true ? "scale(1.3)" : "none"};
  box-shadow: ${props => props.rating == true ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "none" };
  border: ${props => props.rating ? "2px solid red" : "none" };
  margin-left: ${props => props.rating ? "14px" : "0" };
  margin-right: ${props => props.rating ? "14px" : "0" };
  background-color: rgb(254, 210, 32);
  padding: 5px 20px 5px 20px;
`

export const LowBlock = styled.div`
  transform: ${props => props.rating == true ? "scale(1.3)" : "none"};
  box-shadow: ${props => props.rating == true ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "none" };
  border: ${props => props.rating ? "2px solid red" : "none" };
  margin-left: ${props => props.rating ? "14px" : "0" };
  margin-right: ${props => props.rating ? "14px" : "0" };
  background-color: rgb(255, 96, 95);
  padding: 5px 20px 5px 20px;
`

export const NotRecommendedBlock = styled.div`
  transform: ${props => props.rating == true ? "scale(1.3)" : "none"};
  box-shadow: ${props => props.rating == true ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "none" };
  border: ${props => props.rating ? "2px solid red" : "none" };
  margin-left: ${props => props.rating ? "14px" : "0" };
  background-color: #70C9FF;
  padding: 5px 20px 5px 20px;
  max-width: 140px;
  text-align: center;
  color: #000;
`