import InputText from "../../components/InputText";
import CountryBox from "../../components/CountryBox";
import SelectCountry from "../../components/SelectCountry";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import Rate from "./Rate";
import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";
import { HomeSvg, TransferSvg } from "../../assets/svg/svg";

const Home = () => {
  const { isSelectCountryOpen, senderObj, receiverObj, receiverAmount } =
    useAppContext();
  const [senderLocalObj, setSenderLocalObj] = useState();
  const [receiverLocalObj, setReceiverLocalObj] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setSenderLocalObj(senderObj);
    setReceiverLocalObj(receiverObj);
  }, [senderObj, receiverObj]);

  const goToReceiver = () => {
    if (receiverAmount > 0) {
      navigate("/receivers");
    } else {
      Notification.displayInfo({
        message: "Warning",
        description: "Money must be greater than 0",
      });
    }
  };
  return (
    <div className="home_container max-w-[600px] mx-auto h-full relative">
      <div
        className={`home ${
          isSelectCountryOpen ? "unshow" : "show"
        } transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between`}
      >
        <div className="flex-auto">
          <p className="w-full font-[500] text-center !font-custom mb-2">
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
                Receiving in<br></br> {receiverLocalObj?.countryName}
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
          className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
          onClick={goToReceiver}
        >
          Continue
        </Button>
        <nav className="pt-2  w-full border-t-2 border-grey flex flex-row gap-6 justify-around items-center">
          <NavLink to={"/home"} className={"flex flex-col gap-1 items-center"}>
            <HomeSvg />
            <p className="text-[0.7rem]">Home</p>
          </NavLink>
          <NavLink
            to={"/transfers"}
            className={"flex flex-col gap-1 items-center"}
          >
            <TransferSvg />
            <p className="text-[0.7rem]">Transfers</p>
          </NavLink>
        </nav>
      </div>
      <SelectCountry />
    </div>
  );
};

export default Home;
