import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Notification = (props) => {
  return (
    <Container className="mt-5">
      {
        props.items.length > 0 ?
          <div className="cartFlexBox">
            <div className="FlexItems">
              <b>{props.items.slice(-1)[0].title}</b> has been added to your cart.
            </div>
            <div className="FlexItems flexButton">
              <Button variant="primary" onClick={props.gotoShop}>
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
          :
          <div style={{"display": "none"}}></div>
      }
    </Container>
  )
}

export default Notification