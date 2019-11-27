import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import '../Products.css'
import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../routes/constants/routes'
import { useFirestoreUser } from '../../../hooks'

const DiscoverHomeownerPlus = (props) => {
  const { items } = props
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

  console.log('firestoreUser', firestoreUser)

  const data = {
    category: {
      name: "Homeowner",
      link: ROUTES.DISCOVER_HOMEOWNER_PLUS,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Discover – Homeowner+",
        link: ROUTES.DISCOVER_HOMEOWNER_PLUS
      },
    ],
  }

  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<li className="tab-data-list bold" key="0">Up to 10 Properties</li>),
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
    <Container style={{ paddingTop: '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox
            item={items[1]}
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

export default connect(mapStateToProps)(DiscoverHomeownerPlus)
