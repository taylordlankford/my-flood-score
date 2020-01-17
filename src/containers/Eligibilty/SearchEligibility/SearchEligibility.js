import React, { useState } from 'react'
import * as ROUTES from '../../../routes/constants/routes'
import useReactRouter from 'use-react-router'
import {
  menuStyle,
  autosuggestTheme,
  AutoSuggestWrapper,
  AutoSuggestContainer,
  IframeSearchBtn
} from '../StyledComponents'
import AutoSuggest from '../../../components/AutoSuggest/AutoSuggest'
import { useFirestoreUser, useFirebase } from '../../../hooks'

const SearchEligibility = () => {
  // Hooks
  const { history } = useReactRouter()
  const { firestoreUser } = useFirestoreUser()
  const firebase = useFirebase()

  // States
  const [selectedSuggestion, setSelectedSuggestion] = useState('')

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log('selected', suggestion)
    if (firestoreUser) {
      history.push(ROUTES.ELIGIBILITY_RECOMMENDATION, { selected: suggestion })
    } else {
      history.push(ROUTES.ELIGIBILITY_RECOMMENDATION, { selected: suggestion })
    }
  }

  return (
    <AutoSuggestWrapper>
      <AutoSuggestContainer>
        <AutoSuggest
          autocomplete="off"
          theme={autosuggestTheme}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={{ id: "homeAddressSuggest" }}
          firebase={firebase}
        />
      </AutoSuggestContainer>
      <div>
        <IframeSearchBtn>
          Search
        </IframeSearchBtn>
      </div>
    </AutoSuggestWrapper>
  )
}

export default SearchEligibility