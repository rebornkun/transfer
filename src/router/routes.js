import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Receivers from "../Pages/Receivers/Receivers";

const routes = [
  {
    path: "/login",
    element: Login,
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
];
export { routes, privateRoutes };
