import { useLocation, useNavigate } from "react-router-dom";
import { BackSvg } from "../../assets/svg/svg";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Button, DatePicker, Input } from "antd";
import { convertToSymbol } from "../../utils/helper";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    receiverAmount,
    senderAmount,
    senderObj,
    receiverObj,
    userData,
    updateUserData,
  } = useAppContext();
  const [data, setData] = useState({});
  const [fee, setFee] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [deliveryTime, setDeliveryTime] = useState();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(0);
  const goBack = () => {
    navigate(-1);
  };

  const onChange = (value) => {
    // console.log("Selected Date: ", new Date(value));
    setDeliveryTime(new Date(value));
  };

  const completeProcess = async () => {
    setIsLoading(true);
    try {
      const oldTransactions = userData.transactions
        ? userData.transactions
        : [];
      const oldReceivers = userData.receivers ? userData.receivers : [];

      const newTransaction = {
        id: oldTransactions.length + 1 + 22343448,
        first_name: data?.first_name,
        last_name: data?.last_name,
        sender_name: senderName ? senderName : "Simplex",
        your_amount: senderAmount,
        amount: receiverAmount,
        delivery_time: deliveryTime,
        description: description,
        delivery_fee: fee,
        senderObj: senderObj,
        receiverObj: receiverObj,
        payment_details: data,
        created_at: new Date(),
        level: "delivery",
      };

      const newReciever = {
        id: oldReceivers.length + 1 + 22343448,
        data: data,
        payment_type: data.payment_method,
        receiverObj: receiverObj,
      };

      oldReceivers.push(newReciever);
      oldTransactions.push(newTransaction);
      const updateUser = await updateUserData({
        ...userData,
        receivers: oldReceivers,
        transactions: oldTransactions,
      });
      console.log(updateUser);
      setIsLoading(false);
      navigate("/success", {
        state: {
          sender_name: senderName,
          reciever_name: data?.first_name + " " + data?.last_name,
          transaction_id: oldTransactions.length + 22343448,
        },
      });
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state || !receiverAmount) {
      navigate("/home");
    } else {
      setData(location.state);
    }
  }, []);
  return (
    <div className="receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between z-2">
      <div className="nav mt-2 flex flex-row justify-between items-center">
        <div className="cursor-pointer" onClick={goBack}>
          <BackSvg />
        </div>
        <p className="text-[0.8rem]">Review your transfer</p>
        <div className="w-[20px] h-[20px]"></div>
      </div>

      <div className="flex-auto w-full mt-6 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lightgrey font-light">
              {data?.first_name} {data?.last_name} will receive
            </p>
            <p>
              {`${convertToSymbol(receiverObj?.currencyName)} 
          ${receiverAmount.toLocaleString()}`}
            </p>
          </div>
          <div>
            <p className="text-lightgrey font-light">
              to {data?.payment_method?.toUpperCase()}
            </p>
            {data?.card_number && <p>{data?.card_number}</p>}
            {data?.iban_number && <p>{data?.iban_number}</p>}
            {data?.account_number && <p>{data?.account_number}</p>}
            {data?.swift_code && <p>{data?.swift_code}</p>}
          </div>
          <div>
            <p className="text-lightgrey font-light">Should Arrive</p>
            <DatePicker onChange={onChange} />
          </div>
          <div className="receiverForm">
            <p className="text-lightgrey font-light">Total Fee</p>
            <Input
              className="max-w-[200px] rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
              placeholder=""
              type="number"
              onChange={(e) => setFee(e.target.value)}
            />
          </div>
          <div className="receiverForm">
            <p className="text-lightgrey font-light">Sender Name</p>
            <Input
              className="max-w-[200px] rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
              placeholder=""
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>
          <div className="receiverForm">
            <p className="text-lightgrey font-light">Description</p>
            <Input
              className="max-w-[200px] rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
              placeholder=""
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
          onClick={completeProcess}
        >
          Complete Transaction
        </Button>
      </div>
    </div>
  );
};

export default Review;
