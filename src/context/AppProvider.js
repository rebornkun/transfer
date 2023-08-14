import { Outlet } from "react-router-dom";
import { ContextProvider } from "./AppContext";

export const AppProvider = () => {
  return (
    <ContextProvider>
      <Outlet />
    </ContextProvider>
  );
};
