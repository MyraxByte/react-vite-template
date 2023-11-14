import Preloader from '@/features/Preloader';
import { useAuthStore } from '@/store/auth.store';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { AuthRouter } from './auth.router';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './app.router';
import { useLoadConstants } from '@/hooks/useConstants';

export default function Router() {
    const [isReady, setIsReady] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.user);

    const checkAuth = useAuthStore((state) => state.auth);
	const preloadConstants = useLoadConstants();

    useEffect(() => {
        Promise.allSettled([checkAuth(), preloadConstants()]).finally(() => {
            setIsReady(true);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isReady) return <Preloader />;

    return (
        <Suspense fallback={<Fragment />}>
            {!isAuthenticated && <RouterProvider router={AppRouter} />}
            {!!isAuthenticated && <RouterProvider router={AuthRouter} />}
        </Suspense>
    );
}
