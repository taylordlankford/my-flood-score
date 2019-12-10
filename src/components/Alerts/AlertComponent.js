import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import { IoMdClose } from "react-icons/io";
import { pushClear } from "../../redux/actions/notificationActions";
import { useDispatch } from "react-redux";

const AlertComponent = props => {
  const dispatch = useDispatch();
  
  // returned function will be called on component unmount
  // We don't need to see the notification after unmounting
  // [] as second param makes useEffect call only once.
  useEffect(() => {
    return () => {
      dispatch(pushClear(""));
    };
  }, []);

  return (
    <>
      {props.notice !== "" ? (
        <Alert variant={props.flag}>{props.notice}</Alert>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </>
  );
};

export default AlertComponent;
