import React, { useState } from 'react'
import { P, Rinput, Rspan } from './StyledComponents/StyledComponents'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { TopSection } from '../Products/StyledComponents'
import AutoSuggest from '../../components/AutoSuggest/AutoSuggest'

import requestGraphic1 from '../../assets/images/Compare.svg'

const GetDiscover = (props) => {
  const {
    history,
    firebase,
    getInventory,
    firestoreUser,
    getNewInventory,
    selected,
  } = props
  const categoryId = 'compare'
  const [validAddress1, setValidAddress1] = useState((selected) ? true : false)
  const [validAddress2, setValidAddress2] = useState(false)
  const [address1, setAddress1] = useState((selected) ? selected : "")
  const [address2, setAddress2] = useState("")
  const [distributionType, setDistributionType] = useState('zipCodes')

  const autoSuggestRef1 = React.createRef()
  const autoSuggestRef2 = React.createRef()

  const onSuggestionSelected1 = async (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    await autoSuggestRef1.current.setState({ value: suggestionValue })
    setValidAddress1(await autoSuggestRef1.current.validateValue())
    setAddress1(suggestionValue)
  }

  const onSuggestionSelected2 = async (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    await autoSuggestRef2.current.setState({ value: suggestionValue })
    setValidAddress2(await autoSuggestRef2.current.validateValue())
    setAddress2(suggestionValue)
  }
  
  const onChange1 = async (event, { newValue }) => {
    await autoSuggestRef1.current.setState({ value: newValue })
    setValidAddress1(await autoSuggestRef1.current.validateValue())
    setAddress1(newValue)
  }

  const onChange2 = async (event, { newValue }) => {
    await autoSuggestRef2.current.setState({ value: newValue })
    setValidAddress2(await autoSuggestRef2.current.validateValue())
    setAddress2(newValue)
  }

  const handleGetReport = async () => {
    // get the address's propertyRef
    const properties1 = await firebase.doFirestoreAddressRefGet(address1)
    const properties2 = await firebase.doFirestoreAddressRefGet(address2)
    // create report
    const setReportObj = {
      createdAt: new Date(),
      property1: properties1[0],
      property2: properties2[0],
      distributionType,
      categoryId,
      uid: firestoreUser.uid,
    }
    const reportRef = await firebase.doFirestoreAdd("reports", setReportObj)
    // Add to firestoreUser and decrease inventory
    const newInventory = getNewInventory(categoryId)
    const updateObj = {
      reports: firebase.app.firestore.FieldValue.arrayUnion({ distributionType, reportRef }),
      inventory: newInventory,
    }
    await firebase.doFirestoreUpdate("users", firestoreUser.uid, updateObj)    
    history.push("report/" + reportRef.id)
  }

  console.log('distributionType:', distributionType)
  return (
    <>
      <TopSection>Compare</TopSection>
        <Container style={{ marginTop: '18px', paddingLeft: '10px' }}>
        <Row>
          <Col sm={7}>
            <h4 style={{ marginLeft: '-10px' }}>Compare Two Properties</h4>
            <P style={{ marginTop: '22px', marginBottom: '3px' }}>First Address</P>
            <AutoSuggest
              ref={autoSuggestRef1}
              theme={autoSuggestTheme}
              onSuggestionSelected={onSuggestionSelected1}
              startingValue={address1}
              inputProps={{ id: 'requestAddressSuggest1' }}
              firebase={firebase}
              inputProps={{
                onChange: onChange1,
              }}
            />
            <P style={{ marginTop: '22px', marginBottom: '3px' }}>Second Address</P>
            <AutoSuggest
              ref={autoSuggestRef2}
              theme={autoSuggestTheme}
              onSuggestionSelected={onSuggestionSelected2}
              startingValue={address2}
              inputProps={{ id: 'requestAddressSuggest2' }}
              firebase={firebase}
              inputProps={{
                onChange: onChange2,
              }}
            />
            <P style={{ marginTop: '22px', marginBottom: '3px' }}>Score Distribution</P>
            <Form.Group controlId="distribution" style={{ width: '155px' }}>
              <Form.Control
                name="state"
                as="select"
                onChange={(e) => {setDistributionType(e.target.value)}}
              >
                <option value="zipCodes">By Zip Code</option> {/* value to match name of collection */}
                <option value="communityStats">By Community</option> {/* value to match name of collection */}
              </Form.Control >
            </Form.Group>
            <div style={{ marginTop: '30px', textAlign: 'center', paddingRight: '110px' }}>
            </div>
          </Col>
          <Col sm={5}>
            <img
              src={requestGraphic1}
              style={{ position: 'relative', width: '40%' }}
            />
            <P>Inventory <span style={{ color: 'black', fontSize: '10.5px' }}>v</span></P>
            <Rinput
              disabled
              value={getInventory(categoryId)}
            />
            <Rspan> Remaining</Rspan>
            <div style={{ height: '45px' }} />
            <Button
              onClick={handleGetReport}
              disabled={!(getInventory(categoryId) > 0) || !validAddress1 || !validAddress2}
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
