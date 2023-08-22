import { useNavigate } from "react-router-dom";
import { BackSvg, PlusSvg } from "../../assets/svg/svg";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import AddReceivers from "./AddReceivers";
import AddNewReceivers from "./AddNewReceivers";

const Receivers = () => {
  const navigate = useNavigate();
  const { userData } = useAppContext();
  const [page, setPage] = useState("home");
  const goBack = () => {
    navigate(-1);
  };
  const addReceiver = () => {
    setPage("add_receivers");
  };
  // console.log(userData);
  const goToReview = (data) => {
    // let stateData;
    // console.log(data);
    // if (data?.payment_type === "card") {
    //   stateData = {
    //     payment_method: "card",
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    //     card_number: data.card_number,
    //     expire: data.expire,
    //   };
    // } else if (data?.payment_type === "iban") {
    // }
    // navigate("/review_transfer", {
    //   state: stateData,
    // });
  };

  return (
    <div className="receivers_container max-w-[600px] mx-auto h-full relative">
      {page === "home" ? (
        <div
          className={`receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between`}
        >
          <div className="nav mt-2 flex flex-row justify-between items-center">
            <div className="cursor-pointer" onClick={goBack}>
              <BackSvg />
            </div>
            <p className="text-[0.8rem]">Select receiver</p>
            <div className="cursor-pointer" onClick={addReceiver}>
              <PlusSvg />
            </div>
          </div>

          <div className="flex-auto w-full mt-2 flex flex-col overflow-y-auto">
            {!userData?.receivers || userData?.receivers?.length < 1 ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <p className="text-[1rem] font-bold">
                  You have no receivers yet
                </p>
                <p className="text-[0.8rem] text-lightgrey font-light text-center !font-custom">
                  Receivers of your money transfers <br></br> are saved here
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4 overflow-y-auto">
                {userData.receivers.map((data) => {
                  return (
                    <div
                      className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center min-h-[70px] px-2 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
                      onClick={() => goToReview(data)}
                    >
                      <div className="relative rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                        <img
                          className="absolute w-[30px] h-[17px] bottom-[-1px]"
                          src={data.receiverObj.flag}
                          alt="flag"
                        />
                      </div>
                      <div className="flex flex-col gap-05">
                        <p className="h-fit text-[0.8rem]">
                          {data.data.first_name} {data.data.last_name}
                        </p>
                        <p className="h-fit font-light text-[0.8rem] text-lightgrey">
                          {data.data.payment_method}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : page === "add_receivers" ? (
        <AddReceivers setPage={setPage} />
      ) : page === "add_new_receivers" ? (
        <AddNewReceivers setPage={setPage} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Receivers;
