import React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Products.css'
import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../routes/constants/routes'
import Certificate from '../../../assets/images/Certificate.svg'

const CertifyHomeowner = (props) => {
  const { items } = props
  const data = {
    category: {
      name: "Homeowner",
      link: ROUTES.EXAMINE_HOMEOWNER,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Certify – Homeowner",
        link: ROUTES.EXAMINE_HOMEOWNER
      },
    ],
  }

  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<li className="tab-data-list" key="1">Flood Score</li>),
          (<li className="tab-data-list" key="2">Latest and Best Available Flood modeling</li>),
          (<li className="tab-data-list" key="3">FEMA Flone Zone category</li>),
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
            item={items[8]}
            category={data.category}
            breadcrumb={data.breadcrumb}
            img={Certificate} />
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

const mapStateToProps = (state) => ({ items: state.items })

export default connect(mapStateToProps)(CertifyHomeowner)