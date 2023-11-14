import { navigation } from '@/constants/navigations';
import { useAuthStore } from '@/store/auth.store';
import { Group, ScrollArea, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import { group, listify } from 'radash';
import { sidebar } from '@/constants/ui';
import AsideDivider from '@/ui/AsideDivider';
import AsideNavLink from '@/ui/AsideNavLink';

export default function Navigation() {
    const user = useAuthStore((state) => state.user);

    const routes = useMemo(() => {
        const availableRoutes = navigation.filter((item) => {
            if (!item.access) return true;
            // if (!user) return false;

            return item.access(user?.role);
        });

        const routesByGroup = group(availableRoutes, (item) => item.group || 'personal');

        return listify(routesByGroup, (key, item) => ({
            groupName: key,
            routes: item!,
        }));
    }, [user]);

    const withSpacer = (groupIndex: number) => {
        return groupIndex === 0 ? 0 : 16;
    };

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
