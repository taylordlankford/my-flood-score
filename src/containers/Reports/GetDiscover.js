import React, { useState } from 'react'
import { P, Rinput, Rspan } from './StyledComponents/StyledComponents'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { TopSection } from '../Products/StyledComponents'
import AutoSuggest from '../../components/AutoSuggest/AutoSuggest'

import requestGraphic1 from '../../assets/images/request-graphic1.png'
import requestGraphic2 from '../../assets/images/request-graphic2.png'

const GetDiscover = (props) => {
  const {
    history,
    firebase,
    getInventory,
    firestoreUser,
    getNewInventory,
    selected,
  } = props
  const [validAddress, setValidAddress] = useState((selected) ? true : false)
  const [address, setAddress] = useState((selected) ? selected : "")

  const autoSuggestRef = React.createRef()

  const onSuggestionSelected = async (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    await autoSuggestRef.current.setState({ value: suggestionValue })
    setValidAddress(await autoSuggestRef.current.validateValue())
    setAddress(suggestionValue)
  }
  
  const onChange = async (event, { newValue }) => {
    await autoSuggestRef.current.setState({ value: newValue })
    setValidAddress(await autoSuggestRef.current.validateValue())
    setAddress(newValue)
  }

  const handleGetReport = async () => {
    // get the address's propertyRef
    const properties = await firebase.doFirestoreAddressRefGet(address)
    // create report
    const setReportObj = {
      createdAt: new Date(),
      property: properties[0],
      uid: firestoreUser.uid,
    }
    const reportRef = await firebase.doFirestoreAdd("reports", setReportObj)
    // Add to firestoreUser and decrease inventory
    const newInventory = getNewInventory('discover')
    const updateObj = {
      reports: firebase.app.firestore.FieldValue.arrayUnion({ address, reportRef }),
      inventory: newInventory,
    }
    await firebase.doFirestoreUpdate("users", firestoreUser.uid, updateObj)    
    history.push("report/" + reportRef.id)
  }

  return (
    <>
      <TopSection>Discover</TopSection>
        <Container style={{ marginTop: '18px', paddingLeft: '10px' }}>
        <Row>
          <Col sm={7}>
            <h4 style={{ marginLeft: '-10px' }}>Discover Your Flood Score</h4>
            <P style={{ marginTop: '22px', marginBottom: '3px' }}>Address of Interest</P>
            <AutoSuggest
              ref={autoSuggestRef}
              theme={autoSuggestTheme}
              onSuggestionSelected={onSuggestionSelected}
              startingValue={address}
              inputProps={{ id: 'requestAddressSuggest' }}
              firebase={firebase}
              inputProps={{
                onChange,
              }}
            />
            <div style={{ marginTop: '30px', textAlign: 'center', paddingRight: '110px' }}>
            <img
              src={requestGraphic1}
              style={{ position: 'relative', width: '40%' }}
            />
            <img
              src={requestGraphic2}
              style={{ position: 'relative', width: '40%' }}
            />
            </div>
          </Col>
          <Col sm={5}>
            <P>Inventory <span style={{ color: 'black', fontSize: '10.5px' }}>v</span></P>
            <Rinput
              disabled
              value={getInventory('discover')}
            />
            <Rspan> Remaining</Rspan>
            <div style={{ height: '45px' }} />
            <Button
              primary
              onClick={handleGetReport}
              disabled={!validAddress}
            >
              Get Report
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const autoSuggestTheme = {
  container: {
    paddingRight: '110px'
  },
  containerOpen: {},
  input: {
    backgroundColor: '#f2f2f2',
    lineHeight: '2.8rem',
    height: '2.8rem',
    padding: '0 0.8rem',
    display: 'block',
    width: '100%',
    fontSize: '1rem',
    fontWeight: '400',
    color: '#495057',
    backgroundClip: 'padding-box',
    borderStyle: 'solid',
    borderColor: '#ced4da',
    borderWidth: '1px',
    borderRadius: '.25rem',
    transition: 'border-color .15s',
    outline: 'none',
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
  },
  inputOpen: {},
  inputFocused: {
    borderColor: '#55B96A',
    borderWidth: '2px',
    boxShadow: 'none',
  },
  suggestionsContainer: {
    background: 'white',
    margin: '0 auto',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    border: '2px solid #55b96a',
    borderTop: '0',
  },
  suggestionsList: {
    listStyle: 'none',
    padding: '2px 0 2px 0',
  },
  suggestion: {
    padding: '4px 10px 4px 10px',
    margin: '0 1px 0 1px',
    cursor: 'pointer',
  },
  suggestionFirst: {},
  suggestionHighlighted: {
    backgroundColor: '#E6F5E9',
  },
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {},
}

export default GetDiscover 
