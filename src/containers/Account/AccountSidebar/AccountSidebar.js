import React, { useState } from "react";
import useReactRouter from "use-react-router";
import { useFirestoreUser, useFirebase } from "../../../hooks";
import * as ROUTES from "../../../routes/constants/routes";
import "./AccountSidebar.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Col from "react-bootstrap/Col";
import { FaSignOutAlt } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_LINKS } from "./SidebarData";

const AccountSidebar = props => {
  const firebase = useFirebase();
  const userData = useFirestoreUser();
  const { firestoreUser } = userData;
  const [sidebarItems] = useState(SIDEBAR_LINKS);
  const { history } = useReactRouter()

  const handleSignOut = firebase => {
    firebase.doSignOut().then(() => {
      history.push(ROUTES.HOME);
    });
  };

  return (
    <Col sm={3}>
      <ListGroup>
        {sidebarItems.map((item, key) => (
          <SidebarItem
            key={key}
            routePath={item.routePath}
            sidebarIcon={item.sidebarIcon}
            sidebarLink={item.sidebarLink}
          />
        ))}
        <ListGroupItem>
          <span>
            <FaSignOutAlt style={{ fill: "#c4c4c4" }} />
          </span>
          <span id="logout-link" onClick={() => handleSignOut(firebase)}>
            Logout
          </span>
        </ListGroupItem>
      </ListGroup>
    </Col>
  );
};

export default AccountSidebar;
