import { Navigate, Route, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom';

import ErrorPage from '@/pages/error.page';
import AppLayout from '@/pages/layout';
import RootPage from '@/pages/root.page';

export const AppRouter = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" Component={AppLayout} ErrorBoundary={ErrorPage.withLayout(AppLayout)}>
            <Route index Component={RootPage} />

            <Route path={'*'} element={<Navigate to={'/'} replace={true} />} />
        </Route>,
    ),
);
