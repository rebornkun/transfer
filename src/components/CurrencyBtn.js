import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const CurrencyBtn = ({ flag, name, currency, ISO }) => {
  const {
    updateSenderObj,
    updateReceiverObj,
    selectCountryType,
    toogleSelectCountry,
    senderObj,
    receiverObj,
    runForex,
    isSelectCountryOpen,
  } = useAppContext();

  const [obj, setObj] = useState();
  const selectCurrency = () => {
    if (selectCountryType === "sender") {
      updateSenderObj({
        currencyName: currency,
        flag: flag,
        countryName: name,
        ISO: ISO,
      });
    } else {
      updateReceiverObj({
        currencyName: currency,
        flag: flag,
        countryName: name,
        ISO: ISO,
      });
    }
    toogleSelectCountry(false);
  };

  useEffect(() => {
    if (selectCountryType === "sender") {
      setObj(senderObj);
    } else {
      setObj(receiverObj);
    }
  }, [senderObj, receiverObj, selectCountryType]);

  return (
    <div
      className="p-2 flex flex-row gap-4 items-center cursor-pointer hover:bg-[#8085ff]"
      onClick={() => selectCurrency()}
    >
      <img src={flag} alt="flag" className="h-[15px] w-[20px] rounded-[3px]" />
      <div className="flex flex-row gap-1">
        <p
          className="font-[400] text-[0.8rem]"
          style={{
            color:
              name === obj?.countryName && currency === obj?.currencyName
                ? "green"
                : "black",
          }}
        >
          {name}
        </p>
        <p className="font-[400] text-[0.8rem] text-darkgrey"> ~ {currency}</p>
      </div>
    </div>
  );
};

export default CurrencyBtn;
