import AuthLayout from '@/pages/auth/layout';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/pages/auth/login.page';
import ErrorPage from '@/pages/error.page';

export const AuthRouter = createBrowserRouter([
    {
        path: '/',
        Component: Outlet,
        ErrorBoundary: ErrorPage,
        children: [
            {
                index: true,
                element: <Navigate to={'/auth'} replace={true} />,
            },
            {
                path: 'auth',
                Component: AuthLayout,
                children: [
                    {
                        path: 'login',
                        Component: LoginPage,
                    },
                    {
                        index: true,
                        element: <Navigate to={'login'} replace={true} />,
                    },
                    {
                        path: '*',
                        element: <Navigate to={'login'} replace={true} />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/auth'} replace={true} />,
    },
]);
