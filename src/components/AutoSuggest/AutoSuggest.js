import React from 'react'
import Autosuggest from 'react-autosuggest'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'
// import Col from 'react-bootstrap/Col'

import { FaLeaf } from 'react-icons/fa'
// import { withRouter } from 'react-router'

import theme from './theme.css.js'

import * as ROUTES from '../../routes/constants/routes'
// import * as ROUTES from '../../constants/routes'


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
      countyOptions: [{ value: '', label: 'Select Your County...' }],
      selectedCounty: '',
      loadingCountyOptions: true,
      loadingCounty: false,
    };
  }

  componentDidMount() {
    const { countyStartingValue } = this.props
    this.getAvaliableCounties()
    if (countyStartingValue) {
      this.handleCountySelected(countyStartingValue)
    }
  }

  getAvaliableCounties = () => {
    this.props.firebase.db.collection('properties').doc('Florida').collection('counties')
    .where("active", "==", true)
    .get()
    .then((querySnapshot) => {
        const countyOptions = [{ value: '', label: 'Select Your County...' }]
        querySnapshot.forEach(function(doc) {
            const { label } = doc.data()
            countyOptions.push({ value: doc.id, label: label ? label : doc.id })
        })
        this.setState({ countyOptions, loadingCountyOptions: false })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })
  }

  validateValue = () => {
    const { value, addresses } = this.state
    console.log('valid value:', value)
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

  handleCountySelected = (county) => {
    if (county === '') {
      this.setState({ loadingCounty: false, selectedCounty: '' })
      try { this.props.updateParentCountyState('none') } catch (err) {}
      return
    }
    this.setState({ loadingCounty: true, selectedCounty: county })
    this.props.firebase.db.collection('properties').doc('Florida')
      .collection('counties').doc(county)
      .collection('zipCodes')
      .get()
      .then((querySnapshot) => {
        let addresses = [];
        querySnapshot.forEach(function(doc) {
            // addresses.push(doc.data().addresses)
            addresses = [ ...addresses, ...doc.data().addresses ]
        })
        if (typeof addresses !== "undefined") {
          // console.log("addresses", addresses);
          this.setState({ addresses, loadingCounty: false })
          try { this.props.updateParentCountyState(county) } catch (err) {}
        } else {
          this.setState({ loadingCounty: false })
          try { this.props.updateParentCountyState(county) } catch (err) {}
        }
      })
  }

  // onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
  //   const { history } = this.props
  //   console.log('selected', suggestion)
  //   history.push(ROUTES.CHECKOUT_FREE, { selected: suggestion })
  // }

  render() {
    const {
      value,
      suggestions,
      countyOptions,
      selectedCounty,
      loadingCounty,
      loadingCountyOptions,
    } = this.state
    const {
      countySelectStyles,
      countyStartingValue,
      showProceedButton,
      handleProceedButton,
    } = this.props

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter your address',
      value,
      onChange: this.onChange,
      autoComplete: "new-password",
    };


    // This is all dummy while it loads up the county options real
    if (loadingCountyOptions) {
      return (
          <Form.Group controlId="fake" style={ countySelectStyles }>
            <Form.Control
              as="select"
              custom
              style={{ backgroundColor: 'white' }}
              name="countyFake"
            >
              <option value='fake'>Select Your County...</option>
            </Form.Control>
          </Form.Group>
      )
    }

    return (
      <>
        <Form
          style={countySelectStyles}
        >
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Control
              as="select"
              custom
              onChange={e => this.handleCountySelected(e.target.value)  }
              style={{ backgroundColor: 'white' }}
              defaultValue={countyStartingValue}
              name="county"
            >
              {countyOptions.map((county) => (
                <option value={county.value} >{county.label}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        {loadingCounty &&
          <Spinner animation="border" role="status" style={{ ...countySelectStyles, width: '2rem' }}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        {selectedCounty !== '' && !loadingCounty &&
          <Autosuggest
            {...this.props}
            suggestions={suggestions.slice(0,10)}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{ ...inputProps, ...this.props.inputProps }}
          />
        }
        {(selectedCounty !== '' && !loadingCounty && showProceedButton) && (
          <div xs={2} style={{ position: 'relative', padding: "0", margin: "0", top: '-42px', float: 'right' }}>
            <IframeSearchBtn onClick={e => handleProceedButton(e)}>
              Proceed
            </IframeSearchBtn>
          </div>
        )}
      </>
    );
  }
}

export default AutoSuggest

export const IframeSearchBtn = styled.button`
  &,
  &:link,
  &:visited {
    width: 100%;
    height: 48px;
    text-align: center !important;
    color: white !important;
    cursor: pointer;
    background-color: #55b96a;
    font-size: 0.94rem;
    font-weight: 700;
    border: 1px solid #55b96a;
    border: none;
    /* padding: 0.62rem 1.25rem; */
    text-decoration: none;
    text-transform: uppercase;
    background-size: 230%;
    transition: all 0.4s;
    z-index: 999;
  }

  &:hover {
    background-color: #4ca25e;
    background-position: 100%;
    color: white;
  }

  &:active {
    outline: none;
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;
