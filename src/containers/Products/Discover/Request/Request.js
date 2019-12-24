import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { TopSection } from '../../StyledComponents'
import AutoSuggest from '../../../../components/AutoSuggest/AutoSuggest'
import { useFirebase, useFirestoreUser } from '../../../../hooks'

import requestGraphic1 from '../../../../assets/images/request-graphic1.png'
import requestGraphic2 from '../../../../assets/images/request-graphic2.png'

// import * as ROUTES from '../../../../routes/constants/routes'

const Request = (props) => {
  const [validAddress, setValidAddress] = useState(false)
  const [address, setAddress] = useState("")

  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

  const autoSuggestRef = React.createRef()

  useEffect(() => {
    const { state } = props.location
    let selected = ''
    if (state !== undefined) {
      selected = state.selected
      setAddress(selected)
      setValidAddress(true)
    }
  }, [])

  const onSuggestionSelected = async (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log('selected', suggestion)
    console.log('suggestionValue', suggestionValue)
    await autoSuggestRef.current.setState({ value: suggestionValue })
    setValidAddress(await autoSuggestRef.current.validateValue())
    setAddress(suggestionValue)
    // history.push(ROUTES.CHECKOUT_FREE, { selected: suggestion })
  }

  const getInventory = () => {
    const discoverInventory =  firestoreUser.inventory.filter((item) => {
      return item.categoryId === 'discover'
    })
    return discoverInventory[0].quantity
  }

  const onChange = async (event, { newValue }) => {
    console.log('newValue:', newValue)
    await autoSuggestRef.current.setState({ value: newValue })
    setValidAddress(await autoSuggestRef.current.validateValue())
    setAddress(newValue)
  }

  const handleGetReport = async () => {
    // get the address's propertyRef
    console.log('firebase:', firebase)
    const properties = await firebase.doFirestoreAddressRefGet(address)
    console.log('properties', properties)
    // create report
    const setObj = {
      createdAt: new Date(),
      property: properties[0],
      uid: firestoreUser.uid,
    }
    const reportRef = await firebase.doFirestoreAdd("reports", setObj)
    console.log('reportRef', reportRef)
    // Add to firestoreUser and decrease inventory
    const index = firestoreUser.inventory.map(e => e.categoryId).indexOf('discover')
    let newInventory = firestoreUser.inventory
    newInventory[index].quantity--
    const updateObj = {
      reports: firebase.app.firestore.FieldValue.arrayUnion({ address, reportRef }),
      inventory: newInventory,
    }
    await firebase.doFirestoreUpdate("users", firestoreUser.uid, updateObj)    
    props.history.push("report/" + reportRef.id)
  }

  if (loading) {
    return 'loading...'
  }

  if (firestoreUser === null) {
    return 'Unautherized'
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
            value={getInventory()}
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

const P = styled.p`
  margin-top: 39px;
  font-size: 18px;
  font-weight: bold;
  color: #7F7F7F;
  font-family: "Montserrat Alternates", sans-serif;
`;

const Rinput = styled.input`
  color: black;
  background: #f2f2f2;
  border: 1px solid #ced4da !important;
  border-radius: 0.3rem !important;
  box-shadow: 0 0 0 2px transparent, 0 1px 0 rgba(0,0,0,0.08) inset !important;
  box-sizing: border-box !important;
  width: 3rem !important;
  height: 2.8rem !important;
  line-height: 2.8rem !important;
  padding: 0 0.3rem !important;
`;

const Rspan = styled.span`
  color: #868686;
  font-weight: bold;
`;

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

export default Request
