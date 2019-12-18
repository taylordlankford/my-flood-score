import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../routes/constants/routes";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  removeItem,
  addQuantity,
  subtractQuantity,
  resetTotal 
} from "../../redux/actions/cartActions";

import CartItem from "./CartItem";
import OrderDetails from "./OrderDetails";

import { pushDanger } from "../../redux/actions/notificationActions";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notifications/Notification";

const Cart = props => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer)

  useEffect(() => {
    if (cart.addedItems.length < 1 || cart.addedItems.length == 0) {
      dispatch(resetTotal(0))
    }
  }, [cart])
  
  console.log("props in cart.js", cart);

  const gotoShop = () => {
    props.history.push(ROUTES.SHOP);
  };

  const gotoCheckout = () => {
    props.history.push(ROUTES.CHECKOUT);
  };

  const handleRemoveItem = product => {
    dispatch(removeItem(product.id));
    dispatch(pushDanger("Removed an item from cart."));
  };

  const handleQtyChange = (newValue, product, addQuantity, subtractQuantity) => {
    console.log("old value", product);
    console.log("new value", newValue);
    if (newValue < product.quantity) {
      // subtracted quantity
      console.log("subtracting");
      dispatch(subtractQuantity(product.id))
    } else if (newValue > product.quantity) {
      // added quantity
      console.log("adding");
      dispatch(addQuantity(product.id))
    }
  };

  const DPRODUCTS = cart.addedItems.map((product, index) => (
    <CartItem
      product={product}
      key={index}
      handleRemoveItem={handleRemoveItem}
      addQuantity={addQuantity}
      subtractQuantity={subtractQuantity}
      handleQtyChange={handleQtyChange}
    />
  ));

  return (
    <Container className="cart-container">
      <Notification />
      <div style={{ paddingTop: "32px" }}>
        {cart.addedItems.length === 0 ? (
          <Container>
            <p>Your cart is currently empty.</p>
            <Button onClick={gotoShop}>RETURN TO SHOP</Button>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col sm={8}>
                <Row className="cart-header">
                  <Col sm={1}></Col>
                  <Col sm={2}></Col>
                  <Col sm={4}>Product</Col>
                  <Col>Price</Col>
                  <Col>Quantity</Col>
                  <Col>Total</Col>
                </Row>
                <hr />
                {DPRODUCTS}
              </Col>

              <OrderDetails gotoCheckout={gotoCheckout} total={cart.total} />
            </Row>
          </Container>
        )}
      </div>
    </Container>
  );
};

export default withRouter(Cart);