import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

const DataProvider = ({ children }) => {
  const { getUserData } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      //getuserdata
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default DataProvider;
