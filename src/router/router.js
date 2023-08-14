/** @format */

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { routes, privateRoutes } from './routes';
import { AppProvider } from '../context/AppProvider';

const router = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        {/* <Route index element={<AppProvider />} /> */}
        <Route index element={<Navigate to={'/home'} />} />

        {routes.map((route) => (
          <Route
            path={route.path}
            element={<route.element />}
            loader={route.loader}
            key={route.path}
          />
        ))}
        <Route element={<AppProvider />}>
            {privateRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                loader={route.loader}
                key={route.path}
              />
            ))}
        </Route>
      </Route>
    )
  );
};

const RootRouter = () => <RouterProvider router={router()} />;

export default RootRouter;
