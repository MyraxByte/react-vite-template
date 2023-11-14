import { NavLink as RouterNavLink, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuthStore } from '@/store/auth.store';
import { Group, Text } from '@mantine/core';
import styles from './styles.module.css';

export default function AsideNavLink({ item }: { item: AsideNavLink }) {
    const params = useParams();
    const user = useAuthStore((state) => state.user);

    return (
        <RouterNavLink to={item.route(user, params)} end={item.exact} style={{ pointerEvents: item.comming ? 'none' : 'auto' }}>
            {({ isActive }) => (
                <Group wrap={'nowrap'} gap={12} className={styles['aside-link__wrapper']} data-active={isActive} data-coming={item.comming}>
                    <Icon className={styles['aside-link__icon']} icon={item.icon} width={24} height={24} />
                    <Text className={styles['aside-link__label']} truncate>
                        {item.title}{' '}
                        <Text span size="14px">
                            {item.comming && '(Coming soon)'}
                        </Text>
                    </Text>
                </Group>
            )}
        </RouterNavLink>
    );
}
