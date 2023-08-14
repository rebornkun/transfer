import {
  TOOGLE_SELECT_COUNTRY,
  UPDATE_RECEIVER_DETAILS,
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
};
