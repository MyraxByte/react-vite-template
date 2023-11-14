import { Icon } from '@iconify/react/dist/iconify.js';
import { Group, Stack, Text } from '@mantine/core';
import styles from './styles.module.css';

export default function Header() {
    return (
        <Stack gap={0} bg={'white'} className={styles.header__wrapper}>
            <Stack gap={0} bg={'white'} className={styles.header__content}>
                {/* Header */}
                <Group gap={24} px={32} py={18} wrap="nowrap">
                    {/* LEFT SIDE */}

                    {/* RIGHT SIDE */}
                    <Group gap={0} ml={'auto'}>
                        <Text span size={'20px'} variant="subtle" c={'white'}>
                            <Stack align="center">
                                <Icon icon={'solar:bell-bing-line-duotone'} />
                            </Stack>
                        </Text>

                        <Group ml={24}></Group>
                    </Group>
                </Group>

                {/* Context Navigation */}
            </Stack>
        </Stack>
    );
}
