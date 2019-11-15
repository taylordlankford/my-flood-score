import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Products.css'
import Examine from '../../../assets/images/Examine.svg'
import ProductBox from '../../../components/Product/ProductBox'
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../routes/constants/routes'
import { connect } from 'react-redux'

const ExamineHomeowner = (props) => {
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
        name: "Examine – Homeowner",
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
          (<li className="tab-data-list" key="3">Flood map of property and Flood Zone</li>),
          (<li className="tab-data-list" key="3">Structure level and BFE level</li>),
          (<li className="tab-data-list" key="3">Key Flood Factors</li>),
          (<li className="tab-data-list" key="3">Action points / recommendations</li>),
          (<li className="tab-data-list" key="3">Structure Impact analysis</li>),
          (<li className="tab-data-list" key="3">Parcel Impact analysis</li>),
          (<li className="tab-data-list" key="3">Detailed Summary of Flood Risk</li>),
          (<li className="tab-data-list" key="5">LOMA Recommendations</li>),
        ]
      }
    }
  ]

  return (
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox
            item={items[6]}
            category={data.category}
            breadcrumb={data.breadcrumb}
            img={Examine} />
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

export default connect(mapStateToProps)(ExamineHomeowner)
