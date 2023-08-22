import { Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Receivers from "../Pages/Receivers/Receivers";
import NotFound from "./../Pages/NotFound/NotFound";
import Review from "../Pages/Review/Review";
import Success from "../Pages/Success/Success";
import Transfers from "../Pages/Transfers/Transfers";
import Status from "../Pages/Status/Status";
import ViewTransfer from "../Pages/Transfers/ViewTransfer";
import StatusDetails from "../Pages/Status/StatusDetails";

const routes = [
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/user/transfer-status/:id",
    element: Status,
  },
  {
    path: "/user/transfer-status/details",
    element: StatusDetails,
  },
];
const privateRoutes = [
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/receivers",
    element: Receivers,
  },
  {
    path: "/review_transfer",
    element: Review,
  },
  {
    path: "/success",
    element: Success,
  },
  {
    path: "/transfers",
    element: Transfers,
  },
  {
    path: "/view-transfers",
    element: ViewTransfer,
  },
  {
    path: "*",
    element: NotFound,
  },
];
export { routes, privateRoutes };
