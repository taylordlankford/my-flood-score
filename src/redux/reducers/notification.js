import {
  CLEAR,
  PRIMARY,
  SECONDARY,
  DANGER,
  SUCCESS,
  WARNING,
  INFO
} from "../actions/action-types/notification-actions";
import { notificationInitState } from "../notificationInitState";

// Notifcation Reducer
const notification = (state = notificationInitState, action) => {
  const message = action.message;
  const refObj = action.refObj;

  switch (action.type) {
    case CLEAR: {
      const flag = "light"
      const notice = { message, flag, refObj };
      return notice;
    }
    case PRIMARY: {
      const flag = "primary"
      const notice = { message, flag, refObj };
      return notice;
    }
    case SECONDARY: {
      const flag = "secondary"
      const notice = { message, flag, refObj };
      return notice;
    }
    case SUCCESS: {
      const flag = "success"
      const notice = { message, flag, refObj };
      return notice;
    }
    case DANGER: {
      const flag = "danger"
      const notice = { message, flag, refObj };
      return notice
    }
    case WARNING: {
      const flag = "warning"
      const notice = { message, flag, refObj };
      return notice
    }
    case INFO: {
      const flag = "info"
      const notice = { message, flag, refObj };
      return notice
    }
    default:
      return state;
  }
};

export default notification;
