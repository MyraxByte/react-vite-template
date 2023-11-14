import { sidebar } from '@/constants/ui';
import Header from '@/ui/Header';
import Sidebar from '@/features/Sidebar';
import Page from '@/ui/Page';
import { Group, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';

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
