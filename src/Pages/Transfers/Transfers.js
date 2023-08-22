import { NavLink, useNavigate } from "react-router-dom";
import { HomeSvg, TransferSvg } from "../../assets/svg/svg";
import { useAppContext } from "../../context/AppContext";
import { convertToSymbol } from "../../utils/helper";
import { Spin } from "antd";

const Transfers = () => {
  const { userData } = useAppContext();
  const navigate = useNavigate();
  const goToViewTransfer = (data) => {
    navigate("/view-transfers", {
      state: data,
    });
  };
  return (
    <div className="home_container max-w-[600px] mx-auto h-full relative">
      <div
        className={`transfers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between`}
      >
        <div className="flex-auto w-full flex flex-col overflow-y-auto">
          <p className="w-full font-[500] text-center !font-custom mb-2">
            All transfers
          </p>
          <div className="flex-auto w-full mt-2 flex flex-col overflow-y-auto">
            {Object.keys(userData) < 1 ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Spin size="large" />
              </div>
            ) : !userData?.transactions ||
              userData?.transactions?.length < 1 ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <p className="text-[1rem] font-bold">
                  You have no transactions yet
                </p>
                <p className="text-[0.8rem] text-lightgrey font-light text-center !font-custom">
                  Transactions you make are saved here
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                {userData?.transactions?.map((data) => {
                  return (
                    <div
                      className="w-full flex flex-row border-t-2 border-grey items-center h-[80px] px-2 gap-4 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
                      onClick={() => goToViewTransfer(data)}
                    >
                      <div className="relative rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                        <img
                          className="absolute w-[30px] h-[17px] bottom-[-1px]"
                          src={data?.receiverObj?.flag}
                          alt="flag"
                        />
                      </div>
                      <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col items-start">
                          <p className="h-fit text-[1rem]">
                            {`To ${data?.first_name} ${data?.last_name}`}
                          </p>
                          <p className="h-fit text-[0.8rem]">
                            {`${
                              data?.created_at &&
                              new Date(
                                data?.created_at?.seconds * 1000
                              ).toLocaleDateString()
                            } ~ #${data?.id}`}
                          </p>
                        </div>

                        <div className="flex flex-col items-end">
                          <p className="h-fit text-[0.8rem] font-bold">
                            {`-${data?.your_amount} ${convertToSymbol(
                              data?.senderObj?.currencyName
                            )}`}
                          </p>
                          <p className="h-fit font-light text-[0.7rem] text-lightgrey">
                            {`${data?.amount} ${convertToSymbol(
                              data?.receiverObj?.currencyName
                            )}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
};

export default Transfers;
