import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';

import AuthLayout from '@/pages/auth/layout';
import LoginPage from '@/pages/auth/login.page';
import ErrorPage from '@/pages/error.page';

export const AuthRouter = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" Component={Outlet} ErrorBoundary={ErrorPage}>
            <Route index element={<Navigate to={'/auth/login'} replace={true} />} />
            <Route path={'auth'} Component={AuthLayout}>
                <Route path={'login'} Component={LoginPage} />
            </Route>

            <Route path={'*'} element={<Navigate to={'/auth/login'} replace={true} />} />
        </Route>,
    ),
);
