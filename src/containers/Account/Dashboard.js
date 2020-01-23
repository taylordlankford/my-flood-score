import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/constants/routes";
import { AccountContext } from "./AccountContext";
import { Title } from "../../StyledComponents/StyledComponents";

const Dashboard = props => {
  const handleSignOut = firebase => {
    firebase.doSignOut().then(() => {
      props.history.push(ROUTES.HOME);
    });
  };

  return (
    <AccountContext.Consumer>
      {value => (
        <>
          <div className="dashboard">
            <Title>Your Dashboard</Title>
            <p>
              Hello{" "}
              <b>
                {value.firestoreUser.firstName +
                  " " +
                  value.firestoreUser.lastName}
              </b>{" "}
              (Not{" "}
              <b>
                {value.firestoreUser.firstName +
                  " " +
                  value.firestoreUser.lastName}
              </b>
              ?{" "}
              <a
                className="inactive-link"
                onClick={() => handleSignOut(value.firebase)}
              >
                Log out
              </a>
              )
            </p>
            <p>
              From your account dashboard you can view your{" "}
              <Link to={ROUTES.ACCOUNT_ORDERS} className="inactive-link">
                recent orders
              </Link>
              , manage your{" "}
              <Link to={ROUTES.ACCOUNT_SETTINGS} className="inactive-link">
                shipping and billing addresses
              </Link>
              , and{" "}
              <Link to={ROUTES.ACCOUNT_SETTINGS} className="inactive-link">
                edit your password and account details
              </Link>
              .
            </p>
          </div>
        </>
      )}
    </AccountContext.Consumer>
  );
};

export default Dashboard;
