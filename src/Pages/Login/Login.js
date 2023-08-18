import { Button, Checkbox, Form, Input } from "antd";
import { auth } from "../../config/firebase";

const onFinish = async (values) => {
  console.log("Success:", values);
  try {
    const auther = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
  } catch (error) {}
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <div className="login max-w-[600px] mx-auto h-screen bg-white p-2">
      <div className="flex flex-col justify-center items-center h-full w-full gap-4">
        <h1 className="text-[2rem] font-bold mb-[5rem]">Login</h1>
        <Form
          name="login"
          className={"w-[90%] flex flex-col gap-4"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
