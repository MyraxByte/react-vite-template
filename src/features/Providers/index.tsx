import { PropsWithChildren } from 'react';

import { theme } from '@/constants/theme';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export default function RootProvider({ children }: PropsWithChildren) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="light" withCssVariables>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools position="bottom" />
            </QueryClientProvider>
        </MantineProvider>
    );
}
