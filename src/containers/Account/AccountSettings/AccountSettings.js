import React from "react";
import Container from "react-bootstrap/Container";
import { AccountContext } from "../AccountContext";
import NameFormToggle from "./Name/NameFormToggle";
import EmailFormToggle from "./Email/EmailFormToggle";
import CompanyFormToggle from "./Company/CompanyFormToggle";
import BillingAddressFormToggle from "./BillingAddress/BillingAddressFormToggle";
import { Title } from "../../../StyledComponents/StyledComponents"
import "./AccountSettings.css";
import { useSelector } from "react-redux";
import Notification from "../../../components/Notifications/Notification"

const AccountSettings = () => {
  const notice = useSelector(state => state.notification);
  console.log(notice)

  return (
    <AccountContext.Consumer>
      {value => (
        <Container>
          <Notification flag={notice.flag} notice={notice.message} />

          <Title>Account Settings</Title>
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
        </Container>
      )}
    </AccountContext.Consumer>
  );
};

export default AccountSettings;
