import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router-dom"
import * as ROUTES from '../../../routes/constants/routes'

const Item = ({ item, index, allItems, history }) => {
  const product = allItems.filter((el) => {
    return el.id === item.id
  })[0] // First item of the filtered array

  return (
    <tr key={index}>
      <td>
        {product.title}
      </td>
      <td>
        {product.desc}
      </td>
      <td className="noWrap">
        {item.inventory} Remaining
      </td>
      <td className="noWrap">
        <Button
          className="btn btn-primary view-action"
          onClick={() => history.push(ROUTES.ACCOUNT_DASHBOARD)}
        >
          Get Report
        </Button>
      </td>
    </tr>
  )
}

const mapStateToProps = state => {
  return {
    allItems: state.cartReducer.items,
  };
};
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Item))
