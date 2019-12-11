import React from "react";
import { AccountContext } from "../AccountContext";
import NameFormToggle from "./Name/NameFormToggle";
import EmailFormToggle from "./Email/EmailFormToggle";
import CompanyFormToggle from "./Company/CompanyFormToggle";
import BillingAddressFormToggle from "./BillingAddress/BillingAddressFormToggle";
import {
  Container,
  Wrapper,
  Title
} from "../../../StyledComponents/StyledComponents";
import Notification from "../../../components/Notifications/Notification";

const AccountSettings = () => {
  return (
    <AccountContext.Consumer>
      {value => (
        <Container>
          <Notification />
          <Title>Account Settings</Title>
          <Wrapper padding="20px 0 20px 0">
            <NameFormToggle
              firebase={value.firebase}
              firestoreUser={value.firestoreUser}
            />

            <EmailFormToggle
              firebase={value.firebase}
              firestoreUser={value.firestoreUser}
            />

            <CompanyFormToggle
              firebase={value.firebase}
              firestoreUser={value.firestoreUser}
            />

            <BillingAddressFormToggle
              firebase={value.firebase}
              firestoreUser={value.firestoreUser}
            />
          </Wrapper>
        </Container>
      )}
    </AccountContext.Consumer>
  );
};

export default AccountSettings;
