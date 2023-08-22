import { Button, Checkbox, Form, Input } from "antd";
import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Notification from "../../components/Notification";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const UsersCollectionRef = collection(db, "Users");

  const onFinish = async (values) => {
    // console.log("Success:", values);
    setIsLoading(true);
    try {
      const auther = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(auther);
      const { user } = auther;
      //check if user is new
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        await setDoc(doc(UsersCollectionRef, user.uid), {
          id: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          metadata: user.reloadUserInfo,
          isUserNew: true,
          receivers: [],
        });
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid, isLoggedIn: true })
      );
      Notification.displayInfo({
        message: "Success",
        description: "Logged in",
      });

      navigate("/home", { replace: true });
    } catch (error) {
      Notification.displayInfo({
        message: "Error",
        description: error.code || error.message,
      });
    }
    setIsLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
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
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
