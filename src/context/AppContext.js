import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import {
  TOOGLE_SELECT_COUNTRY,
  UPDATE_RATE,
  UPDATE_RECEIVER_AMOUNT,
  UPDATE_RECEIVER_DETAILS,
  UPDATE_SENDER_AMOUNT,
  UPDATE_SENDER_DETAILS,
} from "./actions";
import united_kingdomFlag from "../assets/imgs/united_kingdom.png";
import axios from "axios";

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
    console.log(amount);
    dispatch({
      type: UPDATE_SENDER_AMOUNT,
      payload: {
        senderAmount: Number(amount),
      },
    });
  };
  const updateRecieverAmount = (amount) => {
    console.log(amount);
    dispatch({
      type: UPDATE_RECEIVER_AMOUNT,
      payload: {
        receiverAmount: Number(amount),
      },
    });
  };

  const runForex = (id) => {
    console.log("forex");
    const sixHours = 1000 * 60 * 60 * 6;
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
          `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}`
        )
        .then(function (response) {
          console.log(response);
          localStorage.setItem("exchange", JSON.stringify(response.data));
          localStorage.setItem("lastForexTime", new Date());
          convertCurrency(
            state.senderObj.currencyName,
            state.senderAmount,
            state.receiverObj.currencyName,
            state.receiverAmount,
            id
          );
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
    Object.keys(exchange.rates).filter((keys) => keys === firstCurrency);
    if (id === 1) {
      let firstCurrencyEx =
        exchange.rates[
          Object.keys(exchange.rates).filter((keys) => keys === firstCurrency)
        ];
      let firstCurrencyToEUR = firstAmount / firstCurrencyEx;
      let secondCurrencyEx =
        exchange.rates[
          Object.keys(exchange.rates).filter((keys) => keys === secondCurrency)
        ];
      let firstCurrencyInEURToSecondCurrency =
        firstCurrencyToEUR * secondCurrencyEx;
      updateRecieverAmount(
        Number(Number(firstCurrencyInEURToSecondCurrency).toFixed(2))
      );
    } else if (id === 2) {
      let secondCurrencyEx =
        exchange.rates[
          Object.keys(exchange.rates).filter((keys) => keys === secondCurrency)
        ];
      let secondCurrencyToEUR = secondAmount / secondCurrencyEx;
      let firstCurrencyEx =
        exchange.rates[
          Object.keys(exchange.rates).filter((keys) => keys === firstCurrency)
        ];
      let secondCurrencyInEURToSecondCurrency =
        secondCurrencyToEUR * firstCurrencyEx;
      updateSenderAmount(
        Number(Number(secondCurrencyInEURToSecondCurrency).toFixed(2))
      );
    }

    let firstCurrencyExRate =
      exchange.rates[
        Object.keys(exchange.rates).filter((keys) => keys === firstCurrency)
      ];
    let firstCurrencyToEUR = 1 / firstCurrencyExRate;
    let secondCurrencyEx =
      exchange.rates[
        Object.keys(exchange.rates).filter((keys) => keys === secondCurrency)
      ];
    let firstCurrencyInEURToSecondCurrency =
      firstCurrencyToEUR * secondCurrencyEx;

    updateRate({
      firstCurrency: firstCurrency,
      rate: firstCurrencyInEURToSecondCurrency,
      secondCurrency: secondCurrency,
    });
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
