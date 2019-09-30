import React from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../Products.css'
import Certificate from '../../../assets/images/Certificate.svg'

import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../constants/routes'

const CertifyBusiness = () => {
  const { history } = useReactRouter()
  const data = {
    title: "Certify – Business",
    price: {
      type: 'Month',
      amount: 10.00,
    },
    category: {
      name: "Business",
      link: ROUTES.CERTIFY_BUSINESS,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Certify – Business",
        link: ROUTES.CERTIFY_BUSINESS
      },
    ],
  } // end Product Box Data
  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<LI key="1">Flood Score</LI>),
          (<LI key="2">Latest and Best Available Flood modeling</LI>),
          (<LI key="3">FEMA Flone Zone category</LI>),
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
            img={Certificate}
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

export default CertifyBusiness
