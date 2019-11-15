import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Products.css'
import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../routes/constants/routes'
import { connect } from 'react-redux'

const DiscoverBusiness = (props) => {
  const { items } = props
  const data = {
    category: {
      name: "Business",
      link: ROUTES.DISCOVER_BUSINESS,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Discover – Business",
        link: ROUTES.DISCOVER_BUSINESS
      },
    ],
  }

  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<li className="tab-data-list bold" key="0">Up to 25 Properties/Month</li>),
          (<li className="tab-data-list" key="1">Flood Score</li>),
          (<li className="tab-data-list" key="2">Latest and Best Available Flood modeling</li>),
          (<li className="tab-data-list" key="3">FEMA Flone Zone category</li>),
          (<li className="tab-data-list" key="4">Action points / recommendations</li>),
          (<li className="tab-data-list" key="5">LOMA Recommendations</li>),
        ]
      }
    }
  ] // end Tab Data

  return (
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox
            item={items[2]}
            category={data.category}
            breadcrumb={data.breadcrumb} />
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

export default connect(mapStateToProps)(DiscoverBusiness)