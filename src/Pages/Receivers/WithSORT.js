import { Button, Form, Input } from "antd";
import { BackSvg, InfoSvg } from "../../assets/svg/svg";
import { useNavigate } from "react-router-dom";

const WithSORT = ({ setPaymentType, ISO }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    navigate("/review_transfer", {
      state: {
        payment_method: "sort",
        first_name: values.first_name,
        last_name: values.last_name,
        sort_code: values.sort_code,
        account_number: values.account_number,
      },
    });
  };
  return (
    <div className="receivers transition duration-400 ease-in-out w-full h-full bg-white p-2 flex flex-col justify-between z-2">
      <div className="nav mt-2 flex flex-row justify-start items-center">
        <div className="cursor-pointer" onClick={() => setPaymentType("")}>
          <BackSvg />
        </div>
      </div>
      <div className="flex-auto w-full mt-6 flex flex-col">
        <p className="text-[1.2rem] font-bold mb-2">
          Receiver's bank account details
        </p>
        <p className="text-[0.8rem] font-light mb-4 text-lightgrey ">
          Please enter your receiver's account details
        </p>

        <div className="flex flex-col flex-auto w-full gap-3 mt-4">
          <Form
            name="card"
            className={
              "receiverForm w-full h-full flex flex-col gap-4 justify-between"
            }
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="flex flex-col gap-2">
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please input their first name",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
                  placeholder="First name"
                />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please input their first name",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
                  placeholder="Last name"
                />
              </Form.Item>
              <Form.Item
                name="sort_code"
                rules={[
                  {
                    required: true,
                    message: "Please input their Sort Code",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
                  placeholder="Sort code"
                />
              </Form.Item>
              <Form.Item
                name="account_number"
                rules={[
                  {
                    required: true,
                    message: "Please input their Account Number",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-[0px] px-1 py-2 font-custom border-b-2 border-t-0 border-l-0 border-r-0"
                  placeholder="Account number"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-[45px] py-2 bg-blue mb-2 text-[1rem] font-bold font-custom"
                // onClick={goToReceiver}
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WithSORT;
