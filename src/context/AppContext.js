import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import {
  TOOGLE_SELECT_COUNTRY,
  UPDATE_RECEIVER_DETAILS,
  UPDATE_SENDER_DETAILS,
} from "./actions";
import united_kingdomFlag from "../assets/imgs/united_kingdom.png";

const AppContext = createContext();

const initialState = {
  isSelectCountryOpen: false,
  selectCountryType: "",
  senderObj: {
    currencyName: "GBP",
    flag: united_kingdomFlag,
    countryName: "United Kingdom",
  },
  senderAmount: 0,
  receiverObj: {
    currencyName: "GBP",
    flag: united_kingdomFlag,
    countryName: "United Kingdom",
  },
  receiverAmount: 0,
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toogleSelectCountry = (query, type) => {
    dispatch({
      type: TOOGLE_SELECT_COUNTRY,
      payload: {
        isSelectCountryOpen: query,
        selectCountryType: type,
      },
    });
  };

  const updateSenderObj = (obj) => {
    dispatch({
      type: UPDATE_SENDER_DETAILS,
      payload: {
        senderObj: obj,
      },
    });
  };

  const updateReceiverObj = (obj) => {
    dispatch({
      type: UPDATE_RECEIVER_DETAILS,
      payload: {
        receiverObj: obj,
      },
    });
  };

  const updateSenderAmount = (amount) => {
    dispatch({
      type: UPDATE_SENDER_DETAILS,
      payload: {
        senderAmount: amount,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toogleSelectCountry,
        updateSenderObj,
        updateReceiverObj,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, initialState, useAppContext, ContextProvider };
