import React from 'react'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../Products.css'
import Compare from '../../../assets/images/Compare.svg'

import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../routes/constants/routes'
// import * as ROUTES from '../../../constants/routes'

import { connect } from 'react-redux'
import { addToCart } from '../../../redux/actions/cartActions'

const CompareHomeowner = () => {
  const data = {
    id: 3,
    title: "Compare – Homeowner",
    price: {
      type: 'once',
      amount: 5.00,
    },
    category: {
      name: "Homeowner",
      link: ROUTES.COMPARE_HOMEOWNER,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Compare – Homeowner",
        link: ROUTES.COMPARE_HOMEOWNER
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
            id={data.id}
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

const mapStateToProps = () => {
  return null
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareHomeowner)