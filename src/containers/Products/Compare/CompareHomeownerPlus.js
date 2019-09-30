import React from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../Products.css'
import Compare from '../../../assets/images/Compare.svg'

import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../constants/routes'

const CompareHomeownerPlus = () => {
  const { history } = useReactRouter()
  const data = {
    title: "Compare – Homeowner+",
    price: {
      type: 'once',
      amount: 10.00,
    },
    category: {
      name: "Homeowner",
      link: ROUTES.COMPARE_HOMEOWNER_PLUS,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Compare – Homeowner+",
        link: ROUTES.COMPARE_HOMEOWNER_PLUS
      },
    ],
  } // end Product Box Data
  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<LI key="1">Up to 10 Properties</LI>),
          (<LI key="1">Flood Score</LI>),
          (<LI key="2">Latest and Best Available Flood modeling</LI>),
          (<LI key="3">FEMA Flone Zone category</LI>),
          (<LI key="3">Flood Comparisons – Zip Code / Subdivision</LI>),
          (<LI key="3">Flood comparison against other properties</LI>),
          (<LI key="3">Flood map of property and Flood Zone</LI>),
          (<LI key="3">Structure level and BFE level</LI>),
          (<LI key="3">Key Flood Factors</LI>),
          (<LI key="4">Action points / recommendations</LI>),
          (<LI key="5">LOMA Recommendations</LI>),
        ]
      }
    }
  ] // end Tab Data
  return (
  <div>
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox
            handleAddToCart={() => history.push(ROUTES.CHECKOUT)}
            title={data.title}
            category={data.category}
            breadcrumb={data.breadcrumb}
            price={data.price}
            img={Compare}
          />
          <Details
            tabData={tabData}
          />
        </Col>
        <Col sm={4}>
          {/* Side Bar */}
        </Col>
      </Row>
    </Container>
  </div>
  )
}

const LI = styled.li`
  color: #666666;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 35px;
  margin-left: 16px;
`;

export default CompareHomeownerPlus
