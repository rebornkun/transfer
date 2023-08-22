import { Outlet, useNavigate } from "react-router-dom";
import { ContextProvider, useAppContext } from "./AppContext";
import { useEffect } from "react";
import DataProvider from "./DataProvider";

export const AppProvider = () => {
  return (
    <ContextProvider>
      <DataProvider>
        <Outlet />
      </DataProvider>
    </ContextProvider>
  );
};
