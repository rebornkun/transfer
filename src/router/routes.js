import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

const routes = [
  {
    path: '/login',
    element: Login,
  },
];
const privateRoutes = [
  {
    path: '/home',
    element: Home,
  },
];
export { routes, privateRoutes };
