import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackSvg, EditSvg, ShareSvg } from "../../assets/svg/svg";
import { convertToSymbol } from "../../utils/helper";
import { Button, DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { useAppContext } from "../../context/AppContext";
import Notification from "../../components/Notification";
import CopyToClipboard from "react-copy-to-clipboard";

const ViewTransfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const [fee, setFee] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(dayjs(new Date()));
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("delivery");
  const { userData, updateUserData } = useAppContext();

  const goBack = () => {
    navigate(-1);
  };

  const onChange = (value) => {
    setDeliveryTime(dayjs(new Date(value)));
  };

  const completeProcess = async () => {
    setIsLoading(true);
    try {
      const oldTransactions = userData.transactions
        ? userData.transactions
        : [];
      const otherTransactions = oldTransactions.filter((trans) => {
        return trans.id !== data.id;
      });
      const updatedTransaction = {
        ...data,
        delivery_fee: fee,
        delivery_time: new Date(deliveryTime),
        sender_name: senderName,
        description: description,
        level: level,
      };

      console.log(updatedTransaction);

      otherTransactions.push(updatedTransaction);
      const updateUser = await updateUserData({
        ...userData,
        transactions: otherTransactions,
      });
      console.log(updateUser);
      setIsLoading(false);
      Notification.displayInfo({
        message: "Success",
        description: "Transactions updated",
      });
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      Notification.displayInfo({
        message: "Error",
        description: e.message || e.code,
      });
    }
  };
  useEffect(() => {
    if (!location.state) {
      navigate(-1);
    } else {
      setData(location.state);
      setFee(Number(location?.state?.delivery_fee));
      setSenderName(location?.state?.sender_name);
      setDeliveryTime(
        dayjs(new Date(location?.state?.delivery_time?.seconds * 1000))
      );
      setLevel(location?.state?.level);
    }
  }, []);
  const currentUrl = window.location.origin;
  const copyTo = () => {
    Notification.displayInfo({
      message: "Success",
      description: "Transaction link copied",
    });
  };
  console.log(data);
  return (
    <div className="receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between z-2">
      <div className="nav mt-2 flex flex-row justify-between items-center">
        <div className="cursor-pointer" onClick={goBack}>
          <BackSvg />
        </div>
        <p className="text-[0.8rem]">Review your transfer</p>
        <div
          className="w-[20px] h-[20px] cursor-pointer"
          onClick={() => {
            setIsInEditMode(true);
          }}
        >
          <EditSvg />
        </div>
      </div>

      <div className="flex-auto w-full mt-6 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lightgrey font-light">
              {data?.first_name} {data?.last_name} will receive
            </p>
            <p>
              {`${convertToSymbol(data?.receiverObj?.currencyName)} 
          ${data?.amount?.toLocaleString()}`}
            </p>
          </div>
          <div>
            <p className="text-lightgrey font-light">
              to {data?.payment_details?.payment_method?.toUpperCase()}
            </p>
            {data?.payment_details?.card_number && (
              <p>{data?.payment_details?.card_number}</p>
            )}
            {data?.payment_details?.iban_number && (
              <p>{data?.payment_details?.iban_number}</p>
            )}
            {data?.payment_details?.account_number && (
              <p>{data?.payment_details?.account_number}</p>
            )}
            {data?.payment_details?.swift_code && (
              <p>{data?.payment_details?.swift_code}</p>
            )}
          </div>
          <div>
            <p className="text-lightgrey font-light">Should Arrive</p>
            <DatePicker
              className="transition duration-400 ease-in-out"
              onChange={onChange}
              value={deliveryTime}
              disabled={!isInEditMode}
            />
          </div>
          <div className="receiverForm">
            <p className="text-lightgrey font-light">Total Fee</p>
            <Input
              className="max-w-[200px] rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0 transition duration-400 ease-in-out"
              placeholder=""
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              disabled={!isInEditMode}
            />
          </div>
          <div className="receiverForm">
            <p className="text-lightgrey font-light">Sender Name</p>
            <Input
              className="max-w-[200px] rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0 transition duration-400 ease-in-out"
              placeholder=""
              onChange={(e) => setSenderName(e.target.value)}
              value={senderName}
              disabled={!isInEditMode}
            />
          </div>
          <div className="receiverForm">
            <p className="text-lightgrey font-light">Description</p>
            <Input
              className="max-w-[200px] rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0 transition duration-400 ease-in-out"
              placeholder=""
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              disabled={!isInEditMode}
            />
          </div>
          <div className="flex flex-row items-center gap-4 flex-wrap">
            <label className="flex flex-row items-center gap-1">
              <input
                type="radio"
                checked={level === "delivery"}
                onChange={() => setLevel("delivery")}
                disabled={!isInEditMode}
              />
              Delivery fee
            </label>
            <label className="flex flex-row items-center gap-1">
              <input
                type="radio"
                checked={level === "approval"}
                onChange={() => setLevel("approval")}
                disabled={!isInEditMode}
              />
              Approval fee
            </label>
            <label className="flex flex-row items-center gap-1">
              <input
                type="radio"
                checked={level === "tax"}
                onChange={() => setLevel("tax")}
                disabled={!isInEditMode}
              />
              Tax fee
            </label>
            <label className="flex flex-row items-center gap-1">
              <input
                type="radio"
                checked={level === "complete"}
                onChange={() => setLevel("complete")}
                disabled={!isInEditMode}
              />
              Complete
            </label>
          </div>
          {data?.payment_url && (
            <div className="receiverForm">
              <p className="text-lightgrey font-light">Status</p>
              <a href={data?.payment_url} target="_blank">
                click to view payment receipt
              </a>
            </div>
          )}
          <div className="receiverForm w-fit mt-4">
            <CopyToClipboard
              text={`${currentUrl}/user/transfer-status/${data?.id}`}
            >
              <div
                className="flex flex-row items-center justify-center gap-2 mb-4 cursor-pointer"
                onClick={copyTo}
              >
                <ShareSvg />
                <p className="font-bold text-[#1677FF]">
                  Share transfer status
                </p>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        {isInEditMode && (
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
            onClick={completeProcess}
          >
            Edit Transaction
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewTransfer;
