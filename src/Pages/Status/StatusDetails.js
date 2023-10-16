import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowSvg,
  Cancel,
  CardPlaneSvg,
  CoinSvg,
  DeliverySvg,
  EditSvg,
  PersonSvg,
  QuestionSvg,
  ShareSvg,
  TransferSvg,
} from "../../assets/svg/svg";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { convertToSymbol } from "../../utils/helper";
import Contact from "../../components/Contact";
import Payment from "../../components/Payment";

const StatusDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const [showContact, setShowContact] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const goBack = () => {
    navigate(-1);
  };
  const handleNumber = (number) => {
    let numArr = number.split("");
    let final = [];
    for (let i = 0; i < numArr.length; i++) {
      if (i < numArr.length - 4) {
        final.push("*");
      } else {
        final.push(numArr[i]);
      }
    }
    return final.join("");
  };
  useEffect(() => {
    if (!location.state) {
      navigate(-1);
    } else {
      setData(location.state);
    }
  }, []);
  console.log(data);
  return (
    <div className="statusDetails transition duration-400 ease-in-out w-full h-full bg-white flex flex-col justify-between z-2">
      <div className="nav p-2 mt-2 flex flex-row justify-between items-center">
        <div className="cursor-pointer" onClick={goBack}>
          <Cancel />
        </div>
        <p className="text-[1rem]">Transfer #{data.id}</p>
        <div className="w-[20px] h-[20px] cursor-pointer"></div>
      </div>

      <div className="flex-auto w-full mt-4 flex flex-col justify-between overflow-y-auto">
        <div className="min-h-[170px] md:min-h-[200px] w-full flex flex-row relative gap-4 justify-center items-center">
          <div className="statusBack h-full w-full"></div>
          <div className="h-full w-full absolute flex flex-row md:gap-10 px-6 md:px-0 justify-between md:justify-center items-center top-0 right-0 left-0 bottom-0 m-auto z-10">
            <div className="flex flex-col gap-1 items-center">
              <p className="text-[0.8rem] md:text-[1rem] font-light text-white">
                {data?.senderObj?.countryName}
              </p>
              <p className="text-[1.8rem] md:text-[2.5rem] text-white">
                {data?.your_amount?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-[0.8rem] md:text-[1rem] font-light text-white">
                {data?.senderObj?.currencyName}
              </p>
            </div>
            <ArrowSvg />
            <div className="flex flex-col gap-1 items-center">
              <p className="text-[0.8rem] md:text-[1rem] font-light text-white">
                {data?.receiverObj?.countryName}
              </p>
              <p className="text-[1.8rem] md:text-[2.5rem] text-white">
                {data?.amount?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-[0.8rem] md:text-[1rem] font-light text-white">
                {data?.receiverObj?.currencyName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full w-full p-2 mt-6">
          <div className="flex flex-col gap-4">
            <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <PersonSvg />
              <div className="flex flex-col w-full">
                <p className="text-darkgrey font-light text-[0.7rem] mb-1">
                  Receiver
                </p>
                <p className=" leading-tight">
                  {data?.first_name} {data?.last_name}
                </p>
                <p className="text-darkgrey font-light leading-none">
                  {data?.payment_details?.card_number &&
                    handleNumber(data?.payment_details?.card_number)}
                  {data?.payment_details?.iban_number &&
                    handleNumber(data?.payment_details?.iban_number)}
                  {data?.payment_details?.account_number &&
                    !data?.payment_details?.swift_code &&
                    handleNumber(data?.payment_details?.account_number)}
                  {data?.payment_details?.swift_code &&
                    handleNumber(data?.payment_details?.swift_code)}
                </p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div>
            <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <DeliverySvg />
              <div className="flex flex-col w-full">
                <p className="text-darkgrey font-light text-[0.7rem] mb-1">
                  {data?.level === "delivery" ? "Delivery" : "Approval"} time
                </p>
                <p className="leading-tight">
                  {data?.delivery_time &&
                    new Date(
                      data?.delivery_time?.seconds * 1000
                    ).toDateString()}
                </p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div>
            <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <CardPlaneSvg />
              <div className="flex flex-col w-full">
                <p className="text-darkgrey font-light text-[0.7rem] mb-1">
                  Payment method
                </p>
                <p className="leading-tight">
                  {data?.payment_details?.card_number && <p>Bank Transfer</p>}
                  {data?.payment_details?.iban_number && <p>Bank Transfer</p>}
                  {data?.payment_details?.account_number &&
                    !data?.payment_details?.swift_code && <p>Bank Transfer</p>}
                  {data?.payment_details?.swift_code && <p>Bank Transfer</p>}
                </p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div>
            <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <CoinSvg />
              <div className="flex flex-col w-full">
                <p className="text-darkgrey font-light text-[0.7rem] mb-1">
                  {data?.level === "delivery" ? "Delivery" : "Approval"} fee
                </p>
                <p className="leading-tight">
                  {convertToSymbol(data?.receiverObj?.currencyName)}
                  {data?.delivery_fee
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div>
            <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <EditSvg />
              <div className="flex flex-col w-full">
                <p className="text-darkgrey font-light text-[0.7rem] mb-1">
                  Reference (optional)
                </p>
                <p className="leading-tight">Sent from {data?.sender_name}</p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div>
            <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <QuestionSvg />
              <div className="flex flex-col w-full cursor-pointer">
                <p
                  className="leading-tight my-1 mt-3"
                  onClick={() => setShowContact(true)}
                >
                  Contact customer support
                </p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div>
            {/* <div className="statusDetailsSvg flex flex-row gap-6 items-center w-full">
              <ShareSvg />
              <div className="flex flex-col w-full">
                <p className="leading-tight my-1 mt-3">Share transfer status</p>
                <div className="bg-grey h-[1px] w-full mt-3"></div>
              </div>
            </div> */}
          </div>
          <Button
            type="primary"
            className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
            onClick={() => setShowPayment(true)}
          >
            Payment instructions
          </Button>
        </div>
      </div>
      <Contact
        show={showContact}
        handleOk={() => {}}
        handleCancel={() => {
          setShowContact(false);
        }}
      />
      <Payment
        show={showPayment}
        handleOk={() => {}}
        handleCancel={() => {
          setShowPayment(false);
        }}
        amount={`${convertToSymbol(data?.receiverObj?.currencyName)}${
          data?.delivery_fee
        }`}
        txn_id={data?.id}
        data={data}
      />
    </div>
  );
};

export default StatusDetails;
