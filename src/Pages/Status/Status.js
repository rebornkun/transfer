import { PhoneSvg, StatusCoverSvg } from "../../assets/svg/svg";
import ukflag from "../../assets/imgs/united_kingdom.png";
import transfergo from "../../assets/imgs/transfergo.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Notification from "../../components/Notification";
import { Spin } from "antd";
import { convertToSymbol } from "./../../utils/helper";
import Contact from "../../components/Contact";

const Status = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [showContact, setShowContact] = useState(false);

  const onlyFirstName = (name) => {
    if (name) {
      let nameArr = name.split(" ");
      return nameArr[0];
    }
  };
  const getTransferData = async (id) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "Users", "ZxcwJA6tQnadlV0wM5atUzR7Ewu2");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data().transactions);
        const transactionsArray = docSnap.data().transactions;
        let filteredArray = transactionsArray.filter((data) => {
          return Number(data.id) === Number(id);
        });
        setData(filteredArray[0]);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      setIsLoading(false);
      return docSnap;
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      setIsLoading(false);
      return e;
    }
  };
  useEffect(() => {
    getTransferData(params.id);
  }, []);

  console.log(data);

  return (
    <div
      className={`bg-[#001a3f] w-full h-full relative flex flex-col overflow-y-auto`}
    >
      <div className="transfer-status-wrapper flex flex-col">
        <div className="lg:container h-screen w-full px-[0.8rem] lg:px-[4.5rem] xl:px-[8.5rem] md:pt-[1rem] flex flex-col">
          <nav className="z-10 flex flex-row items-center justify-between">
            <div className="logo">
              <img src={transfergo} alt="flag" className="h-[30px] w-[110px]" />
            </div>
            <div className="others flex flex-row items-center">
              <div
                className="hover:bg-blue rounded-[5px] transition duration-400 ease-in-out w-fit h-fit p-5 cursor-pointer"
                onClick={() => setShowContact(true)}
              >
                <PhoneSvg />
              </div>
              <div className="hover:bg-blue rounded-[5px] transition duration-400 ease-in-out w-fit h-fit cursor-pointer flex flex-row justify-start gap-2 items-center pt-3 pr-3 pb-3">
                <div className="h-[17px] w-[1px] bg-white"></div>
                <img src={ukflag} alt="flag" className="h-[17px] w-[30px]" />
                <p className="text-white">EN</p>
              </div>
            </div>
          </nav>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
              <div className="check flex flex-col md:flex-row flex-auto pt-[1.5rem] md:pt-[3rem] pb-[0rem] sm:pb-[3rem] md:pb-[7rem] sm:px-[2rem] lg:px-[4rem] items-center md:justify-between">
                <div className="w-full sm:w-[70%] md:w-[50%] flex flex-col justify-center mb-8 md:mb-16">
                  <p className="font-light text-[1rem] md:text-[1.5rem] text-white leading-none pb-2">
                    Hey {onlyFirstName(data?.first_name)},
                  </p>
                  <p className="text-[1.7rem] md:text-[2.7rem] text-white leading-[1.9rem] md:leading-[3.5rem] ">
                    <span className="text-[#ffd910]">
                      {onlyFirstName(data?.sender_name)}
                    </span>{" "}
                    is Sending you{" "}
                    {convertToSymbol(data?.receiverObj?.currencyName)}
                    {data?.amount?.toLocaleString()}
                  </p>
                </div>

                <div className="p-6 py-8 bg-white rounded-[20px] w-full sm:w-[50%] shadow min-w-[320px] sm:max-w-[400px] h-full flex flex-col justify-between">
                  <div className="flex flex-row gap-4 flex-1">
                    <div className="bbdot"></div>
                    <div className="flex flex-col">
                      <p className=" w-fit text-blue font-light text-[0.9rem] sm:text-[1rem]">
                        {onlyFirstName(data?.sender_name)} ordered a{" "}
                        {convertToSymbol(data?.receiverObj?.currencyName)}
                        {data?.amount?.toLocaleString()} transfer
                      </p>
                      <p className="p-1 px-2 rounded-[20px] w-fit bg-lightblue font-light text-[0.6rem]">
                        {data?.created_at &&
                          new Date(
                            data?.created_at?.seconds * 1000
                          ).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 flex-1">
                    <div
                      className={`bbdot ${
                        data?.level === "delivery" && "active"
                      }`}
                    ></div>
                    <div className="flex flex-col">
                      <p className=" w-fit font-light text-[1.3rem]">
                        {data?.level === "delivery"
                          ? "Waiting for payment"
                          : "Payment Received"}
                      </p>
                      <p className=" w-fit text-blue font-light text-[0.9rem] sm:text-[1rem]">
                        {data?.level === "delivery"
                          ? "we are waiting for delivery fee"
                          : "We have received your delivery fee"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 flex-1">
                    <div
                      className={`bbdot ${
                        data?.level === "approval" ? "" : "disabled"
                      } ${data?.level === "approval" && "active"}`}
                    ></div>
                    <div className="flex flex-col">
                      {data?.level === "approval" && (
                        <p className=" w-fit font-light text-[1.3rem]">
                          {data?.level === "approval"
                            ? "Waiting for payment"
                            : "Payment Received"}
                        </p>
                      )}
                      {data?.level !== "approval" && (
                        <p className=" w-fit text-blue font-light text-[0.9rem] sm:text-[1rem]">
                          We process payment
                        </p>
                      )}
                      {data?.level === "approval" && (
                        <p className=" w-fit text-blue font-light text-[0.9rem] sm:text-[1rem]">
                          {data?.level === "approval"
                            ? "we are waiting for approval fee"
                            : "We have received your approval fee"}
                        </p>
                      )}
                      {data?.level !== "approval" && (
                        <p className="p-1 px-2 rounded-[20px] w-fit bg-lightblue font-light text-[0.6rem]">
                          {data?.delivery_time &&
                            new Date(
                              data?.delivery_time?.seconds * 1000
                            ).toDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 flex-1">
                    <div className="bbdot disabled"></div>
                    <div className="flex flex-col">
                      <p className=" w-fit text-blue font-light text-[0.9rem] sm:text-[1rem]">
                        We send money to your account!
                      </p>
                      <p className="p-1 px-2 rounded-[20px] w-fit bg-lightblue font-light text-[0.6rem]">
                        {data?.delivery_time &&
                          new Date(
                            data?.delivery_time?.seconds * 1000
                          ).toDateString()}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-[0.8rem] text-blue underline text-center !font-custom cursor-pointer"
                    onClick={() =>
                      navigate("/user/transfer-status/details", { state: data })
                    }
                  >
                    Transaction details
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full lg:container px-[0.8rem] lg:px-[4.5rem] xl:px-[8.5rem] flex flex-col gap-3 mt-4 sm:mt-0">
          <div className=" flex flex-row gap-2 w-full MuiStack-root trust-logos css-1u8owzt">
            <svg
              viewBox="0 0 16 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
            >
              <path
                d="M6.933 5.256H5.637l.81-5.162h1.297l-.81 5.162zM11.632.22A3.112 3.112 0 0010.469 0C9.19 0 8.288.703 8.282 1.708c-.01.742.646 1.153 1.136 1.4.502.253.672.418.672.643-.005.346-.405.506-.778.506-.518 0-.795-.082-1.216-.275l-.17-.082-.182 1.159c.304.142.864.269 1.445.274 1.36 0 2.246-.692 2.256-1.763.005-.588-.341-1.038-1.088-1.406-.453-.236-.73-.395-.73-.637.005-.22.234-.445.746-.445.421-.01.73.093.965.198l.118.055.176-1.115z"
                fill="#15195A"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.952.094h1.002L16 5.256h-1.2l-.155-.774h-1.664l-.272.774h-1.36L13.274.522c.134-.335.369-.428.678-.428zm-.08 1.889s-.41 1.148-.518 1.444h1.078c-.053-.258-.299-1.494-.299-1.494l-.09-.444a30.127 30.127 0 01-.171.494zM.021.094h2.086c.282.01.512.104.586.434L3.146 2.9l.14.714L4.554.094h1.37L3.888 5.25h-1.37L1.361.765A5.197 5.197 0 000 .198L.021.094z"
                fill="#15195A"
              ></path>
            </svg>
            <svg
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
            >
              <path
                d="M10.163 8.774H5.836V1.227h4.327v7.547z"
                fill="#FF5F00"
              ></path>
              <path
                d="M6.113 4.999c0-1.531.739-2.895 1.89-3.774A5.02 5.02 0 004.945.2C2.214.199 0 2.348 0 4.999c0 2.65 2.214 4.8 4.946 4.8a5.02 5.02 0 003.056-1.026c-1.15-.88-1.889-2.243-1.889-3.774z"
                fill="#EB001B"
              ></path>
              <path
                d="M16 4.999c0 2.65-2.214 4.8-4.946 4.8a5.022 5.022 0 01-3.057-1.026c1.151-.88 1.89-2.243 1.89-3.774 0-1.531-.739-2.895-1.89-3.774A5.022 5.022 0 0111.054.2C13.786.199 16 2.348 16 4.999z"
                fill="#F79E1B"
              ></path>
            </svg>
          </div>
          <p className="text-[0.7rem] text-white text-center !font-custom px-2 leading-[1rem] font-light">
            TransferGo Ltd is a registered payment service provider. We are
            supervised by HM Revenue & Customs (HMRC) under the Money Laundering
            Regulations: 12667079 and regulated by the UK Financial Conduct
            Authority (FCA) as an authorised payment institution: 600886.
            Registered address: 241 Southwark Bridge Rd · SE1 6FP London ·
            United Kingdom
          </p>
          <p className="text-[0.7rem] text-white text-center !font-custom px-2 leading-[1rem] font-light">
            TransferGo Lithuania UAB is an electronic money institution
            established in the Republic of Lithuania, authorised and regulated
            by the Bank of Lithuania. Registered address: Palangos str. 4,
            Vilnius, Lithuania, number of registration 304871705, FI Code 32400.
          </p>
          <p className="text-[0.7rem] text-white text-center !font-custom px-2 leading-[1rem] font-light mb-10">
            By using this website, you accept our Terms of Use and Privacy
            Policy. Copyright 2023 TransferGo Ltd.
          </p>
        </div>
      </div>
      <Contact
        show={showContact}
        handleOk={() => {}}
        handleCancel={() => {
          setShowContact(false);
        }}
      />
    </div>
  );
};

export default Status;
