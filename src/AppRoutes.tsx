import { FC, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import AppPage from './features/AppPage';
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import ResetPassword from './features/auth/components/ResetPassword';
import Home from './features/home/components/Home';
import ProtectedRoute from './features/ProtectedRoute';
import Error from './features/error/Error';

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <ConfirmEmail />
        </Suspense>
      )
    },
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: '/',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <Error />
        </Suspense>
      )
    }
  ];

  return useRoutes(routes);
};

export default AppRouter;
