import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/pages/error.page';
import RootPage from '@/pages/root.page';
import AppLayout from '@/pages/layout';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        Component: AppLayout,
        ErrorBoundary: ErrorPage.withLayout(AppLayout),
        children: [
            {
                index: true,
                Component: RootPage,
            },
        ],
    },
]);
