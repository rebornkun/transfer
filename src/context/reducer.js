import {
  SET_USER_DATA,
  SET_USER_DATA_STATE,
  TOOGLE_SELECT_COUNTRY,
  UPDATE_RATE,
  UPDATE_RECEIVER_AMOUNT,
  UPDATE_RECEIVER_DETAILS,
  UPDATE_SENDER_AMOUNT,
  UPDATE_SENDER_DETAILS,
} from "./actions";

export const reducer = (state, action) => {
  if (action.type === TOOGLE_SELECT_COUNTRY) {
    return {
      ...state,
      isSelectCountryOpen: action.payload.isSelectCountryOpen,
      selectCountryType: action.payload.selectCountryType,
    };
  }
  if (action.type === UPDATE_SENDER_DETAILS) {
    return {
      ...state,
      senderObj: action.payload.senderObj,
    };
  }
  if (action.type === UPDATE_RECEIVER_DETAILS) {
    return {
      ...state,
      receiverObj: action.payload.receiverObj,
    };
  }
  if (action.type === UPDATE_SENDER_AMOUNT) {
    return {
      ...state,
      senderAmount: action.payload.senderAmount,
    };
  }
  if (action.type === UPDATE_RECEIVER_AMOUNT) {
    return {
      ...state,
      receiverAmount: action.payload.receiverAmount,
    };
  }
  if (action.type === UPDATE_RATE) {
    return {
      ...state,
      rate: action.payload.rate,
    };
  }
  if (action.type === SET_USER_DATA) {
    return {
      ...state,
      userData: action.payload.userData,
    };
  }
  if (action.type === SET_USER_DATA_STATE) {
    return {
      ...state,
      isUserDataSet: action.payload.isUserDataSet,
    };
  }
};
