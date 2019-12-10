import {
  CLEAR,
  PRIMARY,
  SECONDARY,
  DANGER,
  SUCCESS,
  WARNING,
  INFO
} from "./action-types/notification-actions";

export const pushClear = (message, refObj) => ({
  type: CLEAR,
  message,
  refObj
});

export const pushPrimary = (message, refObj) => ({
  type: PRIMARY,
  message,
  refObj
});

export const pushSecondary = (message, refObj) => ({
  type: SECONDARY,
  message,
  refObj
})

export const pushSuccess = (message, refObj) => ({
  type: SUCCESS,
  message,
  refObj
})

export const pushWarning = (message, refObj) => ({
  type: WARNING,
  message,
  refObj
})

export const pushDanger = (message, refObj) => ({
  type: DANGER,
  message,
  refObj
})

export const pushInfo = (message, refObj) => ({
  type: INFO,
  message,
  refObj
})