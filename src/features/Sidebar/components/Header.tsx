import { Group, Image } from '@mantine/core';
import logoSrc from '@/assets/logo.svg';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Group px={32}>
            <Link to={'/'}>
                <Image radius="md" src={logoSrc} />
            </Link>
        </Group>
    );
}
