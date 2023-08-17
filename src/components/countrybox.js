import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { countries } from "./countries";

const CountryBox = ({ type }) => {
  const { toogleSelectCountry, senderObj, receiverObj } = useAppContext();
  const [obj, setObj] = useState();

  useEffect(() => {
    if (type === "sender") {
      setObj(senderObj);
    } else {
      setObj(receiverObj);
    }
  }, [senderObj, receiverObj]);
  return (
    <div
      className="flex flex-row gap-2 items-center cursor-pointer"
      onClick={() => toogleSelectCountry(true, type)}
    >
      <img
        src={obj?.flag}
        alt="flag"
        className="h-[15px] w-[20px] rounded-[3px] shadow"
      />
      <p className="font-[500]">{obj?.currencyName}</p>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7 6.29289L12.6464 0.646447C12.8417 0.451184 13.1583 0.451184 13.3536 0.646447C13.5488 0.841709 13.5488 1.15829 13.3536 1.35355L7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

export default CountryBox;
