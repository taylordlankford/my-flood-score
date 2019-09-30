import React from 'react'
import styled from 'styled-components'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import './Product.css'

const Details = (props) => {
  const { tabData } = props
  return (
    <Tabs id="uncontrolled-tab">
      {tabData.map(tab => (
        <Tab key={tab.title} eventKey={tab.title} title={tab.title}>
          {tab.data.bullets.map(bullet => (
            bullet
            // <LI key={bullet}>{bullet}</LI>
          ))}
        </Tab>
      ))}
    </Tabs>
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

export default Details
