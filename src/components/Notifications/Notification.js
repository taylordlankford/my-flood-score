import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { pushClear } from "../../redux/actions/notificationActions";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const noticeData = useSelector(state => state.notification);
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
      {noticeData.show ? (
        <Alert
          variant={noticeData.flag}
          onClose={() => dispatch(pushClear(""))}
          dismissible
        >
          {noticeData.message}
        </Alert>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </>
  );
};

export default Notification;
