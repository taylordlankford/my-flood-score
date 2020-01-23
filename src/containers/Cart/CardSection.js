// CardSection.js
import React from 'react'
import { CardElement } from 'react-stripe-elements'

class CardSection extends React.Component {
  render() {
    return (
      <label>
        <CardElement onChange={this.props.onChange} style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
}

export default CardSection
