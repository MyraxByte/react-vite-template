import { Fragment, Suspense, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import Preloader from '@/components/Preloader';
import { useLoadConstants } from '@/hooks/useConstants';
import { useAuthStore } from '@/store/auth.store';

import { AppRouter } from './app.router';
import { AuthRouter } from './auth.router';

export default function Router() {
    const [isReady, setIsReady] = useState(false);
    const user = useAuthStore((state) => state.user);

    const checkAuth = useAuthStore((state) => state.auth);
    const preloadConstants = useLoadConstants();

    useEffect(() => {
        Promise.allSettled([checkAuth(), preloadConstants()]).finally(() => {
            setIsReady(true);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRouter = () => {
        if (!user) return AuthRouter;
        return AppRouter;
    };

    if (!isReady) return <Preloader />;
    return (
        <Suspense fallback={<Fragment />}>
            <RouterProvider router={getRouter()} />
        </Suspense>
    );
}
