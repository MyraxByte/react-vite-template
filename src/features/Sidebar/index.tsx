import Header from '@/components/Navbar/components/Header';
import Navigation from '@/components/Navbar/components/Navigation';
import { Stack } from '@mantine/core';

import styles from '@/components/Navbar/styles.module.css';

export default function Sidebar() {
    return (
        <Stack className={styles.sidebar__wrapper}>
            <Stack py={24} gap={24}>
                <Header />
                <Navigation />
            </Stack>
        </Stack>
    );
}
