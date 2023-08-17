import { useEffect, useState } from "react";
import { BothArrows } from "../../assets/svg/svg";
import { useAppContext } from "../../context/AppContext";

const Rate = () => {
  const { rate, senderObj, receiverObj } = useAppContext();
  const [rateLocalObj, setRateLocalObj] = useState();

  useEffect(() => {
    setRateLocalObj(rate);
  }, [rate, senderObj, receiverObj]);

  return (
    <div className="middleLine flex flex-row w-full h-[30px] my-2 justify-center items-center gap-1">
      <BothArrows />
      <div className="line h-[0.5px] bg-grey flex-auto"></div>
      <p className="text-[0.8rem] text-darkgrey">
        1 {rateLocalObj?.firstCurrency} ={" "}
        {Number(rateLocalObj?.rate).toFixed(5)} {rateLocalObj?.secondCurrency} ~
        Delivery fee £0.00
      </p>
    </div>
  );
};

export default Rate;
