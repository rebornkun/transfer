import InputText from "../../components/InputText";
import CountryBox from "../../components/CountryBox";
import { BothArrows } from "../../assets/svg/svg";
import SelectCountry from "../../components/SelectCountry";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

const Home = () => {
  const { isSelectCountryOpen, senderObj, receiverObj } = useAppContext();
  const [senderLocalObj, setSenderLocalObj] = useState();
  const [receiverLocalObj, setReceiverLocalObj] = useState();
  useEffect(() => {
    setSenderLocalObj(senderObj);
    setReceiverLocalObj(receiverObj);
  }, [senderObj, receiverObj]);
  return (
    <div className="home_container max-w-[600px] mx-auto h-screen  relative">
      <div
        className={`home ${
          isSelectCountryOpen ? "unshow" : "show"
        } transition duration-400 ease-in-out w-full h-full bg-white p-2`}
      >
        <div>
          <p className="mt-2 w-full font-[500] text-center">
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
          <div className="middleLine flex flex-row w-full h-[30px] my-2 justify-center items-center gap-1">
            <BothArrows />
            <div className="line h-[0.5px] bg-grey flex-auto"></div>
            <p className="text-[0.8rem] text-darkgrey">
              1 GBP = 5.13477 PLN ~ Delivery fee £0.00
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-darkgrey font-[400] leading-tight text-[0.8rem]">
                Receiving in {receiverLocalObj?.countryName}
              </p>
              <CountryBox type="receiver" />
            </div>
            <InputText color={"green"} id={2} />
          </div>
        </div>
      </div>
      <SelectCountry />
    </div>
  );
};

export default Home;
