import React, { useEffect, useState } from "react";
import * as ROUTES from "../../../routes/constants/routes";
import useReactRouter from "use-react-router";
import {
  menuStyle,
  autosuggestTheme,
  AutoSuggestWrapper,
  AutoSuggestContainer,
  IframeSearchBtn
} from "../StyledComponents";
import AutoSuggest from "../../../components/AutoSuggest/AutoSuggest";
import { useFirestoreUser, useFirebase } from "../../../hooks";

const SearchEligibility = props => {
  // Hooks
  const { history } = useReactRouter();
  const { firestoreUser } = useFirestoreUser();
  const firebase = useFirebase();
  const { handleOnClick } = { props }

  // States
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
  })

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log("selected", suggestion);
    setSelectedAddress(suggestion)
    console.log("Selected Address ==> ", selectedAddress)
  };

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
        <IframeSearchBtn onClick={e => handleOnClick(e)}>
          Proceed
        </IframeSearchBtn>
      </div>
    </AutoSuggestWrapper>
  );
};

export default SearchEligibility;
