import { useState } from "react";
import { BackSvg, BankSvg, CardSvg, PersonSvg } from "../../assets/svg/svg";
import WithCard from "./WithCard";
import { useAppContext } from "../../context/AppContext";
import WithIBAN from "./WithIBAN";
import WithABA from "./WithABA";
import WithSWIFT from "./WithSWIFT";

const AddNewReceivers = ({ setPage }) => {
  const [paymentType, setPaymentType] = useState("");
  const { receiverObj } = useAppContext();

  return (
    <div className="receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between z-2">
      {!paymentType ? (
        <>
          <div className="nav mt-2 flex flex-row justify-start items-center">
            <div
              className="cursor-pointer"
              onClick={() => setPage("add_receivers")}
            >
              <BackSvg />
            </div>
          </div>
          <div className="flex-auto w-full mt-6 flex flex-col">
            <p className="text-[1.2rem] font-bold mb-2">Add new receiver</p>
            <p className="text-[0.8rem] font-light mb-4 text-lightgrey ">
              Choose how the receiver wll get the money
            </p>

            <div className="flex flex-col w-full gap-3">
              <div
                className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center h-[80px] px-2 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
                onClick={() => setPaymentType("card")}
              >
                <div className="rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                  <CardSvg />
                </div>
                <div className="flex flex-col gap-05">
                  <p className="h-fit text-[0.8rem]">Debit/credit card</p>
                  <p className="h-fit font-light text-[0.8rem] text-lightgrey">
                    You'll need their 16-digit card number
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center h-[80px] px-2 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]">
                <div className="rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                  <BankSvg />
                </div>
                <div className="flex flex-col gap-05">
                  <p className="h-fit text-[0.8rem]">To local account number</p>
                  <p className="h-fit font-light text-[0.8rem] text-lightgrey">
                    you will need their 26-digit account number
                  </p>
                </div>
              </div>

              {receiverObj.currencyName === "USD" && (
                <div
                  className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center h-[80px] px-2 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
                  onClick={() => setPaymentType("aba")}
                >
                  <div className="rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                    <BankSvg />
                  </div>
                  <div className="flex flex-col gap-05">
                    <p className="h-fit text-[0.8rem]">To ABA code</p>
                    <p className="h-fit font-light text-[0.8rem] text-lightgrey">
                      You'll need their 9-digit routing number and account
                      number
                    </p>
                  </div>
                </div>
              )}

              <div
                className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center h-[80px] px-2 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
                onClick={() => setPaymentType("swift")}
              >
                <div className="rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                  <BankSvg />
                </div>
                <div className="flex flex-col gap-05">
                  <p className="h-fit text-[0.8rem]">To SWIFT account number</p>
                  <p className="h-fit font-light text-[0.8rem] text-lightgrey">
                    You'll need their account number and BIC/Swift code
                  </p>
                </div>
              </div>

              {receiverObj.currencyName === "EUR" && (
                <div
                  className="w-full flex flex-row border border-lightgrey rounded-[10px] items-center h-[80px] px-2 gap-2 cursor-pointer transition duration-400 ease-in-out hover:scale-[0.98]"
                  onClick={() => setPaymentType("iban")}
                >
                  <div className="rounded-full h-[45px] w-[45px] flex flex-row items-center justify-center bg-grey">
                    <BankSvg />
                  </div>
                  <div className="flex flex-col gap-05">
                    <p className="h-fit text-[0.8rem]">Bank account</p>
                    <p className="h-fit font-light text-[0.8rem] text-lightgrey">
                      you will need their IBAN number<br></br>
                      {`(${receiverObj.ISO}14 2004 1010 0505 0001 3M02 606)`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : paymentType === "card" ? (
        <WithCard setPaymentType={setPaymentType} />
      ) : paymentType === "iban" ? (
        <WithIBAN setPaymentType={setPaymentType} ISO={receiverObj.ISO} />
      ) : paymentType === "aba" ? (
        <WithABA setPaymentType={setPaymentType} />
      ) : paymentType === "swift" ? (
        <WithSWIFT setPaymentType={setPaymentType} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddNewReceivers;
