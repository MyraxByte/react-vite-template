import { useMemo } from 'react';

import AsideDivider from '@/components/AsideDivider';
import AsideNavLink from '@/components/AsideNavLink';
import { sidebar } from '@/constants/ui';
import getGroupRoutes from '@/helpers/getGroupRoutes';
import { useAuthStore } from '@/store/auth.store';
import { Group, ScrollArea, Stack, Text } from '@mantine/core';

export default function Navigation() {
    const user = useAuthStore((state) => state.user);
    const routes = useMemo(() => getGroupRoutes(user), [user]);

    const withSpacer = (groupIndex: number) => (groupIndex === 0 ? 0 : 16);

    return (
        <ScrollArea.Autosize mah={'calc(100vh - 86px)'} pb={24}>
            <Stack gap={0} maw={sidebar.width}>
                {routes.map((routeGroup, groupIdx) => (
                    <Stack key={groupIdx} gap={0} mt={withSpacer(groupIdx)}>
                        {!!withSpacer(groupIdx) && <AsideDivider mx={8} />}
                        <Group px={32} py={16}>
                            <Text size={'12px'} lh={'14px'} fw={500} c={'dark.3'} tt="uppercase">
                                {routeGroup.groupName}
                            </Text>
                        </Group>
                        <Stack gap={2}>
                            {routeGroup.routes.map((item, idx) => (
                                <AsideNavLink item={item} key={idx} />
                            ))}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </ScrollArea.Autosize>
    );
}
