import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Products.css'
import Compare from '../../../assets/images/Compare.svg'
import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../routes/constants/routes'
import { connect } from 'react-redux'

const CompareHomeowner = (props) => {
  const { items } = props
  const data = {
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
  }

  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<li classsName="tab-data-list" key="1">Flood Score</li>),
          (<li classsName="tab-data-list" key="2">Latest and Best Available Flood modeling</li>),
          (<li classsName="tab-data-list" key="3">FEMA Flone Zone category</li>),
          (<li classsName="tab-data-list" key="3">Flood Comparisons – Zip Code / Subdivision</li>),
          (<li classsName="tab-data-list" key="3">Flood comparison against other properties</li>),
          (<li classsName="tab-data-list" key="3">Flood map of property and Flood Zone</li>),
          (<li classsName="tab-data-list" key="3">Structure level and BFE level</li>),
          (<li classsName="tab-data-list" key="3">Key Flood Factors</li>),
          (<li classsName="tab-data-list" key="4">Action points / recommendations</li>),
          (<li classsName="tab-data-list" key="5">LOMA Recommendations</li>),
        ]
      }
    }
  ] // end Tab Data

  return (
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox
            item={items[3]}
            category={data.category}
            breadcrumb={data.breadcrumb}
            img={Compare} />
          <Details
            tabData={tabData}
          />
        </Col>
        <Col sm={4}>
          {/* Side Bar */}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({ items: state.items })

export default connect(mapStateToProps)(CompareHomeowner)