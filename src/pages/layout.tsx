import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Page from '@/components/Page';
import { sidebar } from '@/constants/ui';
import Sidebar from '@/features/Sidebar';
import { Group, Stack } from '@mantine/core';

export default function AppLayout({ children }: { children?: React.ReactNode }) {
    return (
        <Group align="flex-start" justify="flex-start" mih={'100vh'}>
            <Sidebar />
            <Stack gap={0} ml={sidebar.width} h={'100vh'} w={'100%'} pos={'relative'}>
                <Header />
                <Page>{children || <Outlet />}</Page>
            </Stack>
        </Group>
    );
}
