import React from 'react'
import Autosuggest from 'react-autosuggest'

import { FaLeaf } from 'react-icons/fa'
// import { withRouter } from 'react-router'

import theme from './theme.css.js'

import * as ROUTES from '../../constants/routes'


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, addresses, firebase) => {
  // this.setState({ loading: true })
  const inputValue = value.trim().toUpperCase()
  const inputLength = inputValue.length
  if (inputLength < 4) {
    return []
  }
  // languages = firebase.doFirestoreWhereGet('properties', 'PROP_ADD', '>=', inputValue)
  let filtered = addresses.filter( a => a.startsWith(inputValue))
  if (filtered.length === 0) {
    filtered = addresses.filter( a => a.includes(inputValue))
  } 
  console.log('filtered', filtered)

  // return inputLength < 3 ? [] : languages.filter(lang =>
  //   lang.name.toLowerCase().slice(0, inputLength) === inputValue
  // );
  return filtered
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class AutoSuggest extends React.Component {
  constructor(props) {
    super(props)

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: props.startingValue ? props.startingValue : '',
      suggestions: [],
      addresses: [],
      addInputClass: false,
    };
  }

  componentDidMount() {
    this.props.firebase.doFirestoreGet("index")
      .then((index) => {
        // console.log('index', index)
        const { addresses } = index[0]
        console.log('addresses', addresses)
        this.setState({ addresses })
      })
  }

  validateValue = () => {
    const { value, addresses } = this.state
    if (addresses.includes(value)) {
      return true
    } else {
      return false
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const { addresses } = this.state
    this.setState({
      suggestions: getSuggestions(value, addresses, this.props.firebase)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
  //   const { history } = this.props
  //   console.log('selected', suggestion)
  //   history.push(ROUTES.CHECKOUT_FREE, { selected: suggestion })
  // }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter your address',
      value,
      onChange: this.onChange,
      autocomplete: "new-password",
    };

    // Finally, render it!
    console.log('theme', theme)
    return (
      <Autosuggest
        {...this.props}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{ ...inputProps, ...this.props.inputProps }}
      />
    );
  }
}

export default AutoSuggest
