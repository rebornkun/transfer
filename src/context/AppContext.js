import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
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
import united_kingdomFlag from "../assets/imgs/united_kingdom.png";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Notification from "../components/Notification";
const userCollectionRef = collection(db, "Users");

const AppContext = createContext();

const initialState = {
  userData: {},
  isUserDataSet: false,
  isSelectCountryOpen: false,
  selectCountryType: "",
  senderObj: {
    currencyName: "GBP",
    flag: united_kingdomFlag,
    countryName: "United Kingdom",
    ISO: "GB",
  },
  senderAmount: 0,
  receiverObj: {
    currencyName: "GBP",
    flag: united_kingdomFlag,
    countryName: "United Kingdom",
    ISO: "GB",
  },
  receiverAmount: 0,
  rate: {
    firstCurrency: "GBP",
    rate: 1,
    secondCurrency: "GBP",
  },
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
  const updateRate = (obj) => {
    dispatch({
      type: UPDATE_RATE,
      payload: {
        rate: obj,
      },
    });
  };
  const updateSenderAmount = (amount) => {
    dispatch({
      type: UPDATE_SENDER_AMOUNT,
      payload: {
        senderAmount: Number(amount),
      },
    });
  };
  const updateRecieverAmount = (amount) => {
    dispatch({
      type: UPDATE_RECEIVER_AMOUNT,
      payload: {
        receiverAmount: Number(amount),
      },
    });
  };

  const runForex = (id) => {
    // console.log("forex");
    const sixHours = 1000 * 60 * 60 * 24;
    let lastForexTime;
    lastForexTime = new Date(localStorage.getItem("lastForexTime")).getTime();
    const nowTime = new Date().getTime();
    if (lastForexTime) {
      lastForexTime = new Date().getTime();
    }
    if (nowTime - lastForexTime > sixHours) {
      //new forex
      axios
        .get(
          `https://api.currencyapi.com/v3/latest?apikey=${process.env.REACT_APP_API_KEY}`
          // `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}`
        )
        .then(function (response) {
          console.log(response);
          if (response.data) {
            localStorage.setItem(
              "exchange",
              JSON.stringify(response.data.data)
            );
            localStorage.setItem("lastForexTime", new Date());
            convertCurrency(
              state.senderObj.currencyName,
              state.senderAmount,
              state.receiverObj.currencyName,
              state.receiverAmount,
              id
            );
          }
        })
        .catch(function (error) {
          alert("sorry, an error occurred!");
        });
    } else {
      //old forex
      convertCurrency(
        state.senderObj.currencyName,
        state.senderAmount,
        state.receiverObj.currencyName,
        state.receiverAmount,
        id
      );
    }
  };

  const convertCurrency = (
    firstCurrency,
    firstAmount,
    secondCurrency,
    secondAmount,
    id
  ) => {
    const exchange = JSON.parse(localStorage.getItem("exchange"));
    // Object.keys(exchange.rates).filter((keys) => keys === firstCurrency);
    if (id === 1) {
      let firstCurrencyEx =
        exchange[
          Object.keys(exchange).filter((keys) => keys === firstCurrency)
        ];
      let firstCurrencyToEUR = firstAmount / firstCurrencyEx?.value;
      let secondCurrencyEx =
        exchange[
          Object.keys(exchange).filter((keys) => keys === secondCurrency)
        ];
      let firstCurrencyInEURToSecondCurrency =
        firstCurrencyToEUR * secondCurrencyEx?.value;
      updateRecieverAmount(
        Number(Number(firstCurrencyInEURToSecondCurrency).toFixed(2))
      );
    } else if (id === 2) {
      let secondCurrencyEx =
        exchange[
          Object.keys(exchange).filter((keys) => keys === secondCurrency)
        ];
      let secondCurrencyToEUR = secondAmount / secondCurrencyEx?.value;
      let firstCurrencyEx =
        exchange[
          Object.keys(exchange).filter((keys) => keys === firstCurrency)
        ];
      let secondCurrencyInEURToSecondCurrency =
        secondCurrencyToEUR * firstCurrencyEx?.value;
      updateSenderAmount(
        Number(Number(secondCurrencyInEURToSecondCurrency).toFixed(2))
      );
    }

    let firstCurrencyExRate =
      exchange[Object.keys(exchange).filter((keys) => keys === firstCurrency)];
    let firstCurrencyToEUR = 1 / firstCurrencyExRate?.value;
    let secondCurrencyEx =
      exchange[Object.keys(exchange).filter((keys) => keys === secondCurrency)];
    let firstCurrencyInEURToSecondCurrency =
      firstCurrencyToEUR * secondCurrencyEx?.value;

    updateRate({
      firstCurrency: firstCurrency,
      rate: firstCurrencyInEURToSecondCurrency,
      secondCurrency: secondCurrency,
    });
  };

  const getUserData = async () => {
    const userStore = localStorage.getItem("user");
    const uid = JSON.parse(userStore).uid;
    try {
      onSnapshot(doc(db, "Users", uid), (doc) => {
        if (doc.metadata.fromCache) {
          Notification.displayInfo({
            message: "Error",
            description: "No Internet Connection, Refresh Page!",
          });
          return;
        }
        if (!doc.data()) {
          Notification.displayInfo({
            message: "Error",
            description: "Something went wrong somewhere, Please try again!",
          });
        } else {
          console.log("Current data: ", doc.data());
          dispatch({
            type: SET_USER_DATA,
            payload: {
              userData: doc.data(),
            },
          });
          dispatch({
            type: SET_USER_DATA_STATE,
            payload: {
              isUserDataSet: true,
            },
          });
        }
      });
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  const updateUserData = async (data) => {
    try {
      const res = await setDoc(doc(userCollectionRef, state.userData.id), data);
      return res;
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toogleSelectCountry,
        updateSenderObj,
        updateReceiverObj,
        runForex,
        updateRecieverAmount,
        updateSenderAmount,
        getUserData,
        updateUserData,
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
