import { Button, Input, Modal, Upload, message } from "antd";
import btcpic from "../assets/imgs/btc_real.jpg";
import CopyToClipboard from "react-copy-to-clipboard";
import Notification from "./Notification";
import { BigSucessSvg, UploadSvg } from "../assets/svg/svg";
import { useState } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const Payment = ({ show, handleOk, handleCancel, amount, txn_id, data }) => {
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const userCollectionRef = collection(db, "Users");
  const copyText = () => {
    Notification.displayInfo({
      message: "Success",
      description: "Transaction link copied",
    });
  };

  const finishPayment = async () => {
    setIsLoading(true);
    try {
      const imageRef = ref(storage, `images/${img.name + v4()}`);
      const res = await uploadBytes(imageRef, img);
      let imageUrl = await getDownloadURL(res.ref);

      //get UserData
      const docRef = doc(db, "Users", "ZxcwJA6tQnadlV0wM5atUzR7Ewu2");
      const docSnap = await getDoc(docRef);

      let transactionsArray = [];
      if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data().transactions);
        transactionsArray = docSnap.data().transactions;
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // console.log(transactionsArray);
      const oldTransactions = transactionsArray ? transactionsArray : [];
      const otherTransactions = oldTransactions.filter((trans) => {
        return Number(trans.id) !== Number(txn_id);
      });
      // console.log(otherTransactions);
      const currentTransactions = oldTransactions.filter((trans) => {
        return Number(trans.id) === Number(txn_id);
      });
      // console.log(currentTransactions);
      const updatedTransaction = {
        ...currentTransactions[0],
        payment_url: imageUrl,
        pay_time: new Date(),
      };

      // console.log(updatedTransaction);

      otherTransactions.push(updatedTransaction);
      let finalData = {
        ...docSnap.data(),
        transactions: otherTransactions,
      };

      //update database
      const updateUserRes = await setDoc(
        doc(userCollectionRef, "ZxcwJA6tQnadlV0wM5atUzR7Ewu2"),
        finalData
      );

      // console.log(updateUserRes);
      setIsLoading(false);
      Notification.displayInfo({
        message: "Success",
        description: "Transactions updated",
      });
      setIsDone(true);
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      setIsLoading(false);
      return e;
    }
  };

  return (
    <Modal
      title="Payment Instructions"
      open={show}
      onCancel={handleCancel}
      className="modal h-[90%] w-[90%]"
      wrapClassName="contact_modal"
    >
      <div className="flex w-full h-full flex-col justify-between items-center">
        {isDone ? (
          <div className="flex flex-auto flex-col gap-4 items-center justify-center">
            <BigSucessSvg />
            <p className="font-bold text-[1.3rem] text-center !font-custom mt-4">
              Done!<br></br>We will review your payment and contact you for any
              issue, else your money will be sent, Thank you!.
            </p>
          </div>
        ) : (
          <>
            <div className="flex w-full h-full flex-col justify-center items-center">
              <p className="text-center !font-custom">
                Send {amount} worth of BTC to the address
              </p>
              <img
                src={btcpic}
                alt="wallet address"
                className="max-w-[270px] max-h-[270px]"
              />
              <div className="w-full">
                <p className="text-center font-light text-[0.7rem] !font-custom mt-2">
                  Click the box to copy the wallet address!
                </p>
                <CopyToClipboard
                  text={"1NZ12bBoAEXMw1hycVGHhF9GfTsGDcELPL"}
                  onCopy={copyText}
                >
                  <Input
                    className=" w-full rounded-[10px] bg-white border-[1px] border-black p-2 !font-custom cursor-pointer"
                    value={"1NZ12bBoAEXMw1hycVGHhF9GfTsGDcELPL"}
                    readOnly
                  />
                </CopyToClipboard>
              </div>
              <p className="text-center !font-custom mt-2">
                After you send the coins kindly upload the Transaction
                screenshot or snap and press Confirm Payment!
              </p>
              <div className=" w-full rounded-[10px] bg-white border-[1px] border-black p-2 mt-2 !font-custom h-[40px] flex flex-row items-center">
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
            <Button
              loading={isLoading}
              type="primary"
              className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom mt-2"
              onClick={() => finishPayment()}
            >
              Confirm Payment
            </Button>
          </>
        )}
      </div>
    </Modal>
    // bitcoin:1NZ12bBoAEXMw1hycVGHhF9GfTsGDcELPL
  );
};

export default Payment;
