import { Button } from "antd";
import { BigSucessSvg, ShareSvg } from "../../assets/svg/svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Notification from "../../components/Notification";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const currentUrl = window.location.origin;
  useEffect(() => {
    if (!location.state) {
      navigate("/home");
    } else {
      setData(location.state);
    }
  }, []);
  const copyTo = () => {
    Notification.displayInfo({
      message: "Success",
      description: "Transaction link copied",
    });
  };

  console.log(location.state);
  return (
    <div className="receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between z-2">
      <div className="flex-auto w-full mt-6 flex flex-col justify-between">
        <div className="flex flex-auto flex-col gap-4 items-center justify-center">
          <BigSucessSvg />
          <p className="font-bold text-[1.3rem] text-center !font-custom mt-4">
            Done!<br></br>Thanks {data?.sender_name}, your transfer has begun.
          </p>
          <p className="text-lightgrey font-light text-[0.9rem] text-center !font-custom ">
            check in at any point to see where your money is.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lightgrey font-light text-[0.9rem] mb-2">
            Tell {data?.reciever_name} where the money is
          </p>
          <CopyToClipboard
            text={`${currentUrl}/user/transfer-status/${data?.transaction_id}`}
          >
            <div
              className="flex flex-row items-center justify-center gap-2 mb-4 cursor-pointer"
              onClick={copyTo}
            >
              <ShareSvg />
              <p className="font-bold text-[#1677FF]">Share transfer status</p>
            </div>
          </CopyToClipboard>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
            onClick={() => navigate("/transfers")}
          >
            View transfers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
