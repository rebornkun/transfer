import InputText from "../../components/InputText";
import CountryBox from "../../components/CountryBox";
import SelectCountry from "../../components/SelectCountry";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import Rate from "./Rate";
import { Button } from "antd";

const Home = () => {
  const { isSelectCountryOpen, senderObj, receiverObj, receiverAmount } =
    useAppContext();
  const [senderLocalObj, setSenderLocalObj] = useState();
  const [receiverLocalObj, setReceiverLocalObj] = useState();

  useEffect(() => {
    setSenderLocalObj(senderObj);
    setReceiverLocalObj(receiverObj);
  }, [senderObj, receiverObj]);
  return (
    <div className="home_container max-w-[600px] mx-auto h-full relative">
      <div
        className={`home ${
          isSelectCountryOpen ? "unshow" : "show"
        } transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between`}
      >
        <div>
          <p className="w-full font-[500] text-center !font-custom">
            International transfer
          </p>
          <div className="mt-4 flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-darkgrey font-[400] leading-tight text-[0.8rem]">
                Sending from the <br></br>
                {senderLocalObj?.countryName}
              </p>
              <CountryBox type="sender" />
            </div>
            <InputText color={"black"} id={1} />
          </div>
          <Rate />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-darkgrey font-[400] leading-tight text-[0.8rem]">
                Receiving in {receiverLocalObj?.countryName}
              </p>
              <CountryBox type="receiver" />
            </div>
            <InputText color={"green"} id={2} />
          </div>
          <div className="middleLine flex flex-row w-full h-[30px] my-2 justify-center items-center gap-1">
            <div className="line h-[0.5px] bg-grey flex-auto"></div>
            {receiverAmount > 0 && (
              <p className="text-[0.8rem] text-darkgrey rounded-[10px] px-1 bg-green text-white text-[0.8rem]">
                Our best exchange rate!
              </p>
            )}
          </div>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-[40px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
        >
          Continue
        </Button>
      </div>
      <SelectCountry />
    </div>
  );
};

export default Home;
