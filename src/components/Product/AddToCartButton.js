import React from "react";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

import Button from "react-bootstrap/Button";

import { useFirestoreUser } from "../../hooks";

import "./Product.css";
import * as ROUTES from "../../routes/constants/routes";
import { addToCart } from "../../redux/actions/cartActions";

import { pushSuccess } from "../../redux/actions/notificationActions";
import { useDispatch } from "react-redux";

const AddToCartButton = props => {
  const dispatch = useDispatch();
  const userData = useFirestoreUser();
  const { firestoreUser } = userData;
  console.log("add to cart fire user", firestoreUser);
  console.log("add to cart button props:", props);

  const handleAddToCart = ({ id, history, quantity }) => {
    if (id === 0) {
      history.push(ROUTES.ACCOUNT);
      return;
    }
    dispatch(addToCart(id, quantity))
    dispatch(pushSuccess("Successfully added item to cart."));
    history.push(ROUTES.CART);
  };

  return (
    <Button
      onClick={
        firestoreUser
          ? () => handleAddToCart(props)
          : () => props.history.push(ROUTES.CHECKOUT_FREE)
      }
      variant="primary"
      type="submit"
      name="add-to-cart"
      className="add-to-cart-button"
    >
      {firestoreUser ? "ADD TO CART" : "Sign Up"}
    </Button>
  );
};

export default withRouter(AddToCartButton)
// const mapStateToProps = (/* state */) => ({});
// 
// const mapDispatchToProps = dispatch => ({
//   addToCart: (id, quantity) => {
//     dispatch(addToCart(id, quantity));
//   }
// });
// 
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(AddToCartButton));
